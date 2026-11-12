import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { catchError, map, of, shareReplay } from 'rxjs';
import type {
  HathiTrustMultiIdResponse,
  HathiTrustQuery,
  HathiTrustResponse,
} from './hathi-trust-api.model';
import { HathiTrustItemAvailability } from './hathi-trust-api.model';
import { HathiTrustConfigService } from '../hathi-trust-config/hathi-trust-config.service';

const BASE_URL = 'https://catalog.hathitrust.org/api/volumes/brief/json/';

const responseExtractor =
  (query: HathiTrustQuery) =>
  (response: HathiTrustMultiIdResponse): HathiTrustResponse =>
    response[query.toString()];

@Injectable()
export class HathiTrustApiService {
  private http: HttpClient = inject(HttpClient);
  private config = inject(HathiTrustConfigService);
  private readonly MAX_CACHE_SIZE = 100;
  // simple LRU cache for full-text URL queries
  private fullTextUrlCache = new Map<
    string,
    ReturnType<HathiTrustApiService['findFullTextUrl']>
  >();

  find(query: HathiTrustQuery): Observable<HathiTrustItemAvailability> {
    return this.http.get<HathiTrustMultiIdResponse>(BASE_URL + query).pipe(
      map(responseExtractor(query)),
      map((resp) => new HathiTrustItemAvailability(resp)),
    );
  }

  findFullTextUrl(query: HathiTrustQuery): Observable<string | undefined> {
    const key = query.toString();
    const cachedUrl = this.fullTextUrlCache.get(key);
    if (cachedUrl !== undefined) {
      return cachedUrl;
    }

    const value$ = this.find(query).pipe(
      map((hathiTrustResponse) =>
        hathiTrustResponse.findFullViewUrl({
          ignoreCopyright: this.config.ignoreCopyright,
        }),
      ),
      // Treat any failure (network, rate limit, unexpected response shape) as
      // "no full text" and cache that result. Without this, shareReplay would
      // re-run the request for every new subscriber, and the error would end
      // the component's stream.
      catchError((error: unknown) => {
        console.warn(`HathiTrust lookup failed for "${key}"`, error);
        return of(undefined);
      }),
      shareReplay(1),
    );

    this.fullTextUrlCache.set(key, value$);

    if (this.fullTextUrlCache.size > this.MAX_CACHE_SIZE) {
      const firstKey = this.fullTextUrlCache.keys().next().value;
      this.fullTextUrlCache.delete(firstKey);
    }

    return value$;
  }
}

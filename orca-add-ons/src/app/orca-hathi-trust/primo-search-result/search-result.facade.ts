import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDeliveryEntities,
  selectFullDisplayWithDelivery,
  selectSearchEntities,
} from './search-result.selectors';
import type { Observable } from 'rxjs';
import { combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import type { Doc } from './search.model';

@Injectable()
export class SearchResultFacade {
  private store = inject(Store);

  /**
   * The current full display record with delivery data.
   */
  readonly currentFullDisplay$: Observable<Doc> = this.store
    .select(selectFullDisplayWithDelivery)
    .pipe(
      filter((val) => val != null),
      distinctUntilChanged(),
    );

  /**
   * Get a search result by its record ID, including delivery data.
   */
  getSearchResult(id: string): Observable<Doc> {
    return combineLatest({
      searchEntities: this.store.select(selectSearchEntities),
      deliveryEntities: this.store.select(selectDeliveryEntities),
    }).pipe(
      map(({ searchEntities, deliveryEntities }) => ({
        ...searchEntities[id],
        ...deliveryEntities[id],
      })),
      distinctUntilChanged(),
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { HathiTrustQueryId } from './hathi-trust-api/hathi-trust-api.model';
import { HathiTrustQuery } from './hathi-trust-api/hathi-trust-api.model';
import type { Doc } from './primo-search-result/search.model';
import { HathiTrustConfigService } from './hathi-trust-config/hathi-trust-config.service';
import { HathiTrustApiService } from './hathi-trust-api/hathi-trust-api.service';

@Injectable()
export class HathiTrustService {
  private api = inject(HathiTrustApiService);
  private config = inject(HathiTrustConfigService);

  findFullTextFor(searchResult: Doc) {
    let query: HathiTrustQuery | undefined;
    if (
      this.isEligible(searchResult) &&
      (query = this.createQuery(searchResult))
    ) {
      return this.api.findFullTextUrl(query);
    } else {
      return of(undefined);
    }
  }

  private isEligible(doc: Doc): boolean {
    return (
      isLocal(doc) &&
      !(this.config.disableWhenAvailableOnline && hasOnlineAvailability(doc)) &&
      !(this.config.disableForJournals && isJournal(doc))
    );
  }

  private createQuery(doc: Doc): HathiTrustQuery | undefined {
    const ids: { [key in HathiTrustQueryId]?: string[] } = {};
    if (this.config.matchOnOclc)
      ids.oclc = getAddata(doc, 'oclcid').flatMap(oclcFilter);
    if (this.config.matchOnIsbn) [ids.isbn] = getAddata(doc, 'isbn');
    if (this.config.matchOnIssn) [ids.issn] = getAddata(doc, 'issn');
    if (this.config.matchOnLccn) [ids.lccn] = getAddata(doc, 'lccn');
    if (Object.values(ids).some((arr) => arr?.length > 0)) {
      return new HathiTrustQuery(ids);
    } else {
      return undefined;
    }
  }
}

// some institutions have a leading ocm|ocn|on without "(OCoLC)" prefix
const OCLC_PATTERN = /^(?:\(ocolc\)|(?:ocm|ocn|on))(?<id>\w+)/i;

function isOclcNum(s: string): boolean {
  return OCLC_PATTERN.test(s);
}

function extractOclcNum(s: string): string | undefined {
  return OCLC_PATTERN.exec(s)?.groups?.['id'];
}

function oclcFilter(ids: string[]): string[] {
  return ids.filter(isOclcNum).map(extractOclcNum) as string[];
}

function getAddata(doc: Doc, ...vals: string[]): string[][] {
  return vals.map((v) => doc.pnx.addata[v] ?? []);
}

function hasOnlineAvailability(doc: Doc): boolean | undefined {
  if (!doc.delivery?.GetIt1 || doc.delivery.GetIt1.length === 0)
    return doc.delivery?.deliveryCategory.includes('Alma-E');
  return doc.delivery?.GetIt1.some((getit) =>
    getit.links.some((link) => link.isLinktoOnline),
  );
}

function isJournal(doc: Doc): boolean {
  return doc.pnx.addata['format']?.some((format) =>
    format.toLowerCase().includes('journal'),
  );
}

function isLocal(doc: Doc): boolean {
  return doc.context === 'L';
}

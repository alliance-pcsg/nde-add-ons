export type HathiTrustQueryId = 'oclc' | 'isbn' | 'issn' | 'lccn';

export class HathiTrustQuery {
  readonly oclc?: ReadonlyArray<string>;
  readonly isbn?: ReadonlyArray<string>;
  readonly issn?: ReadonlyArray<string>;
  readonly lccn?: ReadonlyArray<string>;

  constructor(query: Partial<HathiTrustQuery>) {
    this.validate(query);
    Object.assign(this, query);
  }

  toString(): string {
    return Object.entries(this)
      .filter(([_, values]) => values?.length > 0)
      .flatMap(([key, values]) => values.map((val: string) => `${key}:${val}`))
      .join(';');
  }

  private validate(query: Partial<HathiTrustQuery>) {
    const validIds: HathiTrustQueryId[] = ['oclc', 'isbn', 'issn', 'lccn'];
    const hasAtLeastOneId = validIds.some(
      (id) => query[id] && query[id].length > 0,
    );
    if (!hasAtLeastOneId) {
      throw new Error(
        'HathiTrustQuery must have at least one of the following: ' +
          validIds.join(', '),
      );
    }
  }
}

export class HathiTrustItemAvailability {
  constructor(private readonly response: HathiTrustResponse) {}

  /**
   * Finds the URL for a HathiTrust record, optionally ignoring copyright status.
   * @param ignoreCopyright If true, returns the URL of the first item regardless
   * of copyright status. Otherwise, returns the URL of the first item with a
   * "Full View" usRightsString.
   * @returns The full-view URL if available, otherwise undefined.
   */
  findFullViewUrl({ ignoreCopyright = false } = {}): string | undefined {
    const item = ignoreCopyright
      ? this.response.items[0]
      : this.findFullViewItem();
    return item ? this.response.records[item.fromRecord].recordURL : undefined;
  }

  private findFullViewItem() {
    return this.response.items.find(
      (item) => item.usRightsString.toLowerCase() === 'full view',
    );
  }
}

export interface HathiTrustResponse {
  readonly records: { [id: string]: HathiTrustRecord };
  readonly items: HathiTrustItem[];
}

export interface HathiTrustRecord {
  readonly recordURL: string;
  readonly titles: ReadonlyArray<string>;
  readonly isbns: ReadonlyArray<string>;
  readonly issns: ReadonlyArray<string>;
  readonly oclcs: ReadonlyArray<string>;
  readonly lccns: ReadonlyArray<string>;
}

export interface HathiTrustFullRecord extends HathiTrustRecord {
  readonly 'marc-xml': string;
}

export interface HathiTrustItem {
  readonly orig: string;
  readonly fromRecord: string;
  readonly htid: string;
  readonly itemURL: string;
  readonly rightsCode: string;
  readonly lastUpdate: string;
  readonly enumcron: string;
  readonly usRightsString: string;
}

export interface HathiTrustMultiIdResponse {
  readonly [ids: string]: HathiTrustResponse;
}

// ideally, this is what the config JSON would look like
export interface HathiTrustOptions {
  disableWhenAvailableOnline?: boolean;
  disableForJournals?: boolean;
  ignoreCopyright?: boolean;
  matchOn?: MatchOnOptions;
}

// this accounts for what Primo actually gives us
export interface HathiTrustModuleParameters {
  disableWhenAvailableOnline?: BooleanConfigValue;
  disableForJournals?: BooleanConfigValue;
  ignoreCopyright?: BooleanConfigValue;
  matchOn?: MatchOnConfigValue;
}

export type MatchOnOptions = {
  [K in MatchOnKey]?: boolean;
};

export const MATCH_ON_KEYS = ['oclc', 'isbn', 'issn', 'lccn'] as const;
export type MatchOnKey = (typeof MATCH_ON_KEYS)[number];
export type BooleanConfigValue = boolean | 'true' | 'false';

// when serialized as a string, Primo gives us a flattened map like so:
// "{oclc=true, isbn=false}"
export type MatchOnConfigValue = MatchOnOptions | string;

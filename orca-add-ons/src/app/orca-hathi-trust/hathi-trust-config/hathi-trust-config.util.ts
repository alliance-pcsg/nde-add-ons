import type { MatchOnKey } from './hathi-trust-config.types';
import {
  MATCH_ON_KEYS,
  type HathiTrustModuleParameters,
  type HathiTrustOptions,
  type MatchOnOptions,
} from './hathi-trust-config.types';

export function normalizeHathiTrustConfig(
  raw: HathiTrustModuleParameters,
): HathiTrustOptions {
  return {
    disableWhenAvailableOnline: parseBoolean(raw.disableWhenAvailableOnline),
    disableForJournals: parseBoolean(raw.disableForJournals),
    ignoreCopyright: parseBoolean(raw.ignoreCopyright),
    matchOn: parseMatchOn(raw.matchOn),
  };
}

/**
 * Normalizes boolean values and boolean strings ("true" / "false").
 */
function parseBoolean(val: unknown): boolean | undefined {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const trimmed = val.trim().toLowerCase();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
  }
  return undefined;
}

/**
 * Handles both standard object maps and stringified Java maps: "{oclc=true, isbn=false}"
 */
function parseMatchOn(val: unknown): MatchOnOptions | undefined {
  if (!val) return undefined;

  if (typeof val === 'object' && !Array.isArray(val)) {
    const obj = val as Record<string, unknown>;
    const result: MatchOnOptions = {};

    for (const key of MATCH_ON_KEYS) {
      if (key in obj) {
        result[key] = parseBoolean(obj[key]);
      }
    }
    return result;
  }

  if (typeof val === 'string') {
    const trimmed = val.trim();

    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return {};

      const result: MatchOnOptions = {};
      const entries = inner.split(',');

      for (const entry of entries) {
        const [rawKey, rawValue] = entry.split('=');
        if (!rawKey || rawValue === undefined) continue;

        const key = rawKey.trim();

        if (isMatchOnKey(key)) {
          const parsedValue = parseBoolean(rawValue.trim());
          if (parsedValue !== undefined) {
            result[key] = parsedValue;
          }
        }
      }

      return result;
    }
  }

  return undefined;
}

function isMatchOnKey(key: string): key is MatchOnKey {
  return MATCH_ON_KEYS.includes(key as MatchOnKey);
}

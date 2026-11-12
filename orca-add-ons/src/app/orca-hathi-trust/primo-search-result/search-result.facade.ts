import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDeliveryEntities,
  selectFullDisplayRecordId,
  selectSearchEntities,
} from './search-result.selectors';
import type { Observable } from 'rxjs';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import type { Doc } from './search.model';

@Injectable()
export class SearchResultFacade {
  private store = inject(Store);

  /**
   * The current full display record with delivery data.
   */
  readonly currentFullDisplay$: Observable<Doc> = this.store
    .select(selectFullDisplayRecordId)
    .pipe(
      filter((id): id is string => id != null),
      switchMap((id) => this.getSearchResult(id)),
    );

  /**
   * Get a search result by its record ID, including delivery data.
   *
   * Emits only when this record's own search or delivery entry changes, not
   * whenever any other record in the store is updated.
   */
  getSearchResult(id: string): Observable<Doc> {
    const search$ = this.store.select(selectSearchEntities).pipe(
      map((entities) => entities?.[id]),
      filter((doc) => doc != null),
      distinctUntilChanged(),
    );
    const delivery$ = this.store.select(selectDeliveryEntities).pipe(
      map((entities) => entities?.[id]),
      distinctUntilChanged(),
    );

    return combineLatest([search$, delivery$]).pipe(
      map(([doc, delivery]) => ({ ...doc, ...delivery })),
    );
  }
}

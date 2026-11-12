import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { Doc, DocDelivery } from './search.model';

interface FullDisplayState {
  selectedRecordId: string | null;
}

interface SearchState {
  entities: { [key: string]: Doc };
}

interface DeliveryState {
  entities: { [key: string]: DocDelivery };
}

const fullDisplay = createFeatureSelector<FullDisplayState>('full-display');
const searchFeature = createFeatureSelector<SearchState>('Search');
const deliveryFeature = createFeatureSelector<DeliveryState>('Delivery');

export const selectFullDisplayRecordId = createSelector(
  fullDisplay,
  (fullDisplay) => fullDisplay?.selectedRecordId ?? null,
);

export const selectSearchEntities = createSelector(
  searchFeature,
  (searchState) => searchState.entities,
);

export const selectDeliveryEntities = createSelector(
  deliveryFeature,
  (deliveryState) => deliveryState.entities,
);

export const selectFullDisplayRecord = createSelector(
  selectFullDisplayRecordId,
  selectSearchEntities,
  (recordId: string | null, searchEntities) =>
    recordId ? searchEntities[recordId] : null,
);

export const selectFullDisplayWithDelivery = createSelector(
  selectFullDisplayRecordId,
  selectFullDisplayRecord,
  selectDeliveryEntities,
  (recordId: string | null, record: Doc | null, deliveryEntities) => {
    if (recordId && record) {
      const delivery = deliveryEntities[recordId];
      return { ...record, ...delivery };
    }
    return null;
  },
);

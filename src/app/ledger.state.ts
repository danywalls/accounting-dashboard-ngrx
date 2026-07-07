import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface LedgerEntry {
  id: number;
  accountCode: string;
  debit: number;
  credit: number;
  periodId: number;
}

export const ledgerAdapter = createEntityAdapter<LedgerEntry>({
  selectId: (entry) => entry.id,
  sortComparer: (a, b) => a.id - b.id,
});

export interface LedgerState extends EntityState<LedgerEntry> {
  isLoading: boolean;
  selectedPeriodId: number | null;
}

export const initialState: LedgerState = ledgerAdapter.getInitialState({
  isLoading: false,
  selectedPeriodId: null,
});

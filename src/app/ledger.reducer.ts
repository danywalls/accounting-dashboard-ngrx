import { createReducer, on } from '@ngrx/store';
import { ledgerAdapter, initialState } from './ledger.state';
import { LedgerActions } from './period.actions';

export const ledgerReducer = createReducer(
  initialState,
  on(LedgerActions.loadSuccess, (state, { entries }) =>
    ledgerAdapter.setAll(entries, { ...state, isLoading: false })
  ),
  on(LedgerActions.addEntry, (state, { entry }) =>
    ledgerAdapter.addOne(entry, state)
  ),
);

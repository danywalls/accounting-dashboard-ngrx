import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { LedgerEntry } from './ledger.state';

export const PeriodActions = createActionGroup({
  source: 'Financial Period',
  events: {
    'Open Period': props<{ periodId: number }>(),
    'Close Period': props<{ periodId: number }>(),
    'Period Closed': props<{ periodId: number; closedAt: string }>(),
    'Period Error': props<{ error: string }>(),
  },
});

export const LedgerActions = createActionGroup({
  source: 'Ledger',
  events: {
    'Load Success': props<{ entries: LedgerEntry[] }>(),
    'Add Entry': props<{ entry: LedgerEntry }>(),
  },
});

import { eventGroup } from '@ngrx/signals/events';

export const accountingEvents = eventGroup({
  source: 'Accounting',
  events: {
    entryPosted: (entryId: number, total: number) => ({ entryId, total }),
    periodClosed: (periodId: number) => ({ periodId }),
    periodReopened: (periodId: number) => ({ periodId }),
  },
});

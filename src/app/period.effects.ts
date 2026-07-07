import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PeriodActions } from './period.actions';

export const closePeriod$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(PeriodActions.closePeriod),
      switchMap(({ periodId }) => {
        const closedAt = new Date().toISOString();
        return of(PeriodActions.periodClosed({ periodId, closedAt }));
      })
    ),
  { functional: true }
);

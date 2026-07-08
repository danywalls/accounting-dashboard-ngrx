import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';

export interface JournalLine {
  accountCode: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: number;
  date: string;
  description: string;
  lines: JournalLine[];
}

type JournalState = {
  entries: JournalEntry[];
  isLoading: boolean;
};

const initialState: JournalState = { 
  entries: [
    {
      id: 1,
      date: '2026-07-01',
      description: 'Initial Opening Balance',
      lines: [
        { accountCode: '101', debit: 5000, credit: 0 },
        { accountCode: '301', debit: 0, credit: 5000 }
      ]
    },
    {
      id: 2,
      date: '2026-07-08',
      description: 'Service Revenue Recognition',
      lines: [
        { accountCode: '102', debit: 1200, credit: 0 },
        { accountCode: '401', debit: 0, credit: 1200 }
      ]
    }
  ], 
  isLoading: false 
};

function totalDebits(entries: JournalEntry[]): number {
  return entries.reduce((sum, e) =>
    sum + e.lines.reduce((s, l) => s + l.debit, 0), 0
  );
}

function totalCredits(entries: JournalEntry[]): number {
  return entries.reduce((sum, e) =>
    sum + e.lines.reduce((s, l) => s + l.credit, 0), 0
  );
}

export const JournalStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    entryCount: computed(() => store.entries().length),
    totalDebits: computed(() => totalDebits(store.entries())),
    totalCredits: computed(() => totalCredits(store.entries())),
    isBalanced: computed(() => totalDebits(store.entries()) === totalCredits(store.entries())),
  })),

  withMethods((store, http = inject(HttpClient)) => ({
    loadEntries: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          http.get<JournalEntry[]>('/api/journal-entries').pipe(
            tapResponse({
              next: (entries) => patchState(store, { entries, isLoading: false }),
              error: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),

    addEntry(entry: JournalEntry) {
      patchState(store, { entries: [...store.entries(), entry] });
    },
  })),

  withHooks({
    onInit(store) {
      store.loadEntries();
    },
  })
);

import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
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

const initialState: JournalState = { entries: [], isLoading: false };

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
  }))
);

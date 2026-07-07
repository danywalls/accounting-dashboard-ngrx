import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { JournalStore, JournalLine } from '../journal.store';

@Component({
  selector: 'app-ledger-view',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <h3>General Ledger</h3>

    @if (store.isLoading()) {
      <p>Loading entries...</p>
    } @else {
      <table border="1" cellpadding="4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          @for (entry of store.entries(); track entry.id) {
            <tr>
              <td>{{ entry.date }}</td>
              <td>{{ entry.description }}</td>
              <td>{{ getDebitTotal(entry.lines) | currency }}</td>
              <td>{{ getCreditTotal(entry.lines) | currency }}</td>
            </tr>
          } @empty {
            <tr><td colspan="4">No entries yet.</td></tr>
          }
        </tbody>
      </table>
    }

    @if (!store.isBalanced()) {
      <div style="color: red; margin-top: 8px;">
        Warning: Journal entries are not balanced!
      </div>
    }
  `
})
export class LedgerViewComponent implements OnInit {
  readonly store = inject(JournalStore);

  ngOnInit() {
    this.store.loadEntries();
  }

  getDebitTotal(lines: JournalLine[]) {
    return lines.reduce((s, l) => s + l.debit, 0);
  }

  getCreditTotal(lines: JournalLine[]) {
    return lines.reduce((s, l) => s + l.credit, 0);
  }
}

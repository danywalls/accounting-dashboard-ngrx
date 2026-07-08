import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { JournalStore, JournalLine } from '../journal.store';

@Component({
  selector: 'app-ledger-view',
  standalone: true,
  imports: [CurrencyPipe, GridModule],
  template: `
    <h3>General Ledger</h3>

    @if (store.isLoading()) {
      <p>Loading entries...</p>
    } @else {
      <kendo-grid [data]="store.entries()">
        <kendo-grid-column field="date" title="Date" [width]="120">
        </kendo-grid-column>
        <kendo-grid-column field="description" title="Description" [width]="200">
        </kendo-grid-column>
        <kendo-grid-column title="Debit" [width]="120">
          <ng-template kendoGridCellTemplate let-dataItem>
            {{ getDebitTotal(dataItem.lines) | currency }}
          </ng-template>
        </kendo-grid-column>
        <kendo-grid-column title="Credit" [width]="120">
          <ng-template kendoGridCellTemplate let-dataItem>
            {{ getCreditTotal(dataItem.lines) | currency }}
          </ng-template>
        </kendo-grid-column>
      </kendo-grid>
    }

    @if (!store.isBalanced()) {
      <div style="color: red; margin-top: 8px;">
        Warning: Journal entries are not balanced!
      </div>
    }
  `
})
export class LedgerViewComponent {
  readonly store = inject(JournalStore);

  getDebitTotal(lines: JournalLine[]) {
    return lines.reduce((s, l) => s + l.debit, 0);
  }

  getCreditTotal(lines: JournalLine[]) {
    return lines.reduce((s, l) => s + l.credit, 0);
  }
}

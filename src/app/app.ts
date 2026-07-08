import { Component } from '@angular/core';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { LedgerViewComponent } from './ledger-view/ledger-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JournalListComponent, JournalEntryComponent, LedgerViewComponent],
  template: `
    <h1>Accounting Dashboard</h1>
    <div style="display: flex; gap: 20px;">
      <app-journal-entry />
      <app-journal-list />
      <app-ledger-view />
    </div>
  `
})
export class AppComponent {
  title = 'Accounting Dashboard';
}

import { Component } from '@angular/core';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { LedgerViewComponent } from './ledger-view/ledger-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JournalListComponent, JournalEntryComponent, LedgerViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Accounting Dashboard';
}

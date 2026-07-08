import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TextBoxModule } from '@progress/kendo-angular-inputs';

interface JournalEntry {
  id: number;
  date: string;
  description: string;
  total: number;
}

@Component({
  selector: 'app-journal-list',
  standalone: true,
  imports: [CurrencyPipe, TextBoxModule],
  template: `
    <kendo-textbox
      [value]="searchTerm()"
      (valueChange)="searchTerm.set($event)"
      placeholder="Search entries..."
      [clearButton]="true"
      style="width: 100%; margin-bottom: 10px;"
    />

    <p>Showing {{ filteredCount() }} of {{ entries().length }} entries</p>

    @for (entry of filteredEntries(); track entry.id) {
      <div>
        {{ entry.date }} - {{ entry.description }}: {{ entry.total | currency }}
      </div>
    } @empty {
      <p>No entries found.</p>
    }
  `
})
export class JournalListComponent {
  readonly entries = signal<JournalEntry[]>([
    { id: 1, date: '2026-07-01', description: 'Monthly Subscription Sale', total: 150.00 },
    { id: 2, date: '2026-07-02', description: 'Office Supplies', total: 45.50 },
    { id: 3, date: '2026-07-05', description: 'Consulting Service', total: 1200.00 }
  ]);
  readonly searchTerm = signal('');

  readonly filteredEntries = computed(() =>
    this.entries().filter(e =>
      e.description.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );
  readonly filteredCount = computed(() => this.filteredEntries().length);
}

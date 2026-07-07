import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface JournalEntry {
  id: number;
  date: string;
  description: string;
  total: number;
}

@Component({
  selector: 'app-journal-list',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <input
      [value]="searchTerm()"
      (input)="updateSearch($event)"
      placeholder="Search entries..."
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
  readonly entries = signal<JournalEntry[]>([]);
  readonly searchTerm = signal('');

  readonly filteredEntries = computed(() =>
    this.entries().filter(e =>
      e.description.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );
  readonly filteredCount = computed(() => this.filteredEntries().length);

  updateSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}

import { Component, inject } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-journal-entry',
  standalone: true,
  template: `
    <h3>New Journal Entry</h3>

    <label>Revenue Account:</label>
    <select (change)="onSelectAccount($event)">
      <option value="">Select account...</option>
      @for (acct of revenueAccounts(); track acct.code) {
        <option [value]="acct.code">{{ acct.name }} ({{ acct.code }})</option>
      }
    </select>

    @if (selectedAccount(); as acct) {
      <p>Selected: {{ acct.name }} - {{ acct.type }}</p>
    }
  `
})
export class JournalEntryComponent {
  private readonly accountService = inject(AccountService);

  readonly revenueAccounts = this.accountService.revenueAccounts;
  readonly selectedAccount = this.accountService.selectedAccount;

  onSelectAccount(event: Event) {
    const code = (event.target as HTMLSelectElement).value;
    if (code) {
      this.accountService.selectAccount(code);
    }
  }
}

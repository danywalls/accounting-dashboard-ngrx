import { Component, inject } from '@angular/core';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-journal-entry',
  standalone: true,
  imports: [DropDownListModule],
  template: `
    <h3>New Journal Entry</h3>

    <label>Revenue Account:</label>
    <kendo-dropdownlist
      [data]="revenueAccounts()"
      textField="name"
      valueField="code"
      [valuePrimitive]="true"
      [defaultItem]="{ code: '', name: 'Select account...' }"
      (valueChange)="onSelectAccount($event)"
    >
    </kendo-dropdownlist>

    @if (selectedAccount(); as acct) {
      <p>Selected: {{ acct.name }} - {{ acct.type }}</p>
    }
  `
})
export class JournalEntryComponent {
  private readonly accountService = inject(AccountService);

  readonly revenueAccounts = this.accountService.revenueAccounts;
  readonly selectedAccount = this.accountService.selectedAccount;

  onSelectAccount(code: string) {
    if (code) {
      this.accountService.selectAccount(code);
    }
  }
}

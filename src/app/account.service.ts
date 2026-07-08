import { Service, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface Account {
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
}

@Service()
export class AccountService {
  private readonly _accountsRes = httpResource<Account[]>(() => '/api/accounts');
  private readonly _localAccounts = signal<Account[]>([
    { code: '101', name: 'Cash', type: 'asset' },
    { code: '102', name: 'Accounts Receivable', type: 'asset' },
    { code: '401', name: 'Sales Revenue', type: 'revenue' },
    { code: '501', name: 'Operating Expenses', type: 'expense' }
  ]);
  private readonly _selectedCode = signal<string | null>(null);

  readonly accounts = computed(() => [
    ...(this._accountsRes.value() ?? []),
    ...this._localAccounts()
  ]);
  readonly isLoading = this._accountsRes.isLoading;
  readonly selectedCode = this._selectedCode.asReadonly();

  readonly selectedAccount = computed(() =>
    this.accounts().find(a => a.code === this._selectedCode())
  );

  readonly revenueAccounts = computed(() =>
    this.accounts().filter(a => a.type === 'revenue')
  );

  selectAccount(code: string) {
    this._selectedCode.set(code);
  }

  addAccount(account: Account) {
    this._localAccounts.update(list => [...list, account]);
  }
}

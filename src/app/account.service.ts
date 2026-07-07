import { Injectable, computed, signal } from '@angular/core';

export interface Account {
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly _accounts = signal<Account[]>([]);
  private readonly _selectedCode = signal<string | null>(null);

  readonly accounts = this._accounts.asReadonly();
  readonly selectedCode = this._selectedCode.asReadonly();

  readonly selectedAccount = computed(() =>
    this._accounts().find(a => a.code === this._selectedCode())
  );

  readonly revenueAccounts = computed(() =>
    this._accounts().filter(a => a.type === 'revenue')
  );

  load(accounts: Account[]) {
    this._accounts.set(accounts);
  }

  selectAccount(code: string) {
    this._selectedCode.set(code);
  }

  addAccount(account: Account) {
    this._accounts.update(list => [...list, account]);
  }
}

import { signalStore, patchState, withMethods } from '@ngrx/signals';
import { withEntities, setAllEntities, addEntity, entityConfig } from '@ngrx/signals/entities';
import { type } from '@ngrx/signals';
import { Account } from './account.service';

const accountConfig = entityConfig({
  entity: type<Account>(),
  collection: 'accounts',
  selectId: (account) => account.code,
});

export const AccountStore = signalStore(
  { providedIn: 'root' },
  withEntities(accountConfig),
  withMethods((store) => ({
    loadAccounts(accounts: Account[]) {
      patchState(store, setAllEntities(accounts, accountConfig));
    },
    addAccount(account: Account) {
      patchState(store, addEntity(account, accountConfig));
    },
  }))
);

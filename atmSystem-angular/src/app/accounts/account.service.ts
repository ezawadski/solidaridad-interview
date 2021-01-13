import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account, AccountBackend } from './account.model';
import { Transaction, TransactionBackend } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accountsChanged = new Subject<Account[]>();

  private accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  setAccounts(accounts: Account[]): void {
    this.accounts = accounts;
    this.accountsChanged.next(this.accounts.slice());
  }

  getAccounts(): Account[] {
    return this.accounts.slice();
  }

  addAccount(account: Account): void {
    this.accounts.push(account);
    this.accountsChanged.next(this.accounts.slice());
  }

  getAccount(accountId: number): Account {
    const index = this.accounts.findIndex((el) => el.accountId === accountId);

    if (index !== -1) {
      return {
        ...this.accounts[index],
      };
    } else {
      console.error('account not found');
    }
  }

  updateAccount(account: Account): void {
    const index = this.accounts.findIndex(
      (el) => el.accountId === account.accountId
    );

    if (index !== -1) {
      const updatedAccount = {
        ...this.accounts[index],
        ...account,
      };
      this.accounts[index] = updatedAccount;
      this.accountsChanged.next(this.accounts.slice());
    } else {
      console.error('account not found');
    }
  }

  fetchAccount(accountId: number): Observable<Account> {
    return this.http
      .get<AccountBackend>(environment.base_url + 'accounts/' + accountId)
      .pipe(
        map((accountResponse) => {
          return {
            accountId: accountResponse.account_id,
            name: accountResponse.name,
            balance: accountResponse.balance,
          };
        })
      );
  }

  fetchAccounts(): Observable<Account[]> {
    return this.http
      .get<AccountBackend[]>(environment.base_url + 'accounts')
      .pipe(
        map((accountsResponse) => {
          return accountsResponse.map((account) => {
            return {
              accountId: account.account_id,
              name: account.name,
              balance: account.balance,
            };
          });
        }),
        tap((accounts) => {
          this.setAccounts(accounts);
        })
      );
  }

  fetchAccountTransactions(accountId: number): Observable<Transaction[]> {
    return this.http
      .get<TransactionBackend[]>(
        environment.base_url + 'accounts/' + accountId + '/transactions'
      )
      .pipe(
        map((transactionsResponse) => {
          return transactionsResponse.map((transaction) => {
            return {
              transactionId: transaction.transaction_id,
              account: transaction.account,
              transactionType: transaction.transaction_type,
              amount: transaction.amount,
              timestamp: new Date(transaction.timestamp),
            };
          });
        })
      );
  }

  storeNewAccount(account: Account): Observable<any> {
    const newAccountBackend = new AccountBackend(
      account.accountId,
      account.name,
      account.balance
    );
    return this.http
      .post<AccountBackend>(
        environment.base_url + 'accounts',
        newAccountBackend
      )
      .pipe(
        map((accountResponse) => {
          return {
            accountId: accountResponse.account_id,
            name: accountResponse.name,
            balance: accountResponse.balance,
          };
        }),
        tap((newAccountccount) => {
          this.addAccount(newAccountccount);
        })
      );
  }

  storeUpdatedAccount(account: Account): Observable<any> {
    const updatedAccountBackend = new AccountBackend(
      account.accountId,
      account.name,
      account.balance
    );

    return this.http
      .put<AccountBackend>(
        environment.base_url + 'accounts/' + account.accountId,
        updatedAccountBackend
      )
      .pipe(
        map((accountResponse) => {
          return {
            accountId: accountResponse.account_id,
            name: accountResponse.name,
            balance: accountResponse.balance,
          };
        }),
        tap((updatedAccount) => {
          if (this.accounts) {
            this.updateAccount(updatedAccount);
          }
        })
      );
  }
}

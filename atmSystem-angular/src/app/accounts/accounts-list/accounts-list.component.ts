import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AccountService } from '../account.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css'],
})
export class AccountsListComponent implements OnInit, OnDestroy {
  accounts: Account[];

  private accountsSub: Subscription;
  private changeSub: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountsSub = this.accountService.fetchAccounts().subscribe();
    this.changeSub = this.accountService.accountsChanged.subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.accountsSub) {
      this.accountsSub.unsubscribe();
    }
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }
}

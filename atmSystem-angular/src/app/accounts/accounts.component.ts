import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Account } from '../accounts/account.model';
import { AccountService } from '../accounts/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[];

  private subscriptions: Subscription[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.accountService.fetchAccounts().subscribe());
    this.subscriptions.push(
      this.accountService.accountsChanged.subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      })
    );
  }

  onSelectAccount(account: Account): void {
    this.router.navigate([account.accountId + '/actions'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

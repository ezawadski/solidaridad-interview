import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../account.model';
import { Transaction } from '../transaction.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  account: Account = new Account(null, null, null);
  transactions: Transaction[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params.accountId;
        })
      )
      .subscribe((accountId: number) => {
        this.subscriptions.push(
          this.accountService.fetchAccount(accountId).subscribe((account) => {
            this.account = account;
          })
        );
        this.subscriptions.push(
          this.accountService
            .fetchAccountTransactions(accountId)
            .subscribe((transactions) => {
              this.transactions = transactions;
            })
        );
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

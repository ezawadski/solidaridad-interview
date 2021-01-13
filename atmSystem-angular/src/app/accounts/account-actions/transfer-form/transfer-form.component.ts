import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../../account.model';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css'],
})
export class TransferFormComponent implements OnInit, OnDestroy {
  account: Account = new Account(null, null, null);
  accounts: Account[];
  errorMessage: string;

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
          this.accountService.fetchAccounts().subscribe((accounts) => {
            this.accounts = accounts;
            this.accounts = this.accounts.filter((acc) => {
              return acc.accountId !== accountId;
            });
            this.account = this.accountService.getAccount(accountId);
          })
        );
      });
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    if (value.amount > this.account.balance) {
      this.errorMessage = 'Insufficient Funds';
    } else {
      const destinationAccount = this.accountService.getAccount(
        +value.destination
      );
      const updatedDestinationAccount = {
        ...destinationAccount,
        balance: destinationAccount.balance + value.amount,
      };
      const updatedAccount = {
        ...this.account,
        balance: this.account.balance - value.amount,
      };
      this.subscriptions.push(
        this.accountService
          .storeUpdatedAccount(updatedDestinationAccount)
          .subscribe(() => {
            this.subscriptions.push(
              this.accountService
                .storeUpdatedAccount(updatedAccount)
                .subscribe(() => {
                  this.account = updatedAccount;
                })
            );
          })
      );

      form.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

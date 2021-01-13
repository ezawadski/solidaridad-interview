import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Atm } from '../../../atms/atm.model';
import { AtmService, AtmOutput } from '../../../atms/atm.service';
import { Account } from '../../account.model';
import { AccountService } from '../../account.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-withdraw-form',
  templateUrl: './withdraw-form.component.html',
  styleUrls: ['./withdraw-form.component.css'],
})
export class WithdrawFormComponent implements OnInit, OnDestroy {
  atm: Atm = new Atm(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  account: Account = new Account(null, null, null);
  atmOutput: AtmOutput = {
    qtyNote1: null,
    qtyNote2: null,
    qtyNote5: null,
    qtyNote10: null,
    qtyNote20: null,
    qtyNote50: null,
    qtyNote100: null,
    errorMessage: null,
  };
  showOutput = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private atmSerice: AtmService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return {
            atmId: +params.atmId,
            accountId: +params.accountId,
          };
        })
      )
      .subscribe(({ atmId, accountId }) => {
        this.subscriptions.push(
          this.atmSerice.fetchAtm(atmId).subscribe((atm) => {
            this.atm = atm;
          })
        );
        this.subscriptions.push(
          this.accountService.fetchAccount(accountId).subscribe((account) => {
            this.account = account;
          })
        );
      });
  }

  onSubmit(form: NgForm): void {
    const amount = form.value.amount;
    if (amount > this.atm.balance) {
      this.atmOutput.errorMessage =
        'Insufficcient Funds in ATM. Please try again later';
    } else if (amount > this.account.balance) {
      this.atmOutput.errorMessage = 'Insufficcient Funds in your Account.';
    } else {
      const output = this.atmSerice.withdrawCash(this.atm, amount);
      if (!output.errorMessage) {
        const updatedAtm = {
          ...this.atm,
          balance: this.atm.balance - amount,
          qtyNote1: this.atm.qtyNote1 - output.qtyNote1,
          qtyNote2: this.atm.qtyNote2 - output.qtyNote2,
          qtyNote5: this.atm.qtyNote5 - output.qtyNote5,
          qtyNote10: this.atm.qtyNote10 - output.qtyNote10,
          qtyNote20: this.atm.qtyNote20 - output.qtyNote20,
          qtyNote50: this.atm.qtyNote50 - output.qtyNote50,
          qtyNote100: this.atm.qtyNote100 - output.qtyNote100,
        };
        this.subscriptions.push(
          this.atmSerice.storeUpdatedAtm(updatedAtm).subscribe(() => {
            const updatedAccount = {
              ...this.account,
              balance: this.account.balance - amount,
            };
            this.subscriptions.push(
              this.accountService
                .storeUpdatedAccount(updatedAccount)
                .subscribe(() => {
                  this.atm = updatedAtm;
                  this.account = updatedAccount;
                  this.atmOutput = output;
                  this.showOutput = true;
                })
            );
          })
        );

        form.reset();
      } else {
        this.atmOutput.errorMessage = output.errorMessage;
        this.showOutput = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Account } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit, OnDestroy {
  private accountSub: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    const newAccount = new Account(null, form.value.name, form.value.balance);
    this.accountSub = this.accountService
      .storeNewAccount(newAccount)
      .subscribe();

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }
}

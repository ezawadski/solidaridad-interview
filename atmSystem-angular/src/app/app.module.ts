import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AtmsComponent } from './atms/atms.component';
import { AtmListComponent } from './atms/atm-list/atm-list.component';
import { AtmEditComponent } from './atms/atm-edit/atm-edit.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsListComponent } from './accounts/accounts-list/accounts-list.component';
import { AccountEditComponent } from './accounts/account-edit/account-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountActionsComponent } from './accounts/account-actions/account-actions.component';
import { AccountInfoComponent } from './accounts/account-info/account-info.component';
import { TransferFormComponent } from './accounts/account-actions/transfer-form/transfer-form.component';
import { WithdrawFormComponent } from './accounts/account-actions/withdraw-form/withdraw-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AtmsComponent,
    AtmListComponent,
    AtmEditComponent,
    AccountsComponent,
    AccountsListComponent,
    AccountEditComponent,
    DashboardComponent,
    AccountActionsComponent,
    AccountInfoComponent,
    WithdrawFormComponent,
    TransferFormComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

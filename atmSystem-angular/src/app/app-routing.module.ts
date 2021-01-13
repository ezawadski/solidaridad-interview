import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AtmListComponent } from './atms/atm-list/atm-list.component';
import { AccountsListComponent } from './accounts/accounts-list/accounts-list.component';
import { AtmsComponent } from './atms/atms.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountActionsComponent } from './accounts/account-actions/account-actions.component';
import { AccountInfoComponent } from './accounts/account-info/account-info.component';
import { WithdrawFormComponent } from './accounts/account-actions/withdraw-form/withdraw-form.component';
import { TransferFormComponent } from './accounts/account-actions/transfer-form/transfer-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'atms', component: AtmsComponent },
  { path: 'atms/:atmId/accounts', component: AccountsComponent },
  {
    path: 'atms/:atmId/accounts/:accountId/actions',
    component: AccountActionsComponent,
  },
  {
    path: 'atms/:atmId/accounts/:accountId/actions/info',
    component: AccountInfoComponent,
  },
  {
    path: 'atms/:atmId/accounts/:accountId/actions/withdraw',
    component: WithdrawFormComponent,
  },
  {
    path: 'atms/:atmId/accounts/:accountId/actions/transfer',
    component: TransferFormComponent,
  },
  { path: 'atms_list', component: AtmListComponent },
  { path: 'accounts_list', component: AccountsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

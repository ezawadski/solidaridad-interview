import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-actions',
  templateUrl: './account-actions.component.html',
  styleUrls: ['./account-actions.component.css'],
})
export class AccountActionsComponent implements OnInit {
  actions: { id: number; label: string }[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.actions = [
      { id: 0, label: 'Balance and Transactions' },
      { id: 2, label: 'Withdraw' },
      { id: 3, label: 'Transfer' },
    ];
  }

  onSelectAction(action: string): void {
    let route = '';
    if (action === this.actions[0].label) {
      route = 'info';
    } else if (action === this.actions[1].label) {
      route = 'withdraw';
    } else if (action === this.actions[2].label) {
      route = 'transfer';
    }
    this.router.navigate([route], { relativeTo: this.route });
  }
}

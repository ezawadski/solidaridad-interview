import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Atm } from '../atms/atm.model';
import { AtmService } from '../atms/atm.service';

@Component({
  selector: 'app-atms',
  templateUrl: './atms.component.html',
  styleUrls: ['./atms.component.css'],
})
export class AtmsComponent implements OnInit, OnDestroy {
  atms: Atm[];

  private subscriptions: Subscription[] = [];

  constructor(
    private atmService: AtmService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.atmService.fetchAtms().subscribe());
    this.subscriptions.push(
      this.atmService.atmsChanged.subscribe((atms: Atm[]) => {
        this.atms = atms;
      })
    );
  }

  onSelectAtm(atm: Atm): void {
    this.router.navigate([atm.atmId + '/accounts'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

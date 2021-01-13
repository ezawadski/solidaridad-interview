import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Atm } from '../atm.model';
import { AtmService } from '../atm.service';

@Component({
  selector: 'app-atm-list',
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.css'],
})
export class AtmListComponent implements OnInit, OnDestroy {
  atms: Atm[];

  private atmsSub: Subscription;
  private changeSub: Subscription;

  constructor(private atmService: AtmService) {}

  ngOnInit(): void {
    this.atmsSub = this.atmService.fetchAtms().subscribe();
    this.changeSub = this.atmService.atmsChanged.subscribe((atms: Atm[]) => {
      this.atms = atms;
    });
  }

  onEditItem(atmId: number): void {
    this.atmService.startedEditing.next(atmId);
  }

  ngOnDestroy(): void {
    if (this.atmsSub) {
      this.atmsSub.unsubscribe();
    }
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }
}

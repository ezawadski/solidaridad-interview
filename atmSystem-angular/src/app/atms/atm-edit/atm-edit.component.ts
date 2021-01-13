import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Atm } from '../atm.model';
import { AtmService } from '../atm.service';

@Component({
  selector: 'app-atm-edit',
  templateUrl: './atm-edit.component.html',
  styleUrls: ['./atm-edit.component.css'],
})
export class AtmEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) atmForm: NgForm;
  editMode = false;
  editedItem: Atm;

  private atmSub: Subscription;
  private editSub: Subscription;

  constructor(private atmService: AtmService) {}

  ngOnInit(): void {
    this.editSub = this.atmService.startedEditing.subscribe((atmId: number) => {
      this.editMode = true;
      this.editedItem = this.atmService.getAtm(atmId);
      this.atmForm.setValue({
        location: this.editedItem.location,
        qtyNote1: this.editedItem.qtyNote1,
        qtyNote2: this.editedItem.qtyNote2,
        qtyNote5: this.editedItem.qtyNote5,
        qtyNote10: this.editedItem.qtyNote10,
        qtyNote20: this.editedItem.qtyNote20,
        qtyNote50: this.editedItem.qtyNote50,
        qtyNote100: this.editedItem.qtyNote100,
      });
    });
  }

  onSubmit(form: NgForm): void {
    const newAtm = new Atm(
      null,
      form.value.location,
      null,
      form.value.qtyNote1,
      form.value.qtyNote2,
      form.value.qtyNote5,
      form.value.qtyNote10,
      form.value.qtyNote20,
      form.value.qtyNote50,
      form.value.qtyNote100
    );
    if (this.editMode) {
      newAtm.atmId = this.editedItem.atmId;
      this.atmSub = this.atmService.storeUpdatedAtm(newAtm).subscribe();
    } else {
      this.atmSub = this.atmService.storeNewAtm(newAtm).subscribe();
    }

    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.atmSub) {
      this.atmSub.unsubscribe();
    }
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }
}

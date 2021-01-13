import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Atm, AtmBackend } from './atm.model';

export interface AtmOutput {
  qtyNote1: number;
  qtyNote2: number;
  qtyNote5: number;
  qtyNote10: number;
  qtyNote20: number;
  qtyNote50: number;
  qtyNote100: number;
  errorMessage: string;
}

@Injectable({ providedIn: 'root' })
export class AtmService {
  atmsChanged = new Subject<Atm[]>();
  startedEditing = new Subject<number>();

  private atms: Atm[];
  private atmNotes = [100, 50, 20, 10, 5, 2, 1];

  constructor(private http: HttpClient) {}

  setAtms(atms: Atm[]): void {
    this.atms = atms;
    this.atmsChanged.next(this.atms.slice());
  }

  getAtm(atmId: number): Atm {
    const index = this.atms.findIndex((el) => el.atmId === atmId);

    if (index !== -1) {
      return {
        ...this.atms[index],
      };
    } else {
      console.error('atm not found');
    }
  }

  getAtms(): Atm[] {
    return this.atms.slice();
  }

  addAtm(atm: Atm): void {
    this.atms.push(atm);
    this.atmsChanged.next(this.atms.slice());
  }

  updateAtm(atm: Atm): void {
    const index = this.atms.findIndex((el) => el.atmId === atm.atmId);

    if (index !== -1) {
      const updatedAtm = {
        ...this.atms[index],
        ...atm,
      };
      this.atms[index] = updatedAtm;
      this.atmsChanged.next(this.atms.slice());
    } else {
      console.error('atm not found');
    }
  }

  fetchAtm(atmId: number): Observable<Atm> {
    return this.http
      .get<AtmBackend>(environment.base_url + 'atms/' + atmId)
      .pipe(
        map((atmResponse) => {
          return {
            atmId: atmResponse.atm_id,
            location: atmResponse.location,
            balance: atmResponse.balance,
            qtyNote1: atmResponse.qty_note_1,
            qtyNote2: atmResponse.qty_note_2,
            qtyNote5: atmResponse.qty_note_5,
            qtyNote10: atmResponse.qty_note_10,
            qtyNote20: atmResponse.qty_note_20,
            qtyNote50: atmResponse.qty_note_50,
            qtyNote100: atmResponse.qty_note_100,
          };
        })
      );
  }

  fetchAtms(): Observable<Atm[]> {
    return this.http.get<AtmBackend[]>(environment.base_url + 'atms').pipe(
      map((atmsResponse) => {
        return atmsResponse.map((atm) => {
          return {
            atmId: atm.atm_id,
            location: atm.location,
            balance: atm.balance,
            qtyNote1: atm.qty_note_1,
            qtyNote2: atm.qty_note_2,
            qtyNote5: atm.qty_note_5,
            qtyNote10: atm.qty_note_10,
            qtyNote20: atm.qty_note_20,
            qtyNote50: atm.qty_note_50,
            qtyNote100: atm.qty_note_100,
          };
        });
      }),
      tap((atms) => {
        this.setAtms(atms);
      })
    );
  }

  storeNewAtm(atm: Atm): Observable<any> {
    const newAtmBackend = new AtmBackend(
      null,
      atm.location,
      null,
      atm.qtyNote1,
      atm.qtyNote2,
      atm.qtyNote5,
      atm.qtyNote10,
      atm.qtyNote20,
      atm.qtyNote50,
      atm.qtyNote100
    );
    return this.http
      .post<AtmBackend>(environment.base_url + 'atms', newAtmBackend)
      .pipe(
        map((atmResponse) => {
          return {
            atmId: atmResponse.atm_id,
            location: atmResponse.location,
            balance: atmResponse.balance,
            qtyNote1: atmResponse.qty_note_1,
            qtyNote2: atmResponse.qty_note_2,
            qtyNote5: atmResponse.qty_note_5,
            qtyNote10: atmResponse.qty_note_10,
            qtyNote20: atmResponse.qty_note_20,
            qtyNote50: atmResponse.qty_note_50,
            qtyNote100: atmResponse.qty_note_100,
          };
        }),
        tap((newAtm) => {
          this.addAtm(newAtm);
        })
      );
  }

  storeUpdatedAtm(atm: Atm): Observable<any> {
    const updatedAtmBackend = new AtmBackend(
      atm.atmId,
      atm.location,
      null,
      atm.qtyNote1,
      atm.qtyNote2,
      atm.qtyNote5,
      atm.qtyNote10,
      atm.qtyNote20,
      atm.qtyNote50,
      atm.qtyNote100
    );

    return this.http
      .put<AtmBackend>(
        environment.base_url + 'atms/' + atm.atmId,
        updatedAtmBackend
      )
      .pipe(
        map((atmResponse) => {
          return {
            atmId: atmResponse.atm_id,
            location: atmResponse.location,
            balance: atmResponse.balance,
            qtyNote1: atmResponse.qty_note_1,
            qtyNote2: atmResponse.qty_note_2,
            qtyNote5: atmResponse.qty_note_5,
            qtyNote10: atmResponse.qty_note_10,
            qtyNote20: atmResponse.qty_note_20,
            qtyNote50: atmResponse.qty_note_50,
            qtyNote100: atmResponse.qty_note_100,
          };
        }),
        tap((updatedAtm) => {
          if (this.atms) {
            this.updateAtm(updatedAtm);
          }
        })
      );
  }

  withdrawCash(atm: Atm, amount: number): AtmOutput {
    const output = {
      qtyNote1: 0,
      qtyNote2: 0,
      qtyNote5: 0,
      qtyNote10: 0,
      qtyNote20: 0,
      qtyNote50: 0,
      qtyNote100: 0,
      errorMessage: null,
    };
    let remainingBalance = amount;

    this.atmNotes.forEach((note) => {
      if (atm['qtyNote' + note] && remainingBalance >= note) {
        output['qtyNote' + note] = Math.min(
          Math.floor(remainingBalance / note),
          atm['qtyNote' + note]
        );
        remainingBalance -= output['qtyNote' + note] * note;
      }
    });

    if (remainingBalance > 0) {
      output.errorMessage = 'Unable to dispense this amount!';
    }
    return output;
  }
}

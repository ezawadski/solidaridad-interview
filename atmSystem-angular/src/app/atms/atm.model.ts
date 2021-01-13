export class Atm {
  public atmId: number;
  public location: string;
  public balance: number;
  public qtyNote1: number;
  public qtyNote2: number;
  public qtyNote5: number;
  public qtyNote10: number;
  public qtyNote20: number;
  public qtyNote50: number;
  public qtyNote100: number;

  constructor(
    atmId: number,
    location: string,
    balance: number,
    qtyNote1: number,
    qtyNote2: number,
    qtyNote5: number,
    qtyNote10: number,
    qtyNote20: number,
    qtyNote50: number,
    qtyNote100: number
  ) {
    this.atmId = atmId;
    this.location = location;
    this.balance = balance;
    this.qtyNote1 = qtyNote1;
    this.qtyNote2 = qtyNote2;
    this.qtyNote5 = qtyNote5;
    this.qtyNote10 = qtyNote10;
    this.qtyNote20 = qtyNote20;
    this.qtyNote50 = qtyNote50;
    this.qtyNote100 = qtyNote100;
  }
}
export class AtmBackend {
  public atm_id: number;
  public location: string;
  public balance: number;
  public qty_note_1: number;
  public qty_note_2: number;
  public qty_note_5: number;
  public qty_note_10: number;
  public qty_note_20: number;
  public qty_note_50: number;
  public qty_note_100: number;

  constructor(
    atm_id: number,
    location: string,
    balance: number,
    qty_note_1: number,
    qty_note_2: number,
    qty_note_5: number,
    qty_note_10: number,
    qty_note_20: number,
    qty_note_50: number,
    qty_note_100: number
  ) {
    this.atm_id = atm_id;
    this.location = location;
    this.balance = balance;
    this.qty_note_1 = qty_note_1;
    this.qty_note_2 = qty_note_2;
    this.qty_note_5 = qty_note_5;
    this.qty_note_10 = qty_note_10;
    this.qty_note_20 = qty_note_20;
    this.qty_note_50 = qty_note_50;
    this.qty_note_100 = qty_note_100;
  }
}

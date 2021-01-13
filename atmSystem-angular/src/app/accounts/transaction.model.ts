export class Transaction {
  public transactionId: number;
  public account: string;
  public transactionType: string;
  public amount: number;
  public timestamp: Date;

  constructor(
    tranctionId: number,
    account: string,
    transactionType: string,
    amount: number,
    timestamp: Date
  ) {
    this.transactionId = tranctionId;
    this.account = account;
    this.transactionType = transactionType;
    this.amount = amount;
    this.timestamp = timestamp;
  }
}

export class TransactionBackend {
  public transaction_id: number;
  public account: string;
  public transaction_type: string;
  public amount: number;
  public timestamp: string;

  constructor(
    tranction_id: number,
    account: string,
    transaction_type: string,
    amount: number,
    timestamp: string
  ) {
    this.transaction_id = tranction_id;
    this.account = account;
    this.transaction_type = transaction_type;
    this.amount = amount;
    this.timestamp = timestamp;
  }
}

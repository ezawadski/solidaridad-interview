export class Account {
  public accountId: number;
  public name: string;
  public balance: number;

  constructor(accountId: number, name: string, balance: number) {
    this.accountId = accountId;
    this.name = name;
    this.balance = balance;
  }
}

export class AccountBackend {
  public account_id: number;
  public name: string;
  public balance: number;

  constructor(account_id: number, name: string, balance: number) {
    this.account_id = account_id;
    this.name = name;
    this.balance = balance;
  }
}

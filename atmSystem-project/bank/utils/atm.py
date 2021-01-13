def calc_balance(atm):
    balance = 0
    balance += atm.qty_note_1 * 1
    balance += atm.qty_note_2 * 2
    balance += atm.qty_note_5 * 5
    balance += atm.qty_note_10 * 10
    balance += atm.qty_note_20 * 20
    balance += atm.qty_note_50 * 50
    balance += atm.qty_note_100 * 100
    return balance

export class ContractError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ContractError'
  }
}

export class TransactionError extends Error {
  constructor(message, txHash) {
    super(message)
    this.name = 'TransactionError'
    this.txHash = txHash
  }
}
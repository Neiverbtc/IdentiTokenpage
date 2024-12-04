export class ContractError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContractError'
  }
}

export class TransactionError extends Error {
  txHash?: string

  constructor(message: string, txHash?: string) {
    super(message)
    this.name = 'TransactionError'
    this.txHash = txHash
  }
}

export type ErrorWithCode = Error & { code?: string }
import { toast } from 'react-hot-toast'
import type { ErrorWithCode } from './errors'

export function handleTransactionError(error: ErrorWithCode): void {
  console.error('Transaction error:', error)

  if (error.code === 'ACTION_REJECTED' || error.message?.includes('user rejected')) {
    toast.error('Transacción rechazada por el usuario')
    return
  }

  if (error.code === 'INSUFFICIENT_FUNDS' || error.message?.includes('insufficient funds')) {
    toast.error('Fondos insuficientes para realizar la transacción')
    return
  }

  toast.error('Error al procesar la transacción')
}
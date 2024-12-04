import { toast } from 'react-hot-toast'

export function handleTransactionError(error) {
  console.error('Transaction error:', error)

  // Errores de wallet
  if (error.code === 'ACTION_REJECTED' || error.message?.includes('user rejected transaction')) {
    toast.error('Transacción rechazada por el usuario')
    return
  }

  if (error.code === 'INSUFFICIENT_FUNDS') {
    toast.error('Fondos insuficientes para realizar la transacción')
    return
  }

  // Errores específicos del contrato
  if (error.message?.includes('NotVerifier')) {
    toast.error('No tienes permisos de verificador')
    return
  }

  if (error.message?.includes('AlreadyVerified')) {
    toast.error('Esta dirección ya está verificada')
    return
  }

  if (error.message?.includes('InvalidUserAddress')) {
    toast.error('Dirección de usuario inválida')
    return
  }

  if (error.message?.includes('execution reverted')) {
    const revertReason = error.message.match(/execution reverted: (.*?)"/)?.[1]
    if (revertReason) {
      toast.error(`Error del contrato: ${revertReason}`)
      return
    }
  }

  // Error genérico
  toast.error('Error al procesar la transacción. Por favor, intenta de nuevo.')
}
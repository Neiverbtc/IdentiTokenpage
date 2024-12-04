import { toast } from 'react-hot-toast'

export function validateRewardAmount(amount) {
  if (!amount || typeof amount !== 'bigint') {
    return false
  }
  return amount > 0n
}

export function handleRewardError(error) {
  console.error('Reward claim error:', error)

  if (error.message?.includes('No pending rewards')) {
    toast.error('No hay recompensas pendientes para reclamar')
    return
  }

  if (error.message?.includes('Cooldown period active')) {
    toast.error('Debes esperar antes de reclamar nuevamente')
    return
  }

  if (error.message?.includes('user rejected')) {
    toast.error('Transacción rechazada')
    return
  }

  toast.error('Error al reclamar recompensas')
}
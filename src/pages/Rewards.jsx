import { useAccount } from 'wagmi'
import { useContractRead } from '../hooks/useContractRead'
import { useContractWrite } from '../hooks/useContractWrite'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import { toast } from 'react-hot-toast'
import { validateRewardAmount, handleRewardError } from '../utils/rewards'
import RewardStats from '../components/RewardStats'
import ActivityTracker from '../components/ActivityTracker'

export default function Rewards() {
  const { address } = useAccount()
  const [balance, setBalance] = useState('0')
  const [hasBeenRewarded, setHasBeenRewarded] = useState(false)

  const { data: tokenBalance } = useContractRead(
    'IdentiToken',
    'balanceOf',
    [address],
    { enabled: !!address, watch: true }
  )

  const { data: rewardStatus } = useContractRead(
    'IdentiToken',
    'hasBeenRewarded',
    [address],
    { enabled: !!address, watch: true }
  )

  const {
    write: claimReward,
    isLoading,
    isSuccess
  } = useContractWrite('IdentiToken', 'distributeActivityRewards')

  useEffect(() => {
    if (tokenBalance) {
      setBalance(formatEther(tokenBalance))
    }
  }, [tokenBalance])

  useEffect(() => {
    if (rewardStatus !== undefined) {
      setHasBeenRewarded(rewardStatus)
    }
  }, [rewardStatus])

  useEffect(() => {
    if (isSuccess) {
      toast.success('¡Recompensas reclamadas!')
    }
  }, [isSuccess])

  async function handleClaimRewards() {
    if (!address) {
      toast.error('Por favor conecta tu wallet primero')
      return
    }

    try {
      const hasRewards = validateRewardAmount(tokenBalance)
      if (!hasRewards) {
        toast.error('No hay recompensas disponibles para reclamar')
        return
      }

      await claimReward({ args: [address] })
    } catch (error) {
      handleRewardError(error)
    }
  }

  if (!address) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Sistema de Recompensas
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Conecta tu wallet para ver y gestionar tus recompensas.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RewardStats />
      
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Balance de IdentiToken
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Balance actual: <span className="font-medium text-gray-900">{balance} IDT</span></p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleClaimRewards}
              disabled={isLoading || !address || !hasBeenRewarded}
              className={`btn-primary w-full sm:w-auto ${
                (isLoading || !hasBeenRewarded) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Reclamando...' : 'Reclamar Recompensas'}
            </button>
            {!hasBeenRewarded && address && (
              <p className="mt-2 text-sm text-gray-500">
                Debes verificar tu identidad primero para recibir recompensas
              </p>
            )}
          </div>
        </div>
      </div>

      <ActivityTracker />
    </div>
  )
}
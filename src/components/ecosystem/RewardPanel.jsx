import { useAccount } from 'wagmi'
import { useContractRead } from '../../hooks/useContractRead'
import { useContractWrite } from '../../hooks/useContractWrite'
import { formatEther } from 'viem'
import { Card } from '../ui/Card'
import { toast } from 'react-hot-toast'
import { validateRewardAmount, handleRewardError } from '../../utils/rewards'

export default function RewardPanel() {
  const { address } = useAccount()
  const { data: pendingRewards, refetch: refetchRewards } = useContractRead(
    'RewardDistributor',
    'getPendingRewards',
    [address],
    { enabled: !!address, watch: true }
  )

  const {
    write: claimRewards,
    isLoading,
    isSuccess
  } = useContractWrite('RewardDistributor', 'claimRewards')

  const handleClaim = async () => {
    if (!address) {
      toast.error('Por favor conecta tu wallet primero')
      return
    }

    try {
      const hasRewards = validateRewardAmount(pendingRewards)
      if (!hasRewards) {
        toast.error('No hay recompensas disponibles para reclamar')
        return
      }

      await claimRewards()
      await refetchRewards()
      toast.success('¡Recompensas reclamadas exitosamente!')
    } catch (error) {
      handleRewardError(error)
    }
  }

  const formattedRewards = pendingRewards ? formatEther(pendingRewards) : '0'
  const hasRewards = validateRewardAmount(pendingRewards)

  return (
    <Card title="Rewards">
      <div className="px-4 py-5 sm:p-6">
        <dl className="mb-5">
          <dt className="text-sm font-medium text-gray-500">Pending Rewards</dt>
          <dd className="mt-1 text-3xl font-semibold text-primary-600">
            {formattedRewards} IDT
          </dd>
        </dl>
        <button
          onClick={handleClaim}
          disabled={isLoading || !hasRewards}
          className={`btn-primary w-full sm:w-auto ${
            (isLoading || !hasRewards) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Claiming...' : hasRewards ? 'Claim Rewards' : 'No Rewards Available'}
        </button>
      </div>
    </Card>
  )
}
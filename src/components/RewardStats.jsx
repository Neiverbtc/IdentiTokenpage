import { useAccount } from 'wagmi'
import { useContractRead } from '../hooks/useContractRead'
import { formatEther } from 'viem'

export default function RewardStats() {
  const { address } = useAccount()
  const { data: pendingRewards } = useContractRead(
    'RewardDistributor',
    'getPendingRewards',
    [address],
    { enabled: !!address, watch: true }
  )

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Estadísticas de Recompensas
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Recompensas Pendientes
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-primary-600">
              {pendingRewards ? formatEther(pendingRewards) : '0'} IDT
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
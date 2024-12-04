import { useAccount } from 'wagmi'
import TokenStats from '../components/ecosystem/TokenStats'
import TokenTransfer from '../components/ecosystem/TokenTransfer'
import TokenBurn from '../components/ecosystem/TokenBurn'
import VerificationStatus from '../components/ecosystem/VerificationStatus'
import ActivityMetrics from '../components/ecosystem/ActivityMetrics'
import RewardPanel from '../components/ecosystem/RewardPanel'
import ActivityLog from '../components/ActivityLog'
import VerificationHistory from '../components/ecosystem/VerificationHistory'

export default function Dashboard() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Conecta tu Wallet
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Por favor conecta tu wallet para ver tu panel de control.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TokenStats />
        <VerificationStatus />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TokenTransfer />
        <TokenBurn />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityMetrics />
        <ActivityLog />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RewardPanel />
        <VerificationHistory />
      </div>
    </div>
  )
}
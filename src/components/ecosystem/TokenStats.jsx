import { useAccount } from 'wagmi'
import { useContractRead } from '../../hooks/useContractRead'
import { formatEther } from 'viem'
import { Card } from '../ui/Card'

export default function TokenStats() {
  const { address } = useAccount()
  const { data: balance } = useContractRead(
    'IdentiToken',
    'balanceOf',
    [address],
    { enabled: !!address, watch: true }
  )

  return (
    <Card title="Token Statistics">
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500">Your Balance</dt>
          <dd className="mt-1 text-3xl font-semibold text-primary-600">
            {balance ? formatEther(balance) : '0'} IDT
          </dd>
        </div>
      </dl>
    </Card>
  )
}
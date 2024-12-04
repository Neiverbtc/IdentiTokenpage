import { useAccount } from 'wagmi'
import { useContractRead } from '../../hooks/useContractRead'
import { Card } from '../ui/Card'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function VerificationStatus() {
  const { address } = useAccount()
  const { data: isVerified } = useContractRead(
    'IdentityVerificationManager',
    'checkVerificationStatus',
    [address],
    { enabled: !!address, watch: true }
  )

  return (
    <Card title="Verification Status">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center space-x-3">
          {isVerified ? (
            <>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <span className="text-lg font-medium text-green-700">Verified</span>
            </>
          ) : (
            <>
              <XCircleIcon className="h-8 w-8 text-red-500" />
              <span className="text-lg font-medium text-red-700">Not Verified</span>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
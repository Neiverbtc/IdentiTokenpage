import { useEffect, useState } from 'react'
import { useContractEvent } from 'wagmi'
import { Card } from '../ui/Card'
import { formatTimeAgo, formatAddress } from '../../utils/formatters'
import CONTRACTS from '../../config/contracts'

export default function VerificationHistory() {
  const [verifications, setVerifications] = useState([])

  useContractEvent({
    address: CONTRACTS.IdentityVerificationManager.address,
    abi: [
      {
        type: 'event',
        name: 'IdentityVerified',
        inputs: [{ type: 'address', name: 'user', indexed: true }]
      }
    ],
    eventName: 'IdentityVerified',
    listener(log) {
      const newVerification = {
        address: log.args.user,
        timestamp: new Date(),
      }
      setVerifications(prev => [newVerification, ...prev].slice(0, 10))
    },
  })

  return (
    <Card title="Historial de Verificaciones">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {verifications.length > 0 ? (
            verifications.map((verification, index) => (
              <li key={index} className="py-4 px-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {formatAddress(verification.address)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatTimeAgo(verification.timestamp)}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-sm font-semibold text-green-600">
                    Verificado
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 px-4">
              <p className="text-sm text-gray-500">No hay verificaciones recientes</p>
            </li>
          )}
        </ul>
      </div>
    </Card>
  )
}
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useContractRead } from '../hooks/useContractRead'
import { formatEther } from 'viem'

export default function ActivityTracker() {
  const { address } = useAccount()
  const { data: metrics } = useContractRead(
    'ActivityTracker',
    'getUserMetrics',
    [address],
    { enabled: !!address, watch: true }
  )

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Registro de Actividad
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Resumen de tus actividades y métricas
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Consultas DID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {metrics?.[0]?.toString() || '0'}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Actualizaciones DID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {metrics?.[1]?.toString() || '0'}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total de Acciones</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {metrics?.[3]?.toString() || '0'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
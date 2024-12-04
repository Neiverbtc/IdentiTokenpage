import { useAccount } from 'wagmi'
import { useContractRead } from '../../hooks/useContractRead'
import { Card } from '../ui/Card'
import { useEffect } from 'react'

export default function ActivityMetrics() {
  const { address } = useAccount()
  const { data: metrics, refetch } = useContractRead(
    'ActivityTracker',
    'getUserMetrics',
    [address],
    { 
      enabled: !!address,
      watch: true,
      cacheTime: 0,
      staleTime: 0
    }
  )

  useEffect(() => {
    if (!address) return

    const interval = setInterval(() => {
      refetch()
    }, 30000)

    return () => clearInterval(interval)
  }, [address, refetch])

  const [queries, updates, lastActivity, total] = metrics || [0n, 0n, 0n, 0n]

  return (
    <Card title="Métricas de Actividad">
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 px-4 py-5">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Consultas DID</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary-600">
            {queries.toString()}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Actualizaciones DID</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary-600">
            {updates.toString()}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Acciones</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary-600">
            {total.toString()}
          </dd>
        </div>
      </dl>
    </Card>
  )
}
import { useAccount } from 'wagmi'
import { useContractRead } from '../hooks/useContractRead'
import { Card } from './ui/Card'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect } from 'react'

export default function ActivityLog() {
  const { address } = useAccount()
  const { data: metrics, refetch } = useContractRead(
    'ActivityTracker',
    'getUserMetrics',
    [address],
    { 
      enabled: !!address,
      watch: true,
      cacheTime: 0, // Desactivar caché
      staleTime: 0 // Siempre considerar los datos como obsoletos
    }
  )

  // Actualizar datos cada 30 segundos
  useEffect(() => {
    if (!address) return

    const interval = setInterval(() => {
      refetch()
    }, 30000)

    return () => clearInterval(interval)
  }, [address, refetch])

  const [queries, updates, lastActivity, total] = metrics || [0n, 0n, 0n, 0n]
  const lastActivityTime = Number(lastActivity) > 0 ? new Date(Number(lastActivity) * 1000) : null

  return (
    <Card title="Registro de Actividad">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {lastActivityTime && (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Última Actividad
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(lastActivityTime, { 
                      addSuffix: true,
                      locale: es 
                    })}
                  </p>
                </div>
              </div>
            </li>
          )}
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Consultas DID Totales
                </p>
                <p className="text-sm text-gray-500">{queries.toString()}</p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Actualizaciones DID Totales
                </p>
                <p className="text-sm text-gray-500">{updates.toString()}</p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Acciones Totales
                </p>
                <p className="text-sm text-gray-500">{total.toString()}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  )
}
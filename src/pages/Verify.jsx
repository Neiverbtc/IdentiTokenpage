import { useAccount } from 'wagmi'
import { useIdentityVerification } from '../hooks/useIdentityVerification'

export default function Verify() {
  const { address, isConnected } = useAccount()
  const { isVerified, isVerifier, isLoading, verify } = useIdentityVerification()

  async function handleVerification() {
    await verify(address)
  }

  if (!isConnected) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Verificación de Identidad
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Conecta tu wallet para verificar tu identidad.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Verificación de Identidad
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Verifica tu identidad para recibir tokens de recompensa y acceder a todas las funcionalidades.
          </p>
        </div>
        <div className="mt-5">
          {isVerified ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Tu identidad ya está verificada
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleVerification}
              disabled={isLoading || isVerified}
              className={`btn-primary w-full sm:w-auto ${
                (isVerified || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Verificando...' : 'Verificar Identidad'}
            </button>
          )}
          {isVerifier && (
            <p className="mt-2 text-sm text-gray-500">
              Eres un verificador autorizado y puedes validar la identidad de otros usuarios.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
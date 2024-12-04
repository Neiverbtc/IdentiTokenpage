import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useContractRead } from './useContractRead'
import { useContractWrite } from './useContractWrite'
import { toast } from 'react-hot-toast'
import { handleTransactionError } from '../utils/transactions'

export function useIdentityVerification() {
  const { address, isConnected } = useAccount()
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifier, setIsVerifier] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { 
    data: verificationStatus, 
    isError: verificationError,
    refetch: refetchVerificationStatus
  } = useContractRead(
    'IdentityVerificationManager',
    'checkVerificationStatus',
    [address],
    { 
      enabled: !!address,
      watch: true 
    }
  )

  const { 
    data: verifierStatus, 
    isError: verifierError,
    refetch: refetchVerifierStatus
  } = useContractRead(
    'IdentityVerificationManager',
    'isVerifier',
    [address],
    { 
      enabled: !!address,
      watch: true
    }
  )

  const {
    write: verifyIdentity,
    isLoading: isVerifying,
    isSuccess
  } = useContractWrite('IdentityVerificationManager', 'verifyIdentity')

  useEffect(() => {
    if (verificationStatus !== undefined) {
      setIsVerified(verificationStatus)
    }
  }, [verificationStatus])

  useEffect(() => {
    if (verifierStatus !== undefined) {
      setIsVerifier(verifierStatus)
    }
  }, [verifierStatus])

  useEffect(() => {
    if (verificationError) {
      toast.error('Error al verificar el estado de verificación')
    }
    if (verifierError) {
      toast.error('Error al verificar el rol de verificador')
    }
  }, [verificationError, verifierError])

  useEffect(() => {
    if (isSuccess) {
      toast.success('¡Verificación exitosa!')
      refetchVerificationStatus()
    }
  }, [isSuccess, refetchVerificationStatus])

  const verify = async (userAddress) => {
    if (!isConnected) {
      toast.error('Por favor conecta tu wallet primero')
      return false
    }

    if (!userAddress) {
      toast.error('No se detectó una dirección válida')
      return false
    }

    setIsLoading(true)
    try {
      await verifyIdentity({ args: [userAddress] })
      return true
    } catch (error) {
      console.error('Error en verificación:', error)
      handleTransactionError(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isVerified,
    isVerifier,
    isLoading: isLoading || isVerifying,
    verify,
    refetchStatus: () => {
      refetchVerificationStatus()
      refetchVerifierStatus()
    }
  }
}
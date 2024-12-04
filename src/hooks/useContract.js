import { useContractRead, useContractWrite, useAccount } from 'wagmi'
import { useCallback } from 'react'
import CONTRACTS from '../config/contracts'
import { ContractError } from '../utils/errors'

export function useContract(contractName, options = {}) {
  const { address } = useAccount()
  const contract = CONTRACTS[contractName]

  if (!contract) {
    throw new ContractError(`Contract ${contractName} not found`)
  }

  const readConfig = {
    address: contract.address,
    abi: contract.abi,
    ...options
  }

  const writeConfig = {
    ...readConfig,
    account: address
  }

  const read = useCallback((functionName, args = []) => {
    return useContractRead({
      ...readConfig,
      functionName,
      args,
      enabled: options.enabled !== false
    })
  }, [readConfig, options.enabled])

  const write = useCallback((functionName) => {
    return useContractWrite({
      ...writeConfig,
      functionName
    })
  }, [writeConfig])

  return { read, write }
}
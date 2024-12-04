import { useContractRead as useWagmiContractRead, useContractWrite as useWagmiContractWrite } from 'wagmi'
import type { Address } from 'viem'
import { CONTRACTS, type ContractName } from '../config/contracts'
import { ContractError } from '../utils/errors'

interface UseContractReadOptions {
  enabled?: boolean
  watch?: boolean
  cacheTime?: number
  staleTime?: number
}

export function useContractRead<TFunctionName extends string>(
  contractName: ContractName,
  functionName: TFunctionName,
  args: readonly unknown[] = [],
  options: UseContractReadOptions = {}
) {
  const contract = CONTRACTS[contractName]

  if (!contract) {
    throw new ContractError(`Contract ${contractName} not found`)
  }

  return useWagmiContractRead({
    address: contract.address as Address,
    abi: contract.abi,
    functionName,
    args,
    enabled: options.enabled !== false,
    watch: options.watch,
    cacheTime: options.cacheTime,
    staleTime: options.staleTime
  })
}

export function useContractWrite<TFunctionName extends string>(
  contractName: ContractName,
  functionName: TFunctionName
) {
  const contract = CONTRACTS[contractName]

  if (!contract) {
    throw new ContractError(`Contract ${contractName} not found`)
  }

  return useWagmiContractWrite({
    address: contract.address as Address,
    abi: contract.abi,
    functionName
  })
}
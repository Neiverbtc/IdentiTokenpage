import { useContractWrite as useWagmiContractWrite, useWaitForTransaction } from 'wagmi'
import type { Address, Hash } from 'viem'
import { useState } from 'react'
import { CONTRACTS, type ContractName } from '../config/contracts'
import { ContractError } from '../utils/errors'

interface UseContractWriteResult {
  write: (args?: { args: unknown[] }) => void
  hash: Hash | null
  isLoading: boolean
  isSuccess: boolean
}

export function useContractWrite<TFunctionName extends string>(
  contractName: ContractName,
  functionName: TFunctionName
): UseContractWriteResult {
  const contract = CONTRACTS[contractName]
  const [hash, setHash] = useState<Hash | null>(null)

  if (!contract) {
    throw new ContractError(`Contract ${contractName} not found`)
  }

  const { data, isLoading: isWriteLoading, write } = useWagmiContractWrite({
    address: contract.address as Address,
    abi: contract.abi,
    functionName
  })

  const { isLoading: isWaitLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => setHash(data?.hash ?? null)
  })

  return {
    write,
    hash,
    isLoading: isWriteLoading || isWaitLoading,
    isSuccess
  }
}
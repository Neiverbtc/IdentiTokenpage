import { useContractWrite as useWagmiContractWrite, useWaitForTransaction } from 'wagmi'
import { useState } from 'react'
import CONTRACTS from '../config/contracts'
import { ContractError } from '../utils/errors'

export function useContractWrite(contractName, functionName) {
  const contract = CONTRACTS[contractName]
  const [hash, setHash] = useState(null)

  if (!contract) {
    throw new ContractError(`Contract ${contractName} not found`)
  }

  const { data, isLoading: isWriteLoading, write } = useWagmiContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName
  })

  const { isLoading: isWaitLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => setHash(data?.hash)
  })

  return {
    write,
    hash,
    isLoading: isWriteLoading || isWaitLoading,
    isSuccess
  }
}
import { useContractRead as useWagmiContractRead } from 'wagmi'
import CONTRACTS from '../config/contracts'
import { ContractError } from '../utils/errors'

export function useContractRead(contractName, functionName, args = [], options = {}) {
  const contract = CONTRACTS[contractName]

  if (!contract) {
    throw new ContractError(`Contract ${contractName} not found`)
  }

  return useWagmiContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    enabled: options.enabled !== false,
    ...options
  })
}
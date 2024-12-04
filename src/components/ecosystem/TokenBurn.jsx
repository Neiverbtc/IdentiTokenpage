import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useContractWrite } from '../../hooks/useContractWrite'
import { useContractRead } from '../../hooks/useContractRead'
import { Card } from '../ui/Card'
import { toast } from 'react-hot-toast'
import { parseEther, formatEther } from 'viem'

export default function TokenBurn() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')
  const [formattedBalance, setFormattedBalance] = useState('0')

  const { data: balance } = useContractRead(
    'IdentiToken',
    'balanceOf',
    [address],
    { enabled: !!address, watch: true }
  )

  const { write: burn, isLoading } = useContractWrite('IdentiToken', 'burn')

  useEffect(() => {
    if (balance) {
      setFormattedBalance(formatEther(balance))
    }
  }, [balance])

  const handleBurn = async () => {
    if (!address) {
      toast.error('Por favor conecta tu wallet')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Cantidad inválida')
      return
    }

    if (parseFloat(amount) > parseFloat(formattedBalance)) {
      toast.error('Saldo insuficiente')
      return
    }

    try {
      const parsedAmount = parseEther(amount)
      await burn({ 
        args: [parsedAmount],
        from: address
      })
      toast.success('Tokens quemados exitosamente')
      setAmount('')
    } catch (error) {
      console.error('Error al quemar tokens:', error)
      toast.error(error.message || 'Error al quemar tokens')
    }
  }

  return (
    <Card title="Quemar Tokens">
      <div className="p-4 space-y-4">
        <div className="bg-gray-50 px-4 py-2 rounded-md">
          <p className="text-sm text-gray-600">Balance disponible:</p>
          <p className="text-lg font-semibold text-gray-900">{formattedBalance} IDT</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cantidad a Quemar (IDT)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="0.0"
            min="0"
            step="0.000000000000000001"
          />
          {amount && parseFloat(amount) > parseFloat(formattedBalance) && (
            <p className="mt-1 text-sm text-red-600">Saldo insuficiente</p>
          )}
        </div>
        <button
          onClick={handleBurn}
          disabled={isLoading || !amount || parseFloat(amount) > parseFloat(formattedBalance)}
          className={`btn-primary w-full ${
            (isLoading || !amount || parseFloat(amount) > parseFloat(formattedBalance)) 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {isLoading ? 'Quemando...' : 'Quemar Tokens'}
        </button>
      </div>
    </Card>
  )
}
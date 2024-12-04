import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useContractRead } from '../../hooks/useContractRead'
import { useContractWrite } from '../../hooks/useContractWrite'
import { Card } from '../ui/Card'
import { toast } from 'react-hot-toast'
import { parseEther, formatEther, isAddress } from 'viem'

export default function TokenTransfer() {
  const { address } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [formattedBalance, setFormattedBalance] = useState('0')

  const { data: balance } = useContractRead(
    'IdentiToken',
    'balanceOf',
    [address],
    { enabled: !!address, watch: true }
  )

  const { write: transfer, isLoading } = useContractWrite('IdentiToken', 'transfer')

  useEffect(() => {
    if (balance) {
      setFormattedBalance(formatEther(balance))
    }
  }, [balance])

  const handleTransfer = async () => {
    if (!address) {
      toast.error('Por favor conecta tu wallet')
      return
    }

    if (!isAddress(recipient)) {
      toast.error('Dirección de destinatario inválida')
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
      await transfer({ 
        args: [recipient, parsedAmount],
        from: address
      })
      toast.success('Transferencia iniciada')
      setRecipient('')
      setAmount('')
    } catch (error) {
      console.error('Error en transferencia:', error)
      toast.error(error.message || 'Error en la transferencia')
    }
  }

  return (
    <Card title="Transferir Tokens">
      <div className="p-4 space-y-4">
        <div className="bg-gray-50 px-4 py-2 rounded-md">
          <p className="text-sm text-gray-600">Balance disponible:</p>
          <p className="text-lg font-semibold text-gray-900">{formattedBalance} IDT</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dirección del Destinatario
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="0x..."
          />
          {recipient && !isAddress(recipient) && (
            <p className="mt-1 text-sm text-red-600">Dirección inválida</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cantidad (IDT)
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
          onClick={handleTransfer}
          disabled={isLoading || !recipient || !amount || !isAddress(recipient) || parseFloat(amount) > parseFloat(formattedBalance)}
          className={`btn-primary w-full ${
            (isLoading || !recipient || !amount || !isAddress(recipient) || parseFloat(amount) > parseFloat(formattedBalance)) 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {isLoading ? 'Transfiriendo...' : 'Transferir'}
        </button>
      </div>
    </Card>
  )
}
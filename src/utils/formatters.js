import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

dayjs.extend(relativeTime)
dayjs.locale('es')

export function formatTimeAgo(date) {
  return dayjs(date).fromNow()
}

export function formatAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatAmount(amount, decimals = 18) {
  if (!amount) return '0'
  return (BigInt(amount) / BigInt(10 ** decimals)).toString()
}
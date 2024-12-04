export const CoreTestnet = {
  id: 1115,
  name: 'Core Testnet',
  network: 'core_testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tCORE',
    symbol: 'tCORE',
  },
  rpcUrls: {
    public: { http: ['https://rpc.test.btcs.network'] },
    default: { http: ['https://rpc.test.btcs.network'] },
  },
  blockExplorers: {
    default: { name: 'CoreScan', url: 'https://scan.test.btcs.network' },
  },
  testnet: true,
}
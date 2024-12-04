export default {
  IdentityVerificationManager: {
    address: '0x1af6159aB377f6d340cF62d602b95BbEc0165102',
    abi: [
      {
        "inputs": [{"internalType": "address", "name": "verifier", "type": "address"}],
        "name": "addVerifier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "verifyIdentity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "checkVerificationStatus",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "verifier", "type": "address"}],
        "name": "isVerifier",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  },
  IdentiToken: {
    address: '0x1944e80C2AB93146b4dd2Ea190aED293B9Da3301',
    abi: [
      {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "hasBeenRewarded",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "distributeActivityRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  },
  RewardDistributor: {
    address: '0x0494E484c068495029A9265F0E97A5D23Ac1FfAC',
    abi: [
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getPendingRewards",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "calculateAndAccumulateReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "claimRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  },
  ActivityTracker: {
    address: '0xDED1775c51bbb2c195539599f07fD50a5d799E4a',
    abi: [
      {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserMetrics",
        "outputs": [
          {"internalType": "uint256", "name": "queries", "type": "uint256"},
          {"internalType": "uint256", "name": "updates", "type": "uint256"},
          {"internalType": "uint256", "name": "lastActivity", "type": "uint256"},
          {"internalType": "uint256", "name": "total", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {"internalType": "address", "name": "user", "type": "address"},
          {"internalType": "string", "name": "activityType", "type": "string"}
        ],
        "name": "recordActivity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  }
}
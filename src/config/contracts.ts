import type { Address } from 'viem'

export const CONTRACTS = {
  IdentityVerificationManager: {
    address: '0x1af6159aB377f6d340cF62d602b95BbEc0165102' as Address,
    abi: [
      'function verifyIdentity(address user) external',
      'function checkVerificationStatus(address user) external view returns (bool)',
      'function isVerifier(address verifier) external view returns (bool)'
    ] as const
  },
  IdentiToken: {
    address: '0x1944e80C2AB93146b4dd2Ea190aED293B9Da3301' as Address,
    abi: [
      'function balanceOf(address account) external view returns (uint256)',
      'function hasBeenRewarded(address user) external view returns (bool)',
      'function distributeActivityRewards(address user) external'
    ] as const
  },
  RewardDistributor: {
    address: '0x0494E484c068495029A9265F0E97A5D23Ac1FfAC' as Address,
    abi: [
      'function getPendingRewards(address user) external view returns (uint256)',
      'function calculateAndAccumulateReward(address user) external',
      'function claimRewards() external'
    ] as const
  },
  ActivityTracker: {
    address: '0xDED1775c51bbb2c195539599f07fD50a5d799E4a' as Address,
    abi: [
      'function getUserMetrics(address user) external view returns (uint256 queries, uint256 updates, uint256 lastActivity, uint256 total)',
      'function recordActivity(address user, string activityType) external'
    ] as const
  }
} as const

export type ContractName = keyof typeof CONTRACTS
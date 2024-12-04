# IdentiToken Documentation

## Overview

IdentiToken is a decentralized identity verification and reward system built on blockchain technology. It enables users to verify their identity, earn tokens through various activities, and participate in a decentralized identity ecosystem.

## Architecture

### Smart Contracts

The system consists of several interconnected smart contracts:

1. **IdentiToken (ERC20)**
   - Core token contract implementing ERC20 standard
   - Handles reward distribution and token economics
   - Address: `0x1944e80C2AB93146b4dd2Ea190aED293B9Da3301`

2. **IdentityVerificationManager**
   - Manages identity verification process
   - Controls verifier permissions
   - Triggers reward distribution
   - Address: `0x1af6159aB377f6d340cF62d602b95BbEc0165102`

3. **ActivityTracker**
   - Records user activities (DID queries and updates)
   - Maintains activity metrics
   - Address: `0xDED1775c51bbb2c195539599f07fD50a5d799E4a`

4. **RewardDistributor**
   - Calculates and distributes activity-based rewards
   - Implements reward cooldown periods
   - Address: `0x0494E484c068495029A9265F0E97A5D23Ac1FfAC`

### Token Economics

- **Initial Supply**: 10,000,000 IDT
- **Verification Reward**: 100 IDT
- **Activity Rewards**: 1-50 IDT per action
- **Daily Reward Limit**: 1,000 IDT
- **Reward Cooldown**: 24 hours

## Features

### Identity Verification

1. **Verification Process**
   - Users submit verification request
   - Authorized verifiers validate identity
   - Automatic reward distribution upon verification

2. **Verifier Management**
   - Owner can add/remove verifiers
   - Verifiers have special permissions
   - Multi-level verification system

### Activity Tracking

1. **Tracked Activities**
   - DID Queries
   - DID Updates
   - Total Actions

2. **Metrics**
   - Activity counts
   - Last activity timestamp
   - Cumulative statistics

### Reward System

1. **Types of Rewards**
   - Verification rewards (one-time)
   - Activity-based rewards (recurring)
   - Special event rewards

2. **Distribution Rules**
   - Daily limits
   - Cooldown periods
   - Activity thresholds

## Security

### Protection Mechanisms

1. **Circuit Breaker**
   - Emergency pause functionality
   - Owner-controlled circuit breaker
   - Gradual system restoration

2. **Flash Loan Protection**
   - Operation delay checks
   - Transaction spacing requirements
   - Anti-manipulation measures

3. **Access Control**
   - Role-based permissions
   - Owner privileges
   - Verifier restrictions

### Validators

1. **BaseValidator**
   - Address validation
   - Amount validation
   - Basic security checks

2. **RewardValidator**
   - Reward amount validation
   - Frequency checks
   - Limit enforcement

## Integration Guide

### Frontend Integration

```javascript
// Connect to IdentiToken
const identiToken = new Contract(
  CONTRACTS.IdentiToken.address,
  CONTRACTS.IdentiToken.abi,
  signer
);

// Check verification status
const isVerified = await identiToken.checkVerificationStatus(userAddress);

// Get token balance
const balance = await identiToken.balanceOf(userAddress);

// Claim rewards
await identiToken.distributeActivityRewards(userAddress);
```

### Activity Recording

```javascript
// Record user activity
const activityTracker = new Contract(
  CONTRACTS.ActivityTracker.address,
  CONTRACTS.ActivityTracker.abi,
  signer
);

await activityTracker.recordActivity(userAddress, "query");
```

### Reward Distribution

```javascript
// Check pending rewards
const rewardDistributor = new Contract(
  CONTRACTS.RewardDistributor.address,
  CONTRACTS.RewardDistributor.abi,
  signer
);

const pendingRewards = await rewardDistributor.getPendingRewards(userAddress);
```

## Development Setup

1. **Prerequisites**
   - Node.js 16+
   - npm or yarn
   - MetaMask or similar wallet

2. **Installation**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure environment variables
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Testing

1. **Smart Contract Tests**
   ```bash
   npm run test
   ```

2. **Coverage Report**
   ```bash
   npm run coverage
   ```

## Deployment

1. **Contract Deployment**
   ```bash
   npm run deploy:core
   ```

2. **Frontend Deployment**
   ```bash
   npm run build
   # Deploy dist folder
   ```

## Security Considerations

1. **Best Practices**
   - Regular audits
   - Rate limiting
   - Input validation
   - Access control

2. **Known Limitations**
   - Gas costs
   - Network congestion
   - Verification delays

## Future Roadmap

1. **Phase 1: Enhancement**
   - Additional verification methods
   - Enhanced reward mechanisms
   - Improved activity tracking

2. **Phase 2: Expansion**
   - Cross-chain integration
   - Governance implementation
   - Advanced identity features

3. **Phase 3: Ecosystem**
   - Partner integrations
   - Additional use cases
   - Community governance
# Technical Architecture

## Smart Contract Architecture

### Core Contracts

```mermaid
graph TD
    A[IdentiToken] --> B[IdentityVerificationManager]
    A --> C[ActivityTracker]
    A --> D[RewardDistributor]
    B --> E[Verification Logic]
    C --> F[Activity Metrics]
    D --> G[Reward Calculation]
```

### Security Layer

```mermaid
graph TD
    A[SecurityManager] --> B[CircuitBreaker]
    A --> C[FlashLoanProtection]
    A --> D[Validators]
    D --> E[BaseValidator]
    D --> F[RewardValidator]
    D --> G[TokenValidator]
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant VerificationManager
    participant IdentiToken
    participant ActivityTracker
    participant RewardDistributor

    User->>VerificationManager: Request Verification
    VerificationManager->>IdentiToken: Trigger Reward
    IdentiToken->>User: Mint Tokens
    User->>ActivityTracker: Perform Action
    ActivityTracker->>RewardDistributor: Calculate Reward
    RewardDistributor->>IdentiToken: Distribute Tokens
```

## Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── ecosystem/
│   │   ├── TokenStats.jsx
│   │   ├── VerificationStatus.jsx
│   │   ├── ActivityMetrics.jsx
│   │   └── RewardPanel.jsx
│   └── ui/
│       └── Card.jsx
├── hooks/
│   ├── useContractRead.ts
│   └── useContractWrite.ts
├── pages/
│   ├── Dashboard.jsx
│   ├── Verify.jsx
│   └── Rewards.jsx
└── config/
    └── contracts.ts
```

### State Management

- Wagmi for blockchain state
- React Query for data fetching
- React Context for global state
- Local state for component-specific data

### Data Flow

1. Contract Interaction
   - Hooks abstract contract calls
   - TypeScript ensures type safety
   - Error handling middleware

2. User Interface
   - Component composition
   - Responsive design
   - Progressive enhancement

3. Security
   - Input validation
   - Transaction confirmation
   - Error boundaries
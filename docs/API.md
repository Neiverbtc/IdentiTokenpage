# API Documentation

## Smart Contract APIs

### IdentiToken

```solidity
interface IIdentiToken {
    function rewardIdentityVerification(address user) external;
    function distributeActivityRewards(address user) external;
    function burn(uint256 amount) external;
    function hasBeenRewarded(address user) external view returns (bool);
}
```

### IdentityVerificationManager

```solidity
interface IVerificationManager {
    function setTokenContract(address _tokenContract) external;
    function verifyIdentity(address user) external;
    function checkVerificationStatus(address user) external view returns (bool);
}
```

### ActivityTracker

```solidity
interface IActivityTracker {
    function recordActivity(address user, string memory activityType) external;
    function getUserMetrics(address user) external view returns (
        uint256 queries,
        uint256 updates,
        uint256 lastActivity,
        uint256 total
    );
}
```

### RewardDistributor

```solidity
interface IRewardDistributor {
    function getPendingRewards(address user) external view returns (uint256);
    function calculateAndAccumulateReward(address user) external;
    function claimRewards() external;
}
```

## Frontend Hooks

### useContractRead

```typescript
function useContractRead<TFunctionName extends string>(
    contractName: ContractName,
    functionName: TFunctionName,
    args?: readonly unknown[],
    options?: UseContractReadOptions
): {
    data: unknown;
    isError: boolean;
    isLoading: boolean;
    error?: Error;
}
```

### useContractWrite

```typescript
function useContractWrite<TFunctionName extends string>(
    contractName: ContractName,
    functionName: TFunctionName
): {
    write: (args?: { args: unknown[] }) => void;
    hash: Hash | null;
    isLoading: boolean;
    isSuccess: boolean;
}
```

## Error Codes

```typescript
enum ErrorCodes {
    INVALID_ACCOUNT = "InvalidAccount",
    INVALID_AMOUNT = "InvalidAmount",
    INVALID_OPERATION = "InvalidOperation",
    LIMIT_EXCEEDED = "LimitExceeded",
    UNAUTHORIZED = "Unauthorized",
    ALREADY_VERIFIED = "AlreadyVerified",
    COOLDOWN_ACTIVE = "CooldownActive"
}
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RewardSecurity } from "./RewardSecurity.sol";
import { RewardTrackingStorage } from "./tracking/RewardTrackingStorage.sol";

contract RewardManager is RewardSecurity, RewardTrackingStorage {
    error InvalidRewardOperation();
    error InvalidRewardLimit();

    event RewardProcessed(address indexed user, uint256 amount);
    event RewardLimitUpdated(uint256 newLimit);

    uint256 private rewardLimit;

    constructor() {
        rewardLimit = MAX_REWARD_PER_DAY;
    }

    function processReward(address user, uint256 amount) internal validateReward(amount) {
        require(_updateRewardTrackingInternal(user, amount), "Reward tracking failed");
        _updateRewardMetrics(user, amount);
        emit RewardProcessed(user, amount);
    }

    function getRewardStatus(address user) external view returns (
        uint256 dailyTotal,
        uint256 lastReward,
        bool cooldownActive
    ) {
        (dailyTotal, lastReward) = _getRewardTrackingInternal(user);
        cooldownActive = (block.timestamp - lastReward) < REWARD_COOLDOWN;
    }

    function updateRewardLimit(uint256 newLimit) internal {
        if (newLimit == 0) revert InvalidRewardLimit();
        rewardLimit = newLimit;
        emit RewardLimitUpdated(newLimit);
    }
}
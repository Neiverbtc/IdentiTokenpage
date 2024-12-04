// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenConfig } from "../config/IdentiTokenConfig.sol";

/**
 * @title RewardStorage
 * @dev Almacenamiento específico para recompensas
 */
abstract contract RewardStorage {
    struct RewardMetrics {
        uint256 totalRewards;
        uint256 lastRewardTime;
        uint256 rewardCount;
    }

    mapping(address => RewardMetrics) private rewardMetrics;

    event RewardMetricsUpdated(
        address indexed user,
        uint256 totalRewards,
        uint256 rewardCount
    );

    function _updateRewardMetrics(address user, uint256 amount) internal {
        RewardMetrics storage metrics = rewardMetrics[user];
        metrics.totalRewards += amount;
        metrics.lastRewardTime = block.timestamp;
        metrics.rewardCount++;

        emit RewardMetricsUpdated(
            user,
            metrics.totalRewards,
            metrics.rewardCount
        );
    }

    function _getRewardMetrics(address user) internal view returns (RewardMetrics memory) {
        return rewardMetrics[user];
    }

    function _canReceiveReward(address user) internal view returns (bool) {
        return block.timestamp - rewardMetrics[user].lastRewardTime >= IdentiTokenConfig.getRewardCooldown();
    }
}
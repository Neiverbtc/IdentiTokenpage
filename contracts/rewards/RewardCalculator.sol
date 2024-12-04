// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RewardCalculator
 * @dev Calcula recompensas basadas en la actividad del usuario
 */
library RewardCalculator {
    uint256 private constant BASE_REWARD = 10 * 10**18;
    uint256 private constant MAX_MULTIPLIER = 3;
    uint256 private constant ACTIVITY_THRESHOLD = 100;
    uint256 private constant TIME_WINDOW = 7 days;

    struct ActivityMetrics {
        uint256 didQueries;
        uint256 didUpdates;
        uint256 lastActivityTimestamp;
        uint256 totalActions;
    }

    function calculateReward(
        ActivityMetrics memory metrics,
        uint256 currentTime
    ) internal pure returns (uint256) {
        if (currentTime - metrics.lastActivityTimestamp > TIME_WINDOW) {
            return BASE_REWARD;
        }

        uint256 activityMultiplier = _calculateActivityMultiplier(metrics.totalActions);
        uint256 consistencyBonus = _calculateConsistencyBonus(metrics);
        
        return (BASE_REWARD * activityMultiplier * (100 + consistencyBonus)) / 100;
    }

    function _calculateActivityMultiplier(uint256 totalActions) private pure returns (uint256) {
        if (totalActions >= ACTIVITY_THRESHOLD) {
            return MAX_MULTIPLIER;
        }
        return 1 + (totalActions * (MAX_MULTIPLIER - 1)) / ACTIVITY_THRESHOLD;
    }

    function _calculateConsistencyBonus(ActivityMetrics memory metrics) private pure returns (uint256) {
        uint256 queryRatio = (metrics.didQueries * 100) / (metrics.totalActions > 0 ? metrics.totalActions : 1);
        uint256 updateRatio = (metrics.didUpdates * 100) / (metrics.totalActions > 0 ? metrics.totalActions : 1);
        
        return (queryRatio + updateRatio) / 4; // Máximo 50% de bonus
    }
}
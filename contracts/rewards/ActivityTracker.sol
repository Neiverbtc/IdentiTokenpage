// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RewardCalculator } from "./RewardCalculator.sol";

/**
 * @title ActivityTracker
 * @dev Rastrea la actividad del usuario para el cálculo de recompensas
 */
contract ActivityTracker {
    using RewardCalculator for RewardCalculator.ActivityMetrics;

    mapping(address => RewardCalculator.ActivityMetrics) private userMetrics;
    
    event ActivityRecorded(address indexed user, string activityType, uint256 timestamp);
    
    error InvalidActivityType();

    function recordActivity(address user, string memory activityType) external {
        RewardCalculator.ActivityMetrics storage metrics = userMetrics[user];
        
        if (_compareStrings(activityType, "query")) {
            metrics.didQueries++;
        } else if (_compareStrings(activityType, "update")) {
            metrics.didUpdates++;
        } else {
            revert InvalidActivityType();
        }
        
        metrics.totalActions++;
        metrics.lastActivityTimestamp = block.timestamp;
        
        emit ActivityRecorded(user, activityType, block.timestamp);
    }

    function getUserMetrics(address user) external view returns (
        uint256 queries,
        uint256 updates,
        uint256 lastActivity,
        uint256 total
    ) {
        RewardCalculator.ActivityMetrics storage metrics = userMetrics[user];
        return (
            metrics.didQueries,
            metrics.didUpdates,
            metrics.lastActivityTimestamp,
            metrics.totalActions
        );
    }

    function _compareStrings(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
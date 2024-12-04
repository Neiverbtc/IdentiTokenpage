// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RewardCalculator } from "./RewardCalculator.sol";
import { ActivityTracker } from "./ActivityTracker.sol";

/**
 * @title RewardDistributor
 * @dev Gestiona la distribución de recompensas
 */
contract RewardDistributor {
    ActivityTracker public immutable ACTIVITY_TRACKER;
    
    mapping(address => uint256) public lastRewardTimestamp;
    mapping(address => uint256) public pendingRewards;
    
    uint256 private constant REWARD_COOLDOWN = 1 days;
    
    event RewardDistributed(address indexed user, uint256 amount);
    event RewardAccumulated(address indexed user, uint256 amount);
    
    error CooldownActive();
    error NoPendingRewards();

    constructor(address _activityTracker) {
        ACTIVITY_TRACKER = ActivityTracker(_activityTracker);
    }

    function calculateAndAccumulateReward(address user) external {
        (uint256 queries, uint256 updates, uint256 lastActivity, uint256 total) = ACTIVITY_TRACKER.getUserMetrics(user);
        
        RewardCalculator.ActivityMetrics memory metrics = RewardCalculator.ActivityMetrics({
            didQueries: queries,
            didUpdates: updates,
            lastActivityTimestamp: lastActivity,
            totalActions: total
        });
        
        uint256 reward = RewardCalculator.calculateReward(metrics, block.timestamp);
        pendingRewards[user] += reward;
        
        emit RewardAccumulated(user, reward);
    }

    function claimRewards() external {
        if (block.timestamp - lastRewardTimestamp[msg.sender] < REWARD_COOLDOWN) {
            revert CooldownActive();
        }
        
        uint256 reward = pendingRewards[msg.sender];
        if (reward == 0) {
            revert NoPendingRewards();
        }
        
        pendingRewards[msg.sender] = 0;
        lastRewardTimestamp[msg.sender] = block.timestamp;
        
        emit RewardDistributed(msg.sender, reward);
    }

    function getPendingRewards(address user) external view returns (uint256) {
        return pendingRewards[user];
    }
}
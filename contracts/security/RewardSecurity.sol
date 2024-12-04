// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RewardSecurity
 * @dev Gestiona la seguridad específica para recompensas
 */
contract RewardSecurity {
    error RewardTooHigh();
    error CooldownPeriodActive();

    uint256 internal constant MAX_REWARD_PER_DAY = 1000 * 10**18;
    uint256 internal constant REWARD_COOLDOWN = 24 hours;

    mapping(address => uint256) internal lastRewardTimestamp;
    mapping(address => uint256) internal dailyRewardTotal;
    mapping(address => uint256) internal rewardPeriodStart;

    modifier validateReward(uint256 amount) {
        _validateRewardAmount(amount);
        _validateCooldown(msg.sender);
        _;
    }

    function _validateRewardAmount(uint256 amount) private view {
        uint256 currentPeriod = block.timestamp / 1 days;
        uint256 userPeriod = rewardPeriodStart[msg.sender] / 1 days;

        uint256 total = amount;
        if (currentPeriod == userPeriod) {
            total += dailyRewardTotal[msg.sender];
        }

        if (total > MAX_REWARD_PER_DAY) {
            revert RewardTooHigh();
        }
    }

    function _validateCooldown(address user) private view {
        if (block.timestamp - lastRewardTimestamp[user] < REWARD_COOLDOWN) {
            revert CooldownPeriodActive();
        }
    }

    function _updateRewardMetrics(address user, uint256 amount) internal {
        uint256 currentPeriod = block.timestamp / 1 days;
        uint256 userPeriod = rewardPeriodStart[user] / 1 days;

        if (currentPeriod > userPeriod) {
            dailyRewardTotal[user] = 0;
            rewardPeriodStart[user] = block.timestamp;
        }

        dailyRewardTotal[user] += amount;
        lastRewardTimestamp[user] = block.timestamp;
    }
}
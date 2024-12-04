// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library IdentiTokenConfig {
    uint256 private constant INITIAL_SUPPLY = 10_000_000 * 10 ** 18;
    uint256 private constant VERIFICATION_REWARD = 100 * 10 ** 18;
    uint256 private constant MAX_DAILY_REWARD = 1000 * 10 ** 18;
    uint256 private constant MIN_ACTIVITY_REWARD = 1 * 10 ** 18;
    uint256 private constant MAX_ACTIVITY_REWARD = 50 * 10 ** 18;
    uint256 private constant REWARD_COOLDOWN = 24 hours;

    function getInitialSupply() internal pure returns (uint256) {
        return INITIAL_SUPPLY;
    }

    function getVerificationReward() internal pure returns (uint256) {
        return VERIFICATION_REWARD;
    }

    function getMaxDailyReward() internal pure returns (uint256) {
        return MAX_DAILY_REWARD;
    }

    function getMinActivityReward() internal pure returns (uint256) {
        return MIN_ACTIVITY_REWARD;
    }

    function getMaxActivityReward() internal pure returns (uint256) {
        return MAX_ACTIVITY_REWARD;
    }

    function getRewardCooldown() internal pure returns (uint256) {
        return REWARD_COOLDOWN;
    }
}
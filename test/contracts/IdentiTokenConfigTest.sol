// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenConfig } from "../token/config/IdentiTokenConfig.sol";

contract IdentiTokenConfigTest {
    function getInitialSupply() external pure returns (uint256) {
        return IdentiTokenConfig.getInitialSupply();
    }

    function getVerificationReward() external pure returns (uint256) {
        return IdentiTokenConfig.getVerificationReward();
    }

    function getMaxDailyReward() external pure returns (uint256) {
        return IdentiTokenConfig.getMaxDailyReward();
    }

    function getMinActivityReward() external pure returns (uint256) {
        return IdentiTokenConfig.getMinActivityReward();
    }

    function getMaxActivityReward() external pure returns (uint256) {
        return IdentiTokenConfig.getMaxActivityReward();
    }

    function getRewardCooldown() external pure returns (uint256) {
        return IdentiTokenConfig.getRewardCooldown();
    }
}
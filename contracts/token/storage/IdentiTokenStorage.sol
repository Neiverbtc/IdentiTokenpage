// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenConfig } from "../config/IdentiTokenConfig.sol";

abstract contract IdentiTokenStorage {
    using IdentiTokenConfig for *;

    struct UserState {
        bool rewarded;
        uint256 lastRewardTime;
        uint256 dailyRewardTotal;
    }

    mapping(address => UserState) private userStates;

    event SecurityStateChanged(
        address indexed user, 
        bool rewarded, 
        uint256 lastRewardTime
    );

    function _setRewardedFlag(address user) internal {
        UserState storage state = userStates[user];
        state.rewarded = true;
        state.lastRewardTime = block.timestamp;
        emit SecurityStateChanged(user, true, block.timestamp);
    }

    function _hasBeenRewarded(address user) internal view returns (bool) {
        return userStates[user].rewarded;
    }

    function _updateDailyReward(address user, uint256 amount) internal {
        UserState storage state = userStates[user];
        if (block.timestamp - state.lastRewardTime >= 1 days) {
            state.dailyRewardTotal = 0;
        }
        state.dailyRewardTotal += amount;
        require(state.dailyRewardTotal <= IdentiTokenConfig.getMaxDailyReward(), "Daily reward limit exceeded");
        state.lastRewardTime = block.timestamp;
    }

    function getInitialSupply() internal pure returns (uint256) {
        return IdentiTokenConfig.getInitialSupply();
    }

    function getVerificationReward() internal pure returns (uint256) {
        return IdentiTokenConfig.getVerificationReward();
    }

    function getMaxDailyReward() internal pure returns (uint256) {
        return IdentiTokenConfig.getMaxDailyReward();
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../security/tracking/RewardTrackingStorage.sol";

contract RewardTrackingTest is RewardTrackingStorage {
    function updateRewardTracking(
        address account,
        uint256 amount
    ) public virtual override returns (bool) {
        return super.updateRewardTracking(account, amount);
    }

    function getRewardTracking(
        address account
    ) public view virtual override returns (uint256, uint256) {
        return super.getRewardTracking(account);
    }
}
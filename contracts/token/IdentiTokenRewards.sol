// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenBase } from "./IdentiTokenBase.sol";
import { ITokenEvents } from "../events/TokenEvents.sol";
import { ActivityTracker } from "../rewards/ActivityTracker.sol";
import { RewardDistributor } from "../rewards/RewardDistributor.sol";
import { AddressUtils } from "../security/AddressUtils.sol";
import { IdentityVerificationManager } from "../verification/IdentityVerificationManager.sol";
import { AlreadyRewarded, UnauthorizedCaller } from "../errors/TokenErrors.sol";

abstract contract IdentiTokenRewards is IdentiTokenBase, ITokenEvents {
    using AddressUtils for address;

    ActivityTracker public immutable ACTIVITY_TRACKER;
    RewardDistributor public immutable REWARD_DISTRIBUTOR;
    IdentityVerificationManager public immutable IDENTITY_VERIFICATION;

    uint256 private constant VERIFICATION_REWARD = 100 * 10**18;

    constructor(address verificationContract) 
        IdentiTokenBase("IdentiToken", "IDT") 
    {
        verificationContract.validateAddress();
        IDENTITY_VERIFICATION = IdentityVerificationManager(verificationContract);
        ACTIVITY_TRACKER = new ActivityTracker();
        REWARD_DISTRIBUTOR = new RewardDistributor(address(ACTIVITY_TRACKER));
    }

    function rewardIdentityVerification(
        address user
    ) external override nonReentrant whenNotPaused validarOperacionRecompensa(user, VERIFICATION_REWARD) {
        if (msg.sender != address(IDENTITY_VERIFICATION)) revert UnauthorizedCaller();
        if (_hasBeenRewarded(user)) revert AlreadyRewarded();

        _setRewardedFlag(user);
        _mint(user, VERIFICATION_REWARD);
        emit IdentityVerified(user, VERIFICATION_REWARD);
    }

    function distributeActivityRewards(address user) external override nonReentrant whenNotPaused {
        require(user != address(0), "Invalid user address");
        
        uint256 pendingReward = REWARD_DISTRIBUTOR.getPendingRewards(user);
        
        if (pendingReward > 0) {
            REWARD_DISTRIBUTOR.calculateAndAccumulateReward(user);
            _mint(user, pendingReward);
            REWARD_DISTRIBUTOR.claimRewards();
        }
    }
}
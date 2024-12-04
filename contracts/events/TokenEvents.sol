// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITokenEvents {
    event IdentityVerified(address indexed user, uint256 reward);
    event VerificationContractUpdated(address indexed newContract);
    event VerificationRewardUpdated(uint256 newReward);
}
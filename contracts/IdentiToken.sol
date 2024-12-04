// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { IdentityVerification } from "./IdentityVerification.sol";
import { ITokenEvents } from "./events/TokenEvents.sol";
import { AddressUtils } from "./security/AddressUtils.sol";
import { SecurityManager } from "./security/SecurityManager.sol";
import { RewardManager } from "./security/RewardManager.sol";
import { ActivityTracker } from "./rewards/ActivityTracker.sol";
import { RewardDistributor } from "./rewards/RewardDistributor.sol";
import { AlreadyRewarded, InsufficientBalance, UnauthorizedCaller } from "./errors/TokenErrors.sol";

contract IdentiToken is ERC20, ReentrancyGuard, SecurityManager, RewardManager, ITokenEvents {
    using AddressUtils for address;

    uint256 private constant INITIAL_SUPPLY = 10_000_000 * 10 ** 18;
    uint256 private constant VERIFICATION_REWARD = 100 * 10 ** 18;

    IdentityVerification public immutable IDENTITY_VERIFICATION;
    ActivityTracker public immutable ACTIVITY_TRACKER;
    RewardDistributor public immutable REWARD_DISTRIBUTOR;

    mapping(address => uint8) private userState;

    event SecurityStateChanged(address indexed user, uint8 newState);

    constructor(address _verificationContract) ERC20("IdentiToken", "IDT") SecurityManager() {
        _verificationContract.validateAddress();
        IDENTITY_VERIFICATION = IdentityVerification(_verificationContract);

        ACTIVITY_TRACKER = new ActivityTracker();
        REWARD_DISTRIBUTOR = new RewardDistributor(address(ACTIVITY_TRACKER));

        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function _setRewardedFlag(address user) private {
        userState[user] |= 1;
        emit SecurityStateChanged(user, userState[user]);
    }

    function _hasBeenRewarded(address user) private view returns (bool) {
        return (userState[user] & 1) == 1;
    }

    function hasBeenRewarded(address user) external view returns (bool) {
        return _hasBeenRewarded(user);
    }

    function rewardIdentityVerification(
        address user
    ) external nonReentrant whenNotPaused validarOperacionRecompensa(user, VERIFICATION_REWARD) {
        if (msg.sender != address(IDENTITY_VERIFICATION)) revert UnauthorizedCaller();
        if (_hasBeenRewarded(user)) revert AlreadyRewarded();

        _setRewardedFlag(user);
        _mint(user, VERIFICATION_REWARD);
        emit IdentityVerified(user, VERIFICATION_REWARD);
    }

    function distributeActivityRewards(address user) external nonReentrant whenNotPaused {
        require(user != address(0), "Invalid user address");
        
        uint256 pendingReward = REWARD_DISTRIBUTOR.getPendingRewards(user);
        
        if (pendingReward > 0) {
            REWARD_DISTRIBUTOR.calculateAndAccumulateReward(user);
            _mint(user, pendingReward);
            REWARD_DISTRIBUTOR.claimRewards();
        }
    }

    function burn(uint256 amount) public whenNotPaused validarOperacionToken(msg.sender, amount) {
        if (balanceOf(msg.sender) < amount) revert InsufficientBalance();
        _burn(msg.sender, amount);
    }

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override whenNotPaused {
        require(from != address(0) || to != address(0), "Invalid addresses");
        super._update(from, to, amount);
    }
}
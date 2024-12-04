// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { BaseValidator } from "./BaseValidator.sol";

library RewardValidator {
    using BaseValidator for address;
    using BaseValidator for uint256;

    uint256 private constant MIN_ACTIVITY_REWARD = 1 * 10**18;
    uint256 private constant MAX_ACTIVITY_REWARD = 50 * 10**18;
    uint256 private constant VERIFICATION_REWARD = 100 * 10**18;
    uint256 private constant MAX_DAILY_REWARD = 1000 * 10**18;
    uint256 private constant REWARD_COOLDOWN = 24 hours;

    error InvalidRewardOperation();
    error DailyLimitExceeded();
    error CooldownNotMet();

    function validateRewardOperation(
        address account,
        uint256 amount,
        uint256 dailyTotal,
        uint256 lastRewardTime
    ) internal view returns (bool) {
        // Validar cuenta
        account.validateAccount();

        // Validar monto
        amount.validateAmount(MIN_ACTIVITY_REWARD, MAX_ACTIVITY_REWARD);

        // Validar límite diario
        if (dailyTotal + amount > MAX_DAILY_REWARD) {
            revert DailyLimitExceeded();
        }

        // Validar cooldown
        if (block.timestamp - lastRewardTime < REWARD_COOLDOWN) {
            revert CooldownNotMet();
        }

        return true;
    }

    function validarOperacion(address cuenta, uint256 cantidad) internal pure returns (bool) {
        cuenta.validateAccount();
        cantidad.validateAmount(MIN_ACTIVITY_REWARD, VERIFICATION_REWARD);
        return true;
    }

    function validarLimiteRecompensa(uint256 cantidad) internal pure returns (bool) {
        return cantidad.validateAmount(MIN_ACTIVITY_REWARD, VERIFICATION_REWARD);
    }
}
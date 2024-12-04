// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { AddressUtils } from "../AddressUtils.sol";
import { InvalidAccount, InvalidAmount } from "../../errors/CommonErrors.sol";

library BaseValidator {
    using AddressUtils for address;

    error InvalidMinMaxValues();
    error ZeroAmount();

    function validateAccount(address account) internal pure returns (bool) {
        if (!AddressUtils.isValidAddress(account)) revert InvalidAccount();
        return true;
    }

    function validateAmount(
        uint256 amount,
        uint256 minAmount,
        uint256 maxAmount
    ) internal pure returns (bool) {
        if (minAmount >= maxAmount) revert InvalidMinMaxValues();
        if (amount == 0) revert ZeroAmount();
        if (amount < minAmount || amount > maxAmount) revert InvalidAmount();
        return true;
    }

    function validateAddresses(address[] memory addresses) internal pure returns (bool) {
        for (uint256 i = 0; i < addresses.length; i++) {
            validateAccount(addresses[i]);
        }
        return true;
    }
}
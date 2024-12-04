// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { BaseValidator } from "./BaseValidator.sol";
import { InvalidOperation } from "../../errors/CommonErrors.sol";

library TokenOperationValidator {
    using BaseValidator for address;
    using BaseValidator for uint256;

    uint256 private constant MIN_OPERATION_AMOUNT = 1;
    uint256 private constant MAX_OPERATION_AMOUNT = 1_000_000 * 10**18;

    function validateTokenOperation(
        address account,
        uint256 amount
    ) internal pure returns (bool) {
        account.validateAccount();
        amount.validateAmount(MIN_OPERATION_AMOUNT, MAX_OPERATION_AMOUNT);
        return true;
    }

    function validateTokenAmount(uint256 amount) internal pure returns (bool) {
        return BaseValidator.validateAmount(amount, MIN_OPERATION_AMOUNT, MAX_OPERATION_AMOUNT);
    }
}
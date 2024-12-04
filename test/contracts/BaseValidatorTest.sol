// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../security/validators/BaseValidator.sol";

contract BaseValidatorTest {
    using BaseValidator for address;
    using BaseValidator for uint256;

    function validateAccount(address account) public pure returns (bool) {
        return BaseValidator.validateAccount(account);
    }

    function validateAmount(
        uint256 amount,
        uint256 minAmount,
        uint256 maxAmount
    ) public pure returns (bool) {
        return BaseValidator.validateAmount(amount, minAmount, maxAmount);
    }
}
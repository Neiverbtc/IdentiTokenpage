// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { BaseValidator } from "./BaseValidator.sol";
import { InvalidOperation } from "../../errors/CommonErrors.sol";

library TokenValidator {
    uint256 private constant MIN_AMOUNT = 1;
    uint256 private constant MAX_AMOUNT = 1_000_000 * 10**18;

    function validarOperacion(
        address cuenta,
        uint256 cantidad
    ) internal pure returns (bool) {
        require(BaseValidator.validateAccount(cuenta), "Invalid account");
        require(BaseValidator.validateAmount(cantidad, MIN_AMOUNT, MAX_AMOUNT), "Invalid amount");
        return true;
    }

    function validarCuenta(address cuenta) internal pure returns (bool) {
        return BaseValidator.validateAccount(cuenta);
    }

    function validarCantidad(uint256 cantidad) internal pure returns (bool) {
        return BaseValidator.validateAmount(cantidad, MIN_AMOUNT, MAX_AMOUNT);
    }
}
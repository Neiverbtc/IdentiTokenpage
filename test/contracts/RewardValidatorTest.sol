// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../security/validators/RewardValidator.sol";

contract RewardValidatorTest {
    using RewardValidator for address;
    using RewardValidator for uint256;

    function validarOperacion(
        address cuenta,
        uint256 cantidad
    ) public pure returns (bool) {
        return RewardValidator.validarOperacion(cuenta, cantidad);
    }

    function validarLimiteRecompensa(uint256 cantidad) public pure returns (bool) {
        return RewardValidator.validarLimiteRecompensa(cantidad);
    }
}
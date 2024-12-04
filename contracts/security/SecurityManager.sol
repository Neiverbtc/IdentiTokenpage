// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { CircuitBreaker } from "./CircuitBreaker.sol";
import { FlashLoanProtection } from "./FlashLoanProtection.sol";
import { TokenValidator } from "./validators/TokenValidator.sol";
import { RewardValidator } from "./validators/RewardValidator.sol";
import { LimitValidator } from "./validators/LimitValidator.sol";

/**
 * @title SecurityManager
 * @dev Gestiona la seguridad centralizada con validadores modulares
 */
contract SecurityManager is CircuitBreaker, FlashLoanProtection {
    using TokenValidator for address;
    using RewardValidator for address;
    using LimitValidator for address;

    event OperacionValidada(address indexed cuenta, uint256 cantidad, string tipoOperacion);
    event ValidacionFallida(address indexed cuenta, string razon);
    event LimiteActualizado(address indexed cuenta, uint256 nuevoLimite);

    error OperacionInvalida(string razon);
    error LimiteExcedido(string razon);
    error ValidacionFallidaError(string razon);

    constructor() CircuitBreaker() {}

    modifier validarOperacionToken(address cuenta, uint256 cantidad) {
        if (!TokenValidator.validarOperacion(cuenta, cantidad)) {
            emit ValidacionFallida(cuenta, "Validacion de token fallida");
            revert OperacionInvalida("Token invalido");
        }
        if (!LimitValidator.validarLimiteOperacion(cantidad)) {
            emit ValidacionFallida(cuenta, "Limite excedido");
            revert LimiteExcedido("Limite de operacion excedido");
        }
        emit OperacionValidada(cuenta, cantidad, "token");
        _;
    }

    modifier validarOperacionRecompensa(address cuenta, uint256 cantidad) {
        if (!RewardValidator.validarOperacion(cuenta, cantidad)) {
            emit ValidacionFallida(cuenta, "Validacion de recompensa fallida");
            revert OperacionInvalida("Recompensa invalida");
        }
        _checkFlashLoanProtection();
        emit OperacionValidada(cuenta, cantidad, "recompensa");
        _;
    }

    function validarParametrosSeguridad(
        address cuenta,
        uint256 cantidad
    ) external pure returns (bool) {
        return TokenValidator.validarOperacion(cuenta, cantidad);
    }
}
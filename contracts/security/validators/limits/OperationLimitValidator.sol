// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title OperationLimitValidator
 * @dev Validador específico para límites por operación
 */
library OperationLimitValidator {
    error LimiteOperacionExcedido();
    
    uint256 private constant LIMITE_POR_OPERACION = 100;
    
    function validarLimiteOperacion(uint256 cantidad) internal pure returns (bool) {
        if (cantidad > LIMITE_POR_OPERACION) {
            revert LimiteOperacionExcedido();
        }
        return true;
    }
}
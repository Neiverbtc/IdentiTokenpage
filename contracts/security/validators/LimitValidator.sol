// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./limits/DailyLimitValidator.sol";
import "./limits/OperationLimitValidator.sol";

/**
 * @title LimitValidator
 * @dev Validador principal que coordina diferentes tipos de límites
 */
library LimitValidator {
    using DailyLimitValidator for uint256;
    using OperationLimitValidator for uint256;
    
    struct LimiteOperacion {
        DailyLimitValidator.RegistroDiario registroDiario;
        uint256 contadorOperaciones;
    }
    
    function validarLimites(
        uint256 cantidad,
        LimiteOperacion storage limiteOp
    ) internal returns (bool) {
        // Validar límite por operación
        OperationLimitValidator.validarLimiteOperacion(cantidad);
        
        // Validar límite diario
        DailyLimitValidator.validarLimiteDiario(
            cantidad,
            limiteOp.registroDiario
        );
        
        // Actualizar registro
        _actualizarRegistro(cantidad, limiteOp);
        
        return true;
    }
    
    function _actualizarRegistro(
        uint256 cantidad,
        LimiteOperacion storage limiteOp
    ) private {
        uint256 diaActual = block.timestamp / 1 days;
        
        if (diaActual > limiteOp.registroDiario.diaOperacion) {
            limiteOp.registroDiario.cantidadAcumulada = cantidad;
            limiteOp.registroDiario.diaOperacion = diaActual;
        } else {
            limiteOp.registroDiario.cantidadAcumulada += cantidad;
        }
        
        limiteOp.registroDiario.ultimaOperacion = block.timestamp;
        limiteOp.contadorOperaciones++;
    }
    
    function validarLimiteOperacion(uint256 cantidad) internal pure returns (bool) {
        return OperationLimitValidator.validarLimiteOperacion(cantidad);
    }
}
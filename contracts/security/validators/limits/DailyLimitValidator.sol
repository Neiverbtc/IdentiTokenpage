// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DailyLimitValidator
 * @dev Validador específico para límites diarios
 */
library DailyLimitValidator {
    error LimiteDiarioExcedido();
    
    uint256 private constant LIMITE_DIARIO = 1000;
    
    struct RegistroDiario {
        uint256 cantidadAcumulada;
        uint256 ultimaOperacion;
        uint256 diaOperacion;
    }
    
    function validarLimiteDiario(uint256 cantidad, RegistroDiario memory registro) internal view returns (bool) {
        uint256 diaActual = block.timestamp / 1 days;
        
        if (diaActual > registro.diaOperacion) {
            return true;
        }
        
        if (registro.cantidadAcumulada + cantidad > LIMITE_DIARIO) {
            revert LimiteDiarioExcedido();
        }
        
        return true;
    }
}
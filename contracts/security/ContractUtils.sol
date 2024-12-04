// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ContractUtils
 * @dev Utilidades para verificación de contratos sin usar assembly
 */
library ContractUtils {
    /**
     * @dev Verifica si una dirección es un contrato usando extcodesize
     * @param addr Dirección a verificar
     * @return bool True si es un contrato
     */
    function isContract(address addr) internal view returns (bool) {
        return addr.code.length > 0;
    }
}
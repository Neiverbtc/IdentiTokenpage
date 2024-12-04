// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IDIDEvents
 * @dev Interface para eventos relacionados con operaciones DID
 */
interface IDIDEvents {
    /**
     * @dev Emitido cuando se crea un nuevo DID
     * @param did El identificador DID creado
     * @param controller La dirección del controlador inicial
     */
    event DIDCreated(string indexed did, address indexed controller);

    /**
     * @dev Emitido cuando se actualiza un DID
     * @param did El identificador DID actualizado
     * @param controller La dirección del controlador que realizó la actualización
     */
    event DIDUpdated(string indexed did, address indexed controller);

    /**
     * @dev Emitido cuando se desactiva un DID
     * @param did El identificador DID desactivado
     */
    event DIDDeactivated(string indexed did);

    /**
     * @dev Emitido cuando se añade un nuevo controlador a un DID
     * @param did El identificador DID
     * @param controller La dirección del nuevo controlador
     */
    event ControllerAdded(string indexed did, address indexed controller);

    /**
     * @dev Emitido cuando se elimina un controlador de un DID
     * @param did El identificador DID
     * @param controller La dirección del controlador eliminado
     */
    event ControllerRemoved(string indexed did, address indexed controller);
}
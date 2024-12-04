// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IDIDEvents } from "../events/DIDEvents.sol";

/**
 * @title IDID
 * @dev Interface for DID operations following W3C standards
 */
interface IDID is IDIDEvents {
    struct DIDDocument {
        string[] context;
        string id;
        string[] controller;
        string[] verificationMethod;
        string[] authentication;
        string[] assertionMethod;
        uint256 created;
        uint256 updated;
    }

    /**
     * @dev Crea un nuevo documento DID
     * @param did El identificador DID
     * @param document El documento DID a crear
     */
    function createDID(string calldata did, DIDDocument calldata document) external;

    /**
     * @dev Actualiza un documento DID existente
     * @param did El identificador DID
     * @param document El nuevo documento DID
     */
    function updateDID(string calldata did, DIDDocument calldata document) external;

    /**
     * @dev Resuelve un DID a su documento
     * @param did El identificador DID
     * @return El documento DID correspondiente
     */
    function resolveDID(string calldata did) external view returns (DIDDocument memory);

    /**
     * @dev Desactiva un DID existente
     * @param did El identificador DID a desactivar
     */
    function deactivateDID(string calldata did) external;

    /**
     * @dev Verifica si una dirección es controlador de un DID
     * @param did El identificador DID
     * @param controller La dirección a verificar
     * @return bool indicando si la dirección es controlador
     */
    function isController(string calldata did, address controller) external view returns (bool);
}
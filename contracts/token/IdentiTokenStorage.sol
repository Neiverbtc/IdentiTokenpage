// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenStorage } from "./storage/IdentiTokenStorage.sol";

abstract contract IdentiTokenStorageProxy is IdentiTokenStorage {
    // Este contrato sirve como proxy para mantener compatibilidad con imports existentes
    // y redirige a la implementación en storage/IdentiTokenStorage.sol
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenRewards } from "../rewards/IdentiTokenRewards.sol";

contract IdentiTokenCore is IdentiTokenRewards {
    constructor(address verificationContract) 
        IdentiTokenRewards(verificationContract) 
    {}

    // Implementación del método faltante de la interfaz
    function hasBeenRewarded(address user) external view override returns (bool) {
        return _hasBeenRewarded(user);
    }

    // Implementación específica de funciones core del token
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
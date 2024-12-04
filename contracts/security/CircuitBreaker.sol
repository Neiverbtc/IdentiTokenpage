// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CircuitBreaker
 * @dev Implementa el patrón circuit breaker para detener operaciones críticas en emergencias
 */
contract CircuitBreaker is Ownable {
    bool public paused;
    
    event CircuitBroken(address indexed operator);
    event CircuitRestored(address indexed operator);
    
    error ContractPaused();
    error ContractNotPaused();

    constructor() Ownable(msg.sender) {
        paused = false;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        _;
    }

    modifier whenPaused() {
        if (!paused) revert ContractNotPaused();
        _;
    }

    function breakCircuit() external onlyOwner whenNotPaused {
        paused = true;
        emit CircuitBroken(msg.sender);
    }

    function restoreCircuit() external onlyOwner whenPaused {
        paused = false;
        emit CircuitRestored(msg.sender);
    }
}
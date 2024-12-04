// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { SecurityManager } from "../../security/SecurityManager.sol";
import { RewardManager } from "../../security/RewardManager.sol";
import { IdentiTokenStorage } from "../storage/IdentiTokenStorage.sol";
import { IIdentiToken } from "../interfaces/IIdentiToken.sol";

abstract contract IdentiTokenBase is 
    ERC20, 
    ReentrancyGuard, 
    SecurityManager, 
    RewardManager,
    IdentiTokenStorage,
    IIdentiToken 
{
    constructor(string memory name, string memory symbol) 
        ERC20(name, symbol) 
        SecurityManager() 
    {
        _mint(msg.sender, getInitialSupply());
    }

    function burn(uint256 amount) public virtual override {
        _burn(msg.sender, amount);
    }

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override whenNotPaused {
        require(from != address(0) || to != address(0), "Invalid addresses");
        super._update(from, to, amount);
    }
}
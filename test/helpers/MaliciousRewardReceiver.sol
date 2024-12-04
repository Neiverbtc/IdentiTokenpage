// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IIdentiToken } from "../../contracts/token/interfaces/IIdentiToken.sol";

contract MaliciousRewardReceiver {
    IIdentiToken public token;
    
    constructor(address _token) {
        token = IIdentiToken(_token);
    }
    
    function attack() external {
        token.distributeActivityRewards(address(this));
    }
    
    receive() external payable {
        if (address(token).balance >= 1 ether) {
            token.distributeActivityRewards(address(this));
        }
    }
}
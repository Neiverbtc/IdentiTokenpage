// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentiTokenCore } from "./core/IdentiTokenCore.sol";

contract IdentiToken is IdentiTokenCore {
    constructor(address verificationContract) 
        IdentiTokenCore(verificationContract) 
    {}
}
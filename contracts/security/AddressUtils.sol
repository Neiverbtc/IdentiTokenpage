// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { InvalidAccount } from "../errors/CommonErrors.sol";

library AddressUtils {
    function validateAddress(address addr) internal pure {
        if (!isValidAddress(addr)) revert InvalidAccount();
    }

    function isValidAddress(address addr) internal pure returns (bool) {
        return addr != address(0);
    }
}
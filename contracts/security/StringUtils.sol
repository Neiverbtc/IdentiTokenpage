// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { EmptyString } from "./errors/SecurityErrors.sol";

/**
 * @title StringUtils
 * @dev Library containing string validation and manipulation utilities
 */
library StringUtils {
    /**
     * @dev Validates a string is not empty
     * @param str String to validate
     */
    function validateString(string memory str) internal pure {
        if (bytes(str).length == 0) revert EmptyString();
    }

    /**
     * @dev Checks if two strings are equal
     * @param a First string
     * @param b Second string
     * @return bool True if strings are equal
     */
    function equals(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}
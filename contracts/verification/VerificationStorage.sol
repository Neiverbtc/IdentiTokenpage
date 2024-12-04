// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VerificationStorage {
    mapping(address => bool) internal _verifiedUsers;

    function _setVerified(address user) internal {
        _verifiedUsers[user] = true;
    }

    function isVerified(address user) public view virtual returns (bool) {
        return _verifiedUsers[user];
    }

    function isVerifier(address) public view virtual returns (bool) {
        return false;
    }
}
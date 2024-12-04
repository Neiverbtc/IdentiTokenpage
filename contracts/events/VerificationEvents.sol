// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVerificationEvents {
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event IdentityVerified(address indexed user);
}
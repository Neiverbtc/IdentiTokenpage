// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVerification {
    function addVerifier(address verifier) external;
    function removeVerifier(address verifier) external;
    function verifyIdentity(address user) external;
    function checkVerificationStatus(address user) external view returns (bool);
    function isVerifier(address verifier) external view returns (bool);
}
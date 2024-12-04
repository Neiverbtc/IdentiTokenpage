// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IVerificationManager
 * @dev Interface para la gestión de verificaciones
 */
interface IVerificationManager {
    function setTokenContract(address _tokenContract) external;
    function verifyIdentity(address user) external;
    function checkVerificationStatus(address user) external view returns (bool);
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IdentityVerificationBase } from "./IdentityVerificationBase.sol";
import { IVerificationManager } from "./interfaces/IVerificationManager.sol";
import { VerificationStorage } from "./VerificationStorage.sol";
import { IIdentiToken } from "../token/interfaces/IIdentiToken.sol";
import { AlreadyVerified, InvalidTokenContract } from "../errors/VerificationErrors.sol";
import { AddressUtils } from "../security/AddressUtils.sol";
import { IVerification } from "../interfaces/IVerification.sol";

contract IdentityVerificationManager is 
    IdentityVerificationBase,
    IVerificationManager,
    VerificationStorage
{
    using AddressUtils for address;

    IIdentiToken public identiToken;

    constructor(address _owner) IdentityVerificationBase(_owner) {}

    function setTokenContract(address _tokenContract) external override(IVerificationManager) onlyOwner {
        _tokenContract.validateAddress();
        identiToken = IIdentiToken(_tokenContract);
    }

    function verifyIdentity(address user) external override(IVerification, IVerificationManager) {
        _checkVerifier(msg.sender);
        if (isVerified(user)) revert AlreadyVerified();
        user.validateAddress();

        _setVerified(user);
        identiToken.rewardIdentityVerification(user);

        emit IdentityVerified(user);
    }

    function checkVerificationStatus(address user) external view override(IVerification, IVerificationManager) returns (bool) {
        return isVerified(user);
    }

    function isVerifier(address verifier) public view override(IdentityVerificationBase, VerificationStorage) returns (bool) {
        return super.isVerifier(verifier);
    }
}
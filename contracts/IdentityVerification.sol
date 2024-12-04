// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IdentiToken } from "./IdentiToken.sol";
import { IVerification } from "./interfaces/IVerification.sol";
import { IVerificationEvents } from "./events/VerificationEvents.sol";
import { AddressUtils } from "./security/AddressUtils.sol";
import { NotVerifier, AlreadyVerifier, NotAVerifier, AlreadyVerified, InvalidTokenContract } from "./errors/VerificationErrors.sol";

contract IdentityVerification is Ownable, IVerification, IVerificationEvents {
    using AddressUtils for address;

    IdentiToken public identiToken;
    mapping(address => bool) public isVerified;
    mapping(address => bool) private verifiers;

    constructor(address _owner) Ownable(_owner) {}

    function setTokenContract(address _tokenContract) external onlyOwner {
        _tokenContract.validateAddress();
        identiToken = IdentiToken(_tokenContract);
    }

    function addVerifier(address verifier) external override onlyOwner {
        verifier.validateAddress();
        if (verifiers[verifier]) revert AlreadyVerifier();

        verifiers[verifier] = true;
        emit VerifierAdded(verifier);
    }

    function removeVerifier(address verifier) external override onlyOwner {
        if (!verifiers[verifier]) revert NotAVerifier();

        verifiers[verifier] = false;
        emit VerifierRemoved(verifier);
    }

    function verifyIdentity(address user) external override {
        if (!verifiers[msg.sender]) revert NotVerifier();
        if (isVerified[user]) revert AlreadyVerified();
        user.validateAddress();

        isVerified[user] = true;
        identiToken.rewardIdentityVerification(user);

        emit IdentityVerified(user);
    }

    function checkVerificationStatus(address user) external view override returns (bool) {
        return isVerified[user];
    }

    function isVerifier(address verifier) external view override returns (bool) {
        return verifiers[verifier];
    }
}
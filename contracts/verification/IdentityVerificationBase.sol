// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IVerification } from "../interfaces/IVerification.sol";
import { IVerificationEvents } from "../events/VerificationEvents.sol";
import { AddressUtils } from "../security/AddressUtils.sol";
import { NotVerifier, AlreadyVerifier, NotAVerifier } from "../errors/VerificationErrors.sol";

/**
 * @title IdentityVerificationBase
 * @dev Funcionalidad base para la verificación de identidad
 */
abstract contract IdentityVerificationBase is Ownable, IVerification, IVerificationEvents {
    using AddressUtils for address;

    mapping(address => bool) private _verifiers;

    constructor(address _owner) Ownable(_owner) {}

    function addVerifier(address verifier) external virtual override onlyOwner {
        verifier.validateAddress();
        if (_verifiers[verifier]) revert AlreadyVerifier();

        _verifiers[verifier] = true;
        emit VerifierAdded(verifier);
    }

    function removeVerifier(address verifier) external virtual override onlyOwner {
        if (!_verifiers[verifier]) revert NotAVerifier();

        _verifiers[verifier] = false;
        emit VerifierRemoved(verifier);
    }

    function isVerifier(address verifier) public virtual override view returns (bool) {
        return _verifiers[verifier];
    }

    function _checkVerifier(address verifier) internal view {
        if (!_verifiers[verifier]) revert NotVerifier();
    }
}
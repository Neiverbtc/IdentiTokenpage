// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VerificationStorage
 * @dev Almacenamiento específico para verificaciones
 */
abstract contract VerificationStorage {
    struct VerificationState {
        bool isVerified;
        uint256 verificationTime;
        address verifier;
    }

    mapping(address => VerificationState) private verificationStates;

    event VerificationStateUpdated(
        address indexed user,
        bool isVerified,
        address verifier
    );

    function _setVerified(address user, address verifier) internal {
        VerificationState storage state = verificationStates[user];
        state.isVerified = true;
        state.verificationTime = block.timestamp;
        state.verifier = verifier;

        emit VerificationStateUpdated(user, true, verifier);
    }

    function _isVerified(address user) internal view returns (bool) {
        return verificationStates[user].isVerified;
    }

    function _getVerificationState(address user) internal view returns (VerificationState memory) {
        return verificationStates[user];
    }
}
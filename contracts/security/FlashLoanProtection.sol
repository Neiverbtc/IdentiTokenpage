// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FlashLoanProtection
 * @dev Implementa protecciones contra ataques de flash loans
 */
contract FlashLoanProtection {
    mapping(address => uint256) private lastOperationTimestamp;
    uint256 private constant MIN_OPERATION_DELAY = 1;
    
    error OperationTooSoon();

    modifier protectAgainstFlashLoan() {
        if (block.timestamp == lastOperationTimestamp[msg.sender]) {
            revert OperationTooSoon();
        }
        lastOperationTimestamp[msg.sender] = block.timestamp;
        _;
    }

    function _checkFlashLoanProtection() internal {
        if (block.timestamp == lastOperationTimestamp[msg.sender]) {
            revert OperationTooSoon();
        }
        lastOperationTimestamp[msg.sender] = block.timestamp;
    }

    function getLastOperationTimestamp(address user) public view returns (uint256) {
        return lastOperationTimestamp[user];
    }
}
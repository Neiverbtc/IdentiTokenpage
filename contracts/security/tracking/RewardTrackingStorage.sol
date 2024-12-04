// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract RewardTrackingStorage {
    struct RewardTracking {
        uint256 dailyTotal;
        uint256 lastRewardTime;
    }

    mapping(address => RewardTracking) private rewardTrackings;

    error DailyRewardLimitExceeded();

    uint256 private constant MAX_DAILY_REWARDS = 5000 ether;

    function updateRewardTracking(address account, uint256 amount) public virtual returns (bool) {
        RewardTracking storage tracking = rewardTrackings[account];
        
        // Resetear el contador diario si es un nuevo día
        if (block.timestamp >= tracking.lastRewardTime + 1 days) {
            tracking.dailyTotal = 0;
        }
        
        // Verificar límite diario
        if (tracking.dailyTotal + amount > MAX_DAILY_REWARDS) {
            revert DailyRewardLimitExceeded();
        }
        
        // Actualizar tracking
        tracking.dailyTotal += amount;
        tracking.lastRewardTime = block.timestamp;
        
        return true;
    }

    function getRewardTracking(address account) public virtual view returns (
        uint256 totalDiario,
        uint256 ultimaRecompensa
    ) {
        RewardTracking storage tracking = rewardTrackings[account];
        return (tracking.dailyTotal, tracking.lastRewardTime);
    }

    // Función interna para uso en contratos heredados
    function _updateRewardTrackingInternal(address account, uint256 amount) internal returns (bool) {
        return updateRewardTracking(account, amount);
    }

    function _getRewardTrackingInternal(address account) internal view returns (
        uint256 totalDiario,
        uint256 ultimaRecompensa
    ) {
        return getRewardTracking(account);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IIdentiToken
 * @dev Interface principal para IdentiToken
 */
interface IIdentiToken is IERC20 {
    /**
     * @dev Recompensa a un usuario por verificar su identidad
     * @param user Dirección del usuario a recompensar
     */
    function rewardIdentityVerification(address user) external;

    /**
     * @dev Distribuye recompensas por actividad a un usuario
     * @param user Dirección del usuario
     */
    function distributeActivityRewards(address user) external;

    /**
     * @dev Quema tokens del remitente
     * @param amount Cantidad de tokens a quemar
     */
    function burn(uint256 amount) external;

    /**
     * @dev Retorna el estado de recompensa de un usuario
     * @param user Dirección del usuario
     * @return bool Indica si el usuario ya ha sido recompensado
     */
    function hasBeenRewarded(address user) external view returns (bool);
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title ScholarForge XPToken (ERC20)
 * @notice XPToken is the core reward token for ScholarForge. Only QuizMasters can mint XP for quiz performance.
 * @dev Extensible for tipping, pausing, and future upgrades.
 */
contract XPToken is ERC20, AccessControl, Pausable {
    /// @notice Role for accounts allowed to mint XP (QuizMasters)
    bytes32 public constant QUIZMASTER_ROLE = keccak256("QUIZMASTER_ROLE");

    /// @notice Emitted when XP is minted for a user
    event XPMinted(address indexed to, uint256 amount, string reason);

    /**
     * @notice Constructor mints initial supply to deployer and sets up roles
     */
    constructor() ERC20("ScholarForge XP", "XPS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(QUIZMASTER_ROLE, msg.sender);
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /**
     * @notice Mint XP to a user (only QuizMaster)
     * @param to Recipient address
     * @param amount Amount of XP to mint
     * @param reason Reason for minting (e.g., quiz completion)
     */
    function mint(address to, uint256 amount, string calldata reason) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        _mint(to, amount);
        emit XPMinted(to, amount, reason);
    }

    /**
     * @notice Burn XP from a user (only QuizMaster)
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function burn(address from, uint256 amount) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        _burn(from, amount);
    }

    /**
     * @notice Pause all token transfers and minting (admin only)
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpause all token transfers and minting (admin only)
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Override _beforeTokenTransfer to respect pause state
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    // TODO: Add tipping, staking, and other gamification features here
}

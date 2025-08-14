// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ScholarForge XPToken (ERC20)
 * @notice XPToken is the core reward token for ScholarForge. Only QuizMasters can mint XP for quiz performance.
 * @dev Extensible for tipping, pausing, and future upgrades.
 */
contract XPToken is ERC20Pausable, AccessControl {
    /// @notice Role for accounts allowed to mint XP (QuizMasters)
    bytes32 public constant QUIZMASTER_ROLE = keccak256("QUIZMASTER_ROLE");

    /// @notice Mapping to track XP earned from different activities
    mapping(address => mapping(string => uint256)) public xpByActivity;
    
    /// @notice Mapping to track total XP earned by user
    mapping(address => uint256) public totalXPEarned;

    /// @notice Emitted when XP is minted for a user
    event XPMinted(address indexed to, uint256 amount, string reason, string activity);
    
    /// @notice Emitted when XP is tipped to a creator
    event XPTipped(address indexed from, address indexed to, uint256 amount, string reason);
    
    /// @notice Emitted when XP is earned from quiz completion
    event QuizXPEarned(address indexed user, uint256 amount, string course, string language, uint256 score);
    
    /**
     * @notice Tip XP to another user (e.g., quiz creator, translator)
     * @param to Recipient address
     * @param amount Amount of XP to tip
     * @param reason Reason for tipping
     */
    function tip(address to, uint256 amount, string calldata reason) external whenNotPaused {
        require(amount > 0, "Tip amount must be positive");
        require(balanceOf(msg.sender) >= amount, "Insufficient XP balance");
        _transfer(msg.sender, to, amount);
        emit XPTipped(msg.sender, to, amount, reason);
    }

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
     * @param activity Type of activity (e.g., "quiz", "course", "lesson")
     */
    function mint(address to, uint256 amount, string calldata reason, string calldata activity) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        _mint(to, amount);
        xpByActivity[to][activity] += amount;
        totalXPEarned[to] += amount;
        emit XPMinted(to, amount, reason, activity);
    }

    /**
     * @notice Mint XP for quiz completion with detailed tracking
     * @param user User address
     * @param amount XP amount
     * @param course Course name
     * @param language Language
     * @param score Quiz score
     */
    function mintQuizXP(
        address user, 
        uint256 amount, 
        string calldata course, 
        string calldata language, 
        uint256 score
    ) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        _mint(user, amount);
        xpByActivity[user]["quiz"] += amount;
        totalXPEarned[user] += amount;
        
        string memory reason = string(abi.encodePacked("Quiz completed: ", course, " (", language, ") - Score: ", score.toString()));
        emit QuizXPEarned(user, amount, course, language, score);
        emit XPMinted(user, amount, reason, "quiz");
    }

    /**
     * @notice Batch mint XP to multiple users (only QuizMaster)
     * @param recipients Addresses to receive XP
     * @param amounts Corresponding XP amounts
     * @param reasons Corresponding reasons for minting
     * @param activities Corresponding activity types
     */
    function batchMint(
        address[] calldata recipients, 
        uint256[] calldata amounts, 
        string[] calldata reasons, 
        string[] calldata activities
    ) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        require(
            recipients.length == amounts.length && 
            amounts.length == reasons.length && 
            reasons.length == activities.length, 
            "Array length mismatch"
        );
        for (uint256 i = 0; i < recipients.length; i++) {
            mint(recipients[i], amounts[i], reasons[i], activities[i]);
        }
    }

    /**
     * @notice Get XP earned from specific activity
     * @param user User address
     * @param activity Activity type
     * @return XP amount earned from that activity
     */
    function getXPByActivity(address user, string calldata activity) external view returns (uint256) {
        return xpByActivity[user][activity];
    }

    /**
     * @notice Get total XP earned by user
     * @param user User address
     * @return Total XP earned
     */
    function getTotalXPEarned(address user) external view returns (uint256) {
        return totalXPEarned[user];
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
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) { _pause(); }

    /**
     * @notice Unpause all token transfers and minting (admin only)
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) { _unpause(); }

    // TODO: Add tipping, staking, and other gamification features here
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ScholarForge SkillNFT (ERC721)
 * @notice SkillNFTs represent onchain proof of topic mastery. Only QuizMasters can mint.
 * @dev Extensible for skill levels, achievements, and future upgrades.
 */
contract SkillNFT is ERC721URIStorage, ERC721Pausable, AccessControl {
    /// @notice Role for accounts allowed to mint Skill NFTs (QuizMasters)
    bytes32 public constant QUIZMASTER_ROLE = keccak256("QUIZMASTER_ROLE");

    /// @notice Next token ID to mint
    uint256 public nextTokenId;

    /// @notice Mapping from tokenId to skill/level metadata
    mapping(uint256 => string) public skillLevel;
    
    /// @notice Mapping from tokenId to course completion details
    mapping(uint256 => CourseCompletion) public courseCompletions;

    /// @notice Course completion structure
    struct CourseCompletion {
        string courseName;
        string language;
        uint256 completionDate;
        uint256 score;
        string topic;
    }

    /// @notice Emitted when a Skill NFT is minted
    event SkillMinted(address indexed to, uint256 indexed tokenId, string skill, string tokenURI);

    /**
     * @notice Constructor sets up roles
     */
    constructor() ERC721("ScholarForge Skill NFT", "SKILL") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(QUIZMASTER_ROLE, msg.sender);
    }

    /**
     * @notice Mint a Skill NFT to a user (only QuizMaster)
     * @param to Recipient address
     * @param skill Name or level of the skill
     * @param tokenURI Metadata URI
     * @return tokenId The minted token ID
     */
    function mintSkill(address to, string calldata skill, string calldata tokenURI) public onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        skillLevel[tokenId] = skill;
        emit SkillMinted(to, tokenId, skill, tokenURI);
        nextTokenId++;
    }

    /**
     * @notice Mint a course completion NFT with detailed metadata
     * @param to Recipient address
     * @param courseName Name of the completed course
     * @param language Language of the course
     * @param score Completion score
     * @param topic Course topic
     * @param tokenURI Metadata URI
     * @return tokenId The minted token ID
     */
    function mintCourseCompletion(
        address to, 
        string calldata courseName, 
        string calldata language, 
        uint256 score, 
        string calldata topic, 
        string calldata tokenURI
    ) external onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        skillLevel[tokenId] = string(abi.encodePacked("Course: ", courseName));
        
        courseCompletions[tokenId] = CourseCompletion({
            courseName: courseName,
            language: language,
            completionDate: block.timestamp,
            score: score,
            topic: topic
        });
        
        emit SkillMinted(to, tokenId, skillLevel[tokenId], tokenURI);
        nextTokenId++;
    }

    /**
     * @notice Mint a special Language Hero NFT (only QuizMaster)
     * @param to Recipient address
     * @param language Language name (e.g., "Twi")
     * @param tokenURI Metadata URI
     * @return tokenId The minted token ID
     */
    function mintLanguageHero(address to, string calldata language, string calldata tokenURI) external onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        string memory skill = string(abi.encodePacked("Language Hero: ", language));
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        skillLevel[tokenId] = skill;
        emit SkillMinted(to, tokenId, skill, tokenURI);
        nextTokenId++;
    }

    /**
     * @notice Batch mint Skill NFTs (only QuizMaster)
     * @param recipients Array of recipient addresses
     * @param skills Array of skill names/levels
     * @param uris Array of metadata URIs
     */
    function batchMint(address[] calldata recipients, string[] calldata skills, string[] calldata uris) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        require(recipients.length == skills.length && skills.length == uris.length, "Array length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            mintSkill(recipients[i], skills[i], uris[i]);
        }
    }

    /**
     * @notice Get course completion details for a token
     * @param tokenId The token ID
     * @return Course completion details
     */
    function getCourseCompletion(uint256 tokenId) external view returns (CourseCompletion memory) {
        require(_exists(tokenId), "Token does not exist");
        return courseCompletions[tokenId];
    }

    /**
     * @notice Pause all minting and transfers (admin only)
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) { _pause(); }

    /**
     * @notice Unpause all minting and transfers (admin only)
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) { _unpause(); }

    /**
     * @dev Override _beforeTokenTransfer to respect pause state
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    // TODO: Add onchain achievements, skill upgrades, and more gamification features here
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ScholarForge SkillNFT (ERC721)
 * @notice SkillNFTs represent onchain proof of topic mastery. Only QuizMasters can mint.
 */
contract SkillNFT is ERC721, ERC721URIStorage, ERC721Pausable, AccessControl {
    bytes32 public constant QUIZMASTER_ROLE = keccak256("QUIZMASTER_ROLE");

    uint256 public nextTokenId;

    struct CourseCompletion {
        string courseName;
        string language;
        uint256 completionDate;
        uint256 score;
        string topic;
    }

    mapping(uint256 => string) public skillLevel;
    mapping(uint256 => CourseCompletion) public courseCompletions;

    event SkillMinted(address indexed to, uint256 indexed tokenId, string skill, string tokenURI);

    constructor() ERC721("ScholarForge Skill NFT", "SKILL") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(QUIZMASTER_ROLE, msg.sender);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) { _pause(); }
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) { _unpause(); }

    function mintSkill(
        address to,
        string calldata skill,
        string calldata metadataURI
    ) public onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        skillLevel[tokenId] = skill;
        emit SkillMinted(to, tokenId, skill, metadataURI);
        unchecked { nextTokenId++; }
    }

    function mintCourseCompletion(
        address to,
        string calldata courseName,
        string calldata language,
        uint256 score,
        string calldata topic,
        string calldata metadataURI
    ) external onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        string memory skill = string(abi.encodePacked("Course: ", courseName));
        skillLevel[tokenId] = skill;

        courseCompletions[tokenId] = CourseCompletion({
            courseName: courseName,
            language: language,
            completionDate: block.timestamp,
            score: score,
            topic: topic
        });

        emit SkillMinted(to, tokenId, skill, metadataURI);
        unchecked { nextTokenId++; }
    }

    function mintLanguageHero(
        address to,
        string calldata language,
        string calldata metadataURI
    ) external onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        string memory skill = string(abi.encodePacked("Language Hero: ", language));
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        skillLevel[tokenId] = skill;
        emit SkillMinted(to, tokenId, skill, metadataURI);
        unchecked { nextTokenId++; }
    }

    function batchMint(
        address[] calldata recipients,
        string[] calldata skills,
        string[] calldata metadataURIs
    ) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        require(recipients.length == skills.length && skills.length == metadataURIs.length, "Array length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            mintSkill(recipients[i], skills[i], metadataURIs[i]);
        }
    }

    function getCourseCompletion(uint256 tokenId) external view returns (CourseCompletion memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return courseCompletions[tokenId];
    }

    // ----- Required overrides for OZ v5 -----

    // storage cleanup for URI
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        if (bytes(skillLevel[tokenId]).length != 0) delete skillLevel[tokenId];
        if (bytes(courseCompletions[tokenId].courseName).length != 0) delete courseCompletions[tokenId];
    }

    // URI lookup
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // pause-aware transfer hook in OZ v4
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    // interface support
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

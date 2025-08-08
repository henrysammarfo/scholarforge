# ScholarForge GitHub Issues

## Smart Contract Issues

### Issue #1: Add Language Hero NFT Logic
**Assigned to:** @mrslick8601
**Labels:** enhancement, smart-contract

**Summary:** Implement special "Language Hero" NFTs for top contributors in each language.

**Copy-Paste Instructions:**
1. Open `contracts/SkillNFT.sol`
2. Add after line 20:
```solidity
    /// @notice Mapping from language to top contributor
    mapping(string => address) public languageHero;
    
    /// @notice Emitted when a Language Hero NFT is minted
    event LanguageHeroMinted(address indexed to, string language, uint256 tokenId);
```
3. Add after the batchMint function:
```solidity
    /**
     * @notice Mint Language Hero NFT for top contributor in a language
     * @param to Recipient address
     * @param language The language they're hero of
     * @param tokenURI Metadata URI
     */
    function mintLanguageHero(address to, string calldata language, string calldata tokenURI) external onlyRole(QUIZMASTER_ROLE) whenNotPaused returns (uint256 tokenId) {
        require(languageHero[language] == address(0), "Language hero already exists");
        languageHero[language] = to;
        tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        skillLevel[tokenId] = string(abi.encodePacked("Language Hero: ", language));
        emit LanguageHeroMinted(to, language, tokenId);
        nextTokenId++;
    }
```

### Issue #2: Add Tipping System to XPToken
**Assigned to:** @RicheySon
**Labels:** enhancement, smart-contract

**Summary:** Allow users to tip quiz creators and translators with XP tokens.

**Copy-Paste Instructions:**
1. Open `contracts/XPToken.sol`
2. Add after line 15:
```solidity
    /// @notice Emitted when XP is tipped to a creator
    event XPTipped(address indexed from, address indexed to, uint256 amount, string reason);
    
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
```

### Issue #3: Add Advanced Tests for XPToken
**Assigned to:** @Samxury
**Labels:** test, smart-contract

**Summary:** Add comprehensive edge case and gas optimization tests.

**Copy-Paste Instructions:**
1. Open `test/XPToken.test.js`
2. Add after the last test:
```javascript
  it("should allow users to tip XP to others", async function () {
    const tipAmount = ethers.utils.parseUnits("50", 18);
    await xpToken.connect(quizMaster).mint(user.address, tipAmount, "Initial XP");
    await expect(xpToken.connect(user).tip(quizMaster.address, tipAmount, "Great quiz!"))
      .to.emit(xpToken, "XPTipped")
      .withArgs(user.address, quizMaster.address, tipAmount, "Great quiz!");
    expect(await xpToken.balanceOf(quizMaster.address)).to.equal(tipAmount);
  });

  it("should revert tip if insufficient balance", async function () {
    const tipAmount = ethers.utils.parseUnits("100", 18);
    await expect(xpToken.connect(user).tip(quizMaster.address, tipAmount, "No XP"))
      .to.be.revertedWith("Insufficient XP balance");
  });

  it("should revert tip if amount is zero", async function () {
    await expect(xpToken.connect(user).tip(quizMaster.address, 0, "Zero tip"))
      .to.be.revertedWith("Tip amount must be positive");
  });
```

### Issue #4: Add Advanced Tests for SkillNFT
**Assigned to:** @TechGuygh
**Labels:** test, smart-contract

**Summary:** Add comprehensive tests for Language Hero NFTs and edge cases.

**Copy-Paste Instructions:**
1. Open `test/SkillNFT.test.js`
2. Add after the last test:
```javascript
  it("should allow minting Language Hero NFT", async function () {
    const language = "Twi";
    const uri = "ipfs://language-hero-twi";
    await expect(skillNFT.connect(quizMaster).mintLanguageHero(user1.address, language, uri))
      .to.emit(skillNFT, "LanguageHeroMinted")
      .withArgs(user1.address, language, 0);
    expect(await skillNFT.languageHero(language)).to.equal(user1.address);
    expect(await skillNFT.skillLevel(0)).to.equal("Language Hero: Twi");
  });

  it("should not allow minting Language Hero twice for same language", async function () {
    const language = "Yoruba";
    const uri = "ipfs://language-hero-yoruba";
    await skillNFT.connect(quizMaster).mintLanguageHero(user1.address, language, uri);
    await expect(skillNFT.connect(quizMaster).mintLanguageHero(user2.address, language, uri))
      .to.be.revertedWith("Language hero already exists");
  });
```

## Frontend Issues

### Issue #5: Create Landing Page
**Assigned to:** @mrslick8601
**Labels:** frontend, enhancement

**Summary:** Build the main landing page with hero section, features, and call-to-action.

**Copy-Paste Instructions:**
1. Create `frontend/pages/index.js`
2. Copy-paste the provided landing page code with:
   - Hero section with "Learn Local, Earn Global"
   - Feature cards for multi-language, XP rewards, community
   - Statistics section (1.3B+ students, 7+ languages)
   - Professional navigation and footer
   - Responsive design with Tailwind CSS
   - Framer Motion animations

### Issue #6: Create Learning Interface
**Assigned to:** @RicheySon
**Labels:** frontend, enhancement

**Summary:** Build the interactive learning interface with language selection and quiz taking.

**Copy-Paste Instructions:**
1. Create `frontend/pages/learn.js`
2. Copy-paste the provided learning interface code with:
   - Language selection grid (Twi, Yoruba, Swahili, etc.)
   - Interactive quiz interface with timer
   - Real-time scoring and progress tracking
   - Quiz completion results page
   - Responsive design and smooth animations

### Issue #7: Add Web3 Integration
**Assigned to:** @Samxury
**Labels:** frontend, web3

**Summary:** Integrate wallet connection and smart contract interaction.

**Copy-Paste Instructions:**
1. Install Web3 dependencies: `npm install ethers wagmi viem`
2. Create `frontend/utils/web3.js` for contract interaction
3. Create `frontend/components/WalletConnect.jsx` for wallet connection
4. Add XP balance display and NFT gallery components
5. Integrate with deployed smart contracts

### Issue #8: Add Responsive Design & Animations
**Assigned to:** @TechGuygh
**Labels:** frontend, ui/ux

**Summary:** Enhance the UI with responsive design and smooth animations.

**Copy-Paste Instructions:**
1. Update `frontend/tailwind.config.js` with custom colors and animations
2. Add Framer Motion animations to all components
3. Ensure mobile-first responsive design
4. Add loading states and micro-interactions
5. Create reusable UI components (buttons, cards, modals)

## Documentation Issues

### Issue #9: Add Architecture Documentation
**Assigned to:** @mrslick8601
**Labels:** documentation

**Summary:** Create detailed technical documentation for the project architecture.

**Copy-Paste Instructions:**
1. Create `docs/ARCHITECTURE.md`
2. Copy-paste:
```markdown
# ScholarForge Architecture

## Smart Contract Layer
- **XPToken (ERC20):** Reward token for learning and contributions
- **SkillNFT (ERC721):** Onchain credentials for topic mastery
- **Language Hero NFTs:** Special recognition for top contributors

## Backend Layer
- **Quiz Management:** CRUD operations for quizzes and language packs
- **AI Translation:** Auto-translate missing content with community review
- **XP Rewards:** Calculate and distribute XP for various activities

## Frontend Layer
- **Language Selection:** UI and content language choosers
- **Quiz Interface:** Interactive quiz taking with offline support
- **Leaderboards:** By language and globally
- **Profile Management:** View XP, NFTs, and contributions

## Storage Layer
- **IPFS/Web3.Storage:** Quiz content and metadata
- **Onchain:** Essential data (XP, NFTs, language heroes)
- **Local Storage:** Offline quiz packs and progress

## Security Features
- Role-based access control (QuizMaster, Admin)
- Pausable contracts for emergency stops
- Comprehensive testing and audit-ready code
```

### Issue #10: Add API Documentation
**Assigned to:** @RicheySon
**Labels:** documentation

**Summary:** Document the backend API endpoints for quiz and translation management.

**Copy-Paste Instructions:**
1. Create `docs/API.md`
2. Copy-paste:
```markdown
# ScholarForge API Documentation

## Quiz Management

### GET /api/quizzes
Get available quizzes by language and topic.

### POST /api/quizzes
Create a new quiz (QuizMaster only).

### PUT /api/quizzes/:id
Update quiz content.

### DELETE /api/quizzes/:id
Delete a quiz (Admin only).

## Translation Management

### POST /api/translate
Auto-translate quiz content using AI.

### POST /api/suggestions
Submit translation suggestions.

### GET /api/suggestions
Get pending suggestions for review.

## XP Rewards

### POST /api/rewards/xp
Award XP for quiz completion or contributions.

### GET /api/leaderboard
Get leaderboards by language and globally.
```

## Deployment Issues

### Issue #11: Create Deployment Scripts
**Assigned to:** @Samxury
**Labels:** deployment

**Summary:** Create Hardhat deployment scripts for EduChain testnet.

**Copy-Paste Instructions:**
1. Create `scripts/deploy.js`
2. Copy-paste:
```javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying ScholarForge contracts...");

  // Deploy XPToken
  const XPToken = await hre.ethers.getContractFactory("XPToken");
  const xpToken = await XPToken.deploy();
  await xpToken.deployed();
  console.log("XPToken deployed to:", xpToken.address);

  // Deploy SkillNFT
  const SkillNFT = await hre.ethers.getContractFactory("SkillNFT");
  const skillNFT = await SkillNFT.deploy();
  await skillNFT.deployed();
  console.log("SkillNFT deployed to:", skillNFT.address);

  // Grant QuizMaster role to deployer
  const QUIZMASTER_ROLE = await xpToken.QUIZMASTER_ROLE();
  await xpToken.grantRole(QUIZMASTER_ROLE, (await hre.ethers.getSigners())[0].address);
  await skillNFT.grantRole(QUIZMASTER_ROLE, (await hre.ethers.getSigners())[0].address);

  console.log("Deployment complete!");
  console.log("XPToken:", xpToken.address);
  console.log("SkillNFT:", skillNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Issue #12: Add Hardhat Configuration for EduChain
**Assigned to:** @TechGuygh
**Labels:** deployment

**Summary:** Configure Hardhat for EduChain testnet deployment.

**Copy-Paste Instructions:**
1. Open `hardhat.config.js`
2. Add after the existing networks:
```javascript
  networks: {
    // ... existing networks ...
    educhain: {
      url: process.env.EDUCHAIN_RPC_URL || "https://educhain-rpc-url",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1234, // Replace with actual EduChain chain ID
      gasPrice: 20000000000, // 20 gwei
    }
  }
```

## Testing Issues

### Issue #13: Add Integration Tests
**Assigned to:** @Samxury
**Labels:** test, integration

**Summary:** Create integration tests that test the full flow.

**Copy-Paste Instructions:**
1. Create `test/integration.test.js`
2. Copy-paste:
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScholarForge Integration", function () {
  let XPToken, SkillNFT, xpToken, skillNFT, owner, quizMaster, student;

  beforeEach(async function () {
    [owner, quizMaster, student, ...addrs] = await ethers.getSigners();
    
    // Deploy contracts
    XPToken = await ethers.getContractFactory("XPToken");
    xpToken = await XPToken.deploy();
    await xpToken.deployed();

    SkillNFT = await ethers.getContractFactory("SkillNFT");
    skillNFT = await SkillNFT.deploy();
    await skillNFT.deployed();

    // Setup roles
    const QUIZMASTER_ROLE = await xpToken.QUIZMASTER_ROLE();
    await xpToken.grantRole(QUIZMASTER_ROLE, quizMaster.address);
    await skillNFT.grantRole(QUIZMASTER_ROLE, quizMaster.address);
  });

  it("should complete full learning flow", async function () {
    // 1. Student takes quiz and earns XP
    const quizXP = ethers.utils.parseUnits("100", 18);
    await xpToken.connect(quizMaster).mint(student.address, quizXP, "Quiz completed");
    expect(await xpToken.balanceOf(student.address)).to.equal(quizXP);

    // 2. Student masters topic and gets Skill NFT
    await skillNFT.connect(quizMaster).mintSkill(student.address, "Solidity Mastery", "ipfs://skill-1");
    expect(await skillNFT.ownerOf(0)).to.equal(student.address);

    // 3. Student becomes Language Hero
    await skillNFT.connect(quizMaster).mintLanguageHero(student.address, "Twi", "ipfs://hero-twi");
    expect(await skillNFT.languageHero("Twi")).to.equal(student.address);

    // 4. Student tips another user
    const tipAmount = ethers.utils.parseUnits("20", 18);
    await xpToken.connect(student).tip(quizMaster.address, tipAmount, "Great quiz!");
    expect(await xpToken.balanceOf(quizMaster.address)).to.equal(tipAmount);
  });
});
```

## Performance Issues

### Issue #14: Add Gas Optimization
**Assigned to:** @TechGuygh
**Labels:** optimization

**Summary:** Optimize gas usage in smart contracts.

**Copy-Paste Instructions:**
1. Open `contracts/XPToken.sol`
2. Add after the constructor:
```solidity
    /**
     * @notice Batch mint XP to multiple users (gas optimized)
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to mint
     * @param reasons Array of reasons
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts, string[] calldata reasons) external onlyRole(QUIZMASTER_ROLE) whenNotPaused {
        require(recipients.length == amounts.length && amounts.length == reasons.length, "Array length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
            emit XPMinted(recipients[i], amounts[i], reasons[i]);
        }
    }
```

---

## Issue Assignment Summary

- **@mrslick8601:** Language Hero NFTs, Landing Page, Architecture docs
- **@RicheySon:** Tipping system, Learning Interface, API docs
- **@Samxury:** Advanced XPToken tests, Web3 Integration, Integration tests, Deployment scripts
- **@TechGuygh:** Advanced SkillNFT tests, UI/UX Design, Hardhat config, Gas optimization

Each teammate will have 3-4 issues to work on, maximizing collaboration and commits!

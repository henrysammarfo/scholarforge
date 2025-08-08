const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SkillNFT", function () {
  let SkillNFT, skillNFT, owner, quizMaster, user1, user2;

  beforeEach(async function () {
    [owner, quizMaster, user1, user2, ...addrs] = await ethers.getSigners();
    SkillNFT = await ethers.getContractFactory("SkillNFT");
    skillNFT = await SkillNFT.deploy();
    await skillNFT.deployed();
    // Grant QuizMaster role to quizMaster
    const QUIZMASTER_ROLE = await skillNFT.QUIZMASTER_ROLE();
    await skillNFT.connect(owner).grantRole(QUIZMASTER_ROLE, quizMaster.address);
  });

  it("should deploy with correct name and symbol", async function () {
    expect(await skillNFT.name()).to.equal("ScholarForge Skill NFT");
    expect(await skillNFT.symbol()).to.equal("SKILL");
  });

  it("should allow QuizMaster to mint Skill NFT and emit event", async function () {
    const skill = "Solidity Mastery";
    const uri = "ipfs://testuri1";
    await expect(skillNFT.connect(quizMaster).mintSkill(user1.address, skill, uri))
      .to.emit(skillNFT, "SkillMinted")
      .withArgs(user1.address, 0, skill, uri);
    expect(await skillNFT.ownerOf(0)).to.equal(user1.address);
    expect(await skillNFT.skillLevel(0)).to.equal(skill);
    expect(await skillNFT.tokenURI(0)).to.equal(uri);
  });

  it("should not allow non-QuizMaster to mint", async function () {
    await expect(skillNFT.connect(user1).mintSkill(user1.address, "Hacking", "ipfs://fail"))
      .to.be.revertedWith(/AccessControl/);
  });

  it("should allow batch minting by QuizMaster", async function () {
    const recipients = [user1.address, user2.address];
    const skills = ["Python", "JavaScript"];
    const uris = ["ipfs://uri1", "ipfs://uri2"];
    await skillNFT.connect(quizMaster).batchMint(recipients, skills, uris);
    expect(await skillNFT.ownerOf(0)).to.equal(user1.address);
    expect(await skillNFT.ownerOf(1)).to.equal(user2.address);
    expect(await skillNFT.skillLevel(0)).to.equal("Python");
    expect(await skillNFT.skillLevel(1)).to.equal("JavaScript");
  });

  it("should revert batch mint if array lengths mismatch", async function () {
    await expect(
      skillNFT.connect(quizMaster).batchMint([user1.address], ["Python", "JS"], ["ipfs://uri1"])
    ).to.be.revertedWith("Array length mismatch");
  });

  it("should pause and unpause by admin", async function () {
    await skillNFT.connect(owner).pause();
    await expect(skillNFT.connect(quizMaster).mintSkill(user1.address, "Paused", "ipfs://fail"))
      .to.be.revertedWith("Pausable: paused");
    await skillNFT.connect(owner).unpause();
    await skillNFT.connect(quizMaster).mintSkill(user1.address, "Unpaused", "ipfs://ok");
    expect(await skillNFT.ownerOf(0)).to.equal(user1.address);
  });

  it("should not allow non-admin to pause/unpause", async function () {
    await expect(skillNFT.connect(user1).pause()).to.be.revertedWith(/AccessControl/);
    await skillNFT.connect(owner).pause();
    await expect(skillNFT.connect(user1).unpause()).to.be.revertedWith(/AccessControl/);
  });
});

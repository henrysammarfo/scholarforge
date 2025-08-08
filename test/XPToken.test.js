const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("XPToken", function () {
  let XPToken, xpToken, owner, quizMaster, user;

  beforeEach(async function () {
    [owner, quizMaster, user, ...addrs] = await ethers.getSigners();
    XPToken = await ethers.getContractFactory("XPToken");
    xpToken = await XPToken.deploy();
    await xpToken.deployed();
    // Grant QuizMaster role to quizMaster
    const QUIZMASTER_ROLE = await xpToken.QUIZMASTER_ROLE();
    await xpToken.connect(owner).grantRole(QUIZMASTER_ROLE, quizMaster.address);
  });

  it("should deploy with initial supply to owner", async function () {
    expect(await xpToken.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("1000000", 18));
  });

  it("should allow QuizMaster to mint XP and emit event", async function () {
    const amount = ethers.utils.parseUnits("100", 18);
    await expect(xpToken.connect(quizMaster).mint(user.address, amount, "Quiz completed"))
      .to.emit(xpToken, "XPMinted")
      .withArgs(user.address, amount, "Quiz completed");
    expect(await xpToken.balanceOf(user.address)).to.equal(amount);
  });

  it("should not allow non-QuizMaster to mint", async function () {
    const amount = ethers.utils.parseUnits("100", 18);
    await expect(xpToken.connect(user).mint(user.address, amount, "Cheat"))
      .to.be.revertedWith(/AccessControl/);
  });

  it("should allow QuizMaster to burn XP", async function () {
    const amount = ethers.utils.parseUnits("50", 18);
    await xpToken.connect(quizMaster).mint(user.address, amount, "Quiz completed");
    await xpToken.connect(quizMaster).burn(user.address, amount);
    expect(await xpToken.balanceOf(user.address)).to.equal(0);
  });

  it("should pause and unpause by admin", async function () {
    await xpToken.connect(owner).pause();
    const amount = ethers.utils.parseUnits("10", 18);
    await expect(xpToken.connect(quizMaster).mint(user.address, amount, "Paused"))
      .to.be.revertedWith("Pausable: paused");
    await xpToken.connect(owner).unpause();
    await xpToken.connect(quizMaster).mint(user.address, amount, "Unpaused");
    expect(await xpToken.balanceOf(user.address)).to.equal(amount);
  });

  it("should not allow non-admin to pause/unpause", async function () {
    await expect(xpToken.connect(user).pause()).to.be.revertedWith(/AccessControl/);
    await xpToken.connect(owner).pause();
    await expect(xpToken.connect(user).unpause()).to.be.revertedWith(/AccessControl/);
  });
});

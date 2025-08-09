const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const network = hre.network.name;
  console.log(`Deploying contracts to ${network}...`);

  const XPToken = await hre.ethers.getContractFactory("XPToken");
  const xpToken = await XPToken.deploy();
  await xpToken.waitForDeployment();

  const SkillNFT = await hre.ethers.getContractFactory("SkillNFT");
  const skillNFT = await SkillNFT.deploy();
  await skillNFT.waitForDeployment();

  console.log("XPToken:", await xpToken.getAddress());
  console.log("SkillNFT:", await skillNFT.getAddress());

  // Write to frontend env if exists
  const frontendDir = path.resolve(__dirname, "../frontend");
  const envPath = path.join(frontendDir, ".env.local");
  try {
    if (fs.existsSync(frontendDir)) {
      const envContent = `NEXT_PUBLIC_CONTRACT_ADDRESS_XP=${await xpToken.getAddress()}\nNEXT_PUBLIC_CONTRACT_ADDRESS_SKILL=${await skillNFT.getAddress()}\n`;
      fs.writeFileSync(envPath, envContent);
      console.log("Wrote contract addresses to frontend/.env.local");
    }
  } catch (e) {
    console.warn("Could not write frontend env:", e.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

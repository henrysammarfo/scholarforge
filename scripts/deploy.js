const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to EduChain testnet...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  // Deploy XPToken first
  console.log("\n🔸 Deploying XPToken...");
  const XPToken = await ethers.getContractFactory("XPToken");
  const xpToken = await XPToken.deploy();
  await xpToken.deployed();
  console.log("✅ XPToken deployed to:", xpToken.address);

  // Deploy SkillNFT
  console.log("\n🔸 Deploying SkillNFT...");
  const SkillNFT = await ethers.getContractFactory("SkillNFT");
  const skillNFT = await SkillNFT.deploy();
  await skillNFT.deployed();
  console.log("✅ SkillNFT deployed to:", skillNFT.address);

  // Grant QUIZMASTER_ROLE to the deployer on both contracts
  console.log("\n🔐 Setting up roles...");
  
  const QUIZMASTER_ROLE = await xpToken.QUIZMASTER_ROLE();
  await xpToken.grantRole(QUIZMASTER_ROLE, deployer.address);
  console.log("✅ Granted QUIZMASTER_ROLE on XPToken to deployer");

  const SKILL_QUIZMASTER_ROLE = await skillNFT.QUIZMASTER_ROLE();
  await skillNFT.grantRole(SKILL_QUIZMASTER_ROLE, deployer.address);
  console.log("✅ Granted QUIZMASTER_ROLE on SkillNFT to deployer");

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const xpBalance = await xpToken.balanceOf(deployer.address);
  console.log("💰 Initial XP balance:", ethers.utils.formatEther(xpBalance));

  const nftCount = await skillNFT.balanceOf(deployer.address);
  console.log("🎨 Initial NFT count:", nftCount.toString());

  // Save deployment info
  const deploymentInfo = {
    network: "EduChain Testnet",
    chainId: 656476,
    deployer: deployer.address,
    contracts: {
      XPToken: {
        address: xpToken.address,
        name: await xpToken.name(),
        symbol: await xpToken.symbol(),
        decimals: await xpToken.decimals(),
        totalSupply: ethers.utils.formatEther(await xpToken.totalSupply())
      },
      SkillNFT: {
        address: skillNFT.address,
        name: await skillNFT.name(),
        symbol: await skillNFT.symbol()
      }
    },
    deploymentTime: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber()
  };

  console.log("\n📋 Deployment Summary:");
  console.log("================================");
  console.log(`Network: ${deploymentInfo.network}`);
  console.log(`Chain ID: ${deploymentInfo.chainId}`);
  console.log(`Deployer: ${deploymentInfo.deployer}`);
  console.log(`Block: ${deploymentInfo.blockNumber}`);
  console.log("\nContracts:");
  console.log(`XPToken: ${deploymentInfo.contracts.XPToken.address}`);
  console.log(`SkillNFT: ${deploymentInfo.contracts.SkillNFT.address}`);
  console.log("\nEnvironment Variables to set:");
  console.log("=================================");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS_XP=${deploymentInfo.contracts.XPToken.address}`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL=${deploymentInfo.contracts.SkillNFT.address}`);
  console.log(`NEXT_PUBLIC_EDUCHAIN_ID=${deploymentInfo.chainId}`);
  console.log(`NEXT_PUBLIC_EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital`);
  console.log(`NEXT_PUBLIC_EDUCHAIN_EXPLORER=https://explorer.open-campus-codex.gelato.digital`);

  // Save deployment info to file
  const fs = require('fs');
  fs.writeFileSync(
    'deployment-info.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\n💾 Deployment info saved to deployment-info.json");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔗 Next steps:");
  console.log("1. Update your .env file with the contract addresses above");
  console.log("2. Update frontend environment variables");
  console.log("3. Test the contracts on EduChain testnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

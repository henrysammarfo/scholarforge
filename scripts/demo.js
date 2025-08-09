const hre = require("hardhat");

async function demo() {
  console.log("🎓 ScholarForge Demo - Learn Local, Earn Global");
  console.log("=" .repeat(50));

  // Deploy contracts
  console.log("\n📦 Deploying Smart Contracts...");
  const XPToken = await hre.ethers.getContractFactory("XPToken");
  const xpToken = await XPToken.deploy();
  await xpToken.deployed();

  const SkillNFT = await hre.ethers.getContractFactory("SkillNFT");
  const skillNFT = await SkillNFT.deploy();
  await skillNFT.deployed();

  console.log("✅ XPToken deployed to:", xpToken.address);
  console.log("✅ SkillNFT deployed to:", skillNFT.address);

  // Setup roles
  const [owner, quizMaster, student1, student2, translator] = await hre.ethers.getSigners();
  const QUIZMASTER_ROLE = await xpToken.QUIZMASTER_ROLE();
  await xpToken.grantRole(QUIZMASTER_ROLE, quizMaster.address);
  await skillNFT.grantRole(QUIZMASTER_ROLE, quizMaster.address);

  console.log("\n👥 Setting up roles...");
  console.log("✅ QuizMaster:", quizMaster.address);
  console.log("✅ Students:", student1.address, student2.address);

  // Demo 1: Language Learning Flow
  console.log("\n🌍 Demo 1: Language Learning Flow");
  console.log("-" .repeat(30));
  
  // Student takes Twi quiz
  const twiQuizXP = hre.ethers.parseUnits("100", 18);
  await xpToken.connect(quizMaster).mint(student1.address, twiQuizXP, "Twi Quiz completed");
  console.log("✅ Student earned", hre.ethers.formatUnits(twiQuizXP, 18), "XP for Twi quiz");

  // Student masters Twi and gets Skill NFT
  await skillNFT.connect(quizMaster).mintSkill(student1.address, "Twi Mastery", "ipfs://twi-skill-1");
  console.log("✅ Student minted Twi Mastery Skill NFT");

  // Student becomes Language Hero
  await skillNFT.connect(quizMaster).mintLanguageHero(student1.address, "Twi", "ipfs://twi-hero-1");
  console.log("✅ Student became Twi Language Hero!");

  // Demo 2: Community Contributions
  console.log("\n🤝 Demo 2: Community Contributions");
  console.log("-" .repeat(30));

  // Translator earns XP for contributions
  const contributionXP = hre.ethers.parseUnits("50", 18);
  await xpToken.connect(quizMaster).mint(translator.address, contributionXP, "Translation contribution");
  console.log("✅ Translator earned", hre.ethers.utils.formatUnits(contributionXP, 18), "XP for translation");

  // Student tips translator
  const tipAmount = hre.ethers.parseUnits("20", 18);
  await xpToken.connect(student1).tip(translator.address, tipAmount, "Great translation!");
  console.log("✅ Student tipped translator", hre.ethers.utils.formatUnits(tipAmount, 18), "XP");

  // Demo 3: Multi-language Support
  console.log("\n🌐 Demo 3: Multi-language Support");
  console.log("-" .repeat(30));

  // Student takes Yoruba quiz
  const yorubaQuizXP = hre.ethers.parseUnits("80", 18);
  await xpToken.connect(quizMaster).mint(student2.address, yorubaQuizXP, "Yoruba Quiz completed");
  console.log("✅ Student earned", hre.ethers.formatUnits(yorubaQuizXP, 18), "XP for Yoruba quiz");

  // Student masters Yoruba
  await skillNFT.connect(quizMaster).mintSkill(student2.address, "Yoruba Mastery", "ipfs://yoruba-skill-1");
  console.log("✅ Student minted Yoruba Mastery Skill NFT");

  // Demo 4: Batch Operations
  console.log("\n⚡ Demo 4: Batch Operations");
  console.log("-" .repeat(30));

  // Batch mint XP to multiple students
  const recipients = [student1.address, student2.address];
  const amounts = [
    hre.ethers.parseUnits("25", 18),
    hre.ethers.parseUnits("25", 18)
  ];
  const reasons = ["Participation bonus", "Participation bonus"];
  
  await xpToken.connect(quizMaster).batchMint(recipients, amounts, reasons);
  console.log("✅ Batch minted XP to", recipients.length, "students");

  // Demo 5: Final Stats
  console.log("\n📊 Demo 5: Final Statistics");
  console.log("-" .repeat(30));

  console.log("🎓 Total XP in circulation:", hre.ethers.formatUnits(await xpToken.totalSupply(), 18));
  console.log("🏆 Total Skill NFTs minted:", await skillNFT.nextTokenId());
  console.log("🌍 Language Heroes:", "Twi (Student 1)");
  console.log("💰 Student 1 XP balance:", hre.ethers.formatUnits(await xpToken.balanceOf(student1.address), 18));
  console.log("💰 Student 2 XP balance:", hre.ethers.formatUnits(await xpToken.balanceOf(student2.address), 18));
  console.log("💰 Translator XP balance:", hre.ethers.formatUnits(await xpToken.balanceOf(translator.address), 18));

  console.log("\n🎉 Demo Complete! ScholarForge is ready for global learning!");
  console.log("\nKey Features Demonstrated:");
  console.log("✅ Multi-language learning support");
  console.log("✅ XP rewards for learning and contributions");
  console.log("✅ Skill NFTs for topic mastery");
  console.log("✅ Language Hero recognition");
  console.log("✅ Community tipping system");
  console.log("✅ Batch operations for scalability");
  console.log("✅ Role-based access control");
  console.log("✅ Onchain credential verification");
}

demo()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Demo failed:", error);
    process.exit(1);
  });

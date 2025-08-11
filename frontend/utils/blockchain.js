import { ethers } from 'ethers';

// XP Token ABI - just the functions we need
const XP_TOKEN_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "string", "name": "reason", "type": "string"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address[]", "name": "recipients", "type": "address[]"},
      {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"},
      {"internalType": "string[]", "name": "reasons", "type": "string[]"}
    ],
    "name": "batchMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Skill NFT ABI - just the functions we need
const SKILL_NFT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "skill", "type": "string"},
      {"internalType": "string", "name": "level", "type": "string"},
      {"internalType": "string", "name": "evidence", "type": "string"}
    ],
    "name": "mintSkill",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract addresses from environment
export const XP_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_XP;
export const SKILL_NFT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL;
export const EDUCHAIN_ID = Number(process.env.NEXT_PUBLIC_EDUCHAIN_ID || '656476');

// Check if user is on correct network
export const isCorrectNetwork = (chainId) => {
  return chainId === EDUCHAIN_ID;
};

// Get contract instance
export const getXPContract = (signer) => {
  if (!XP_TOKEN_ADDRESS) {
    throw new Error('XP Token contract address not configured');
  }
  return new ethers.Contract(XP_TOKEN_ADDRESS, XP_TOKEN_ABI, signer);
};

export const getSkillNFTContract = (signer) => {
  if (!SKILL_NFT_ADDRESS) {
    throw new Error('Skill NFT contract address not configured');
  }
  return new ethers.Contract(SKILL_NFT_ADDRESS, SKILL_NFT_ABI, signer);
};

// Mint XP tokens for quiz completion
export const mintXPForQuiz = async (walletClient, userAddress, xpAmount, quizDetails) => {
  try {
    if (!walletClient || !userAddress) {
      throw new Error('Wallet not connected');
    }

    // Check if contract addresses are configured
    if (!XP_TOKEN_ADDRESS || XP_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
      throw new Error('XP Token contract address not configured. Please set NEXT_PUBLIC_CONTRACT_ADDRESS_XP in your environment variables.');
    }

    const signer = walletClient;
    const contract = getXPContract(signer);
    const reason = `Quiz completed: ${quizDetails.topic} (${quizDetails.language})`;
    
    // Convert XP amount to wei (assuming 18 decimals)
    const amount = ethers.parseUnits(xpAmount.toString(), 18);
    
    console.log('Minting XP:', { userAddress, amount: amount.toString(), reason });
    
    const tx = await contract.mint(userAddress, amount, reason);
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);
    
    return {
      success: true,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString()
    };
  } catch (error) {
    console.error('Error minting XP:', error);
    return {
      success: false,
      error: error.message || 'Failed to mint XP tokens'
    };
  }
};

// Mint Skill NFT for course completion
export const mintSkillNFT = async (walletClient, userAddress, skillDetails) => {
  try {
    if (!walletClient || !userAddress) {
      throw new Error('Wallet not connected');
    }

    const signer = walletClient;
    const contract = getSkillNFTContract(signer);
    
    const { skill, level, topic, language, completionPercentage } = skillDetails;
    const evidence = `Completed ${topic} course in ${language} with ${completionPercentage}% score`;
    
    console.log('Minting Skill NFT:', { userAddress, skill, level, evidence });
    
    // Estimate gas first
    const gasEstimate = await contract.mintSkill.estimateGas(userAddress, skill, evidence);
    console.log('Gas estimate:', gasEstimate.toString());
    
    const tx = await contract.mintSkill(userAddress, skill, evidence, {
      gasLimit: gasEstimate.mul(120).div(100) // Add 20% buffer
    });
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);
    
    // Extract token ID from logs
    let tokenId = null;
    if (receipt.logs && receipt.logs.length > 0) {
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog && parsedLog.name === 'SkillMinted') {
            tokenId = parsedLog.args.tokenId.toString();
            break;
          }
        } catch (e) {
          // Continue searching for the right log
        }
      }
    }
    
    return {
      success: true,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      tokenId: tokenId
    };
  } catch (error) {
    console.error('Error minting Skill NFT:', error);
    return {
      success: false,
      error: error.message || 'Failed to mint Skill NFT'
    };
  }
};

// Get XP balance with real blockchain data
export const getXPBalance = async (provider, userAddress) => {
  try {
    if (!provider || !userAddress) return '0';
    
    const contract = new ethers.Contract(XP_TOKEN_ADDRESS, XP_TOKEN_ABI, provider);
    const balance = await contract.balanceOf(userAddress);
    
    // Convert from wei to tokens (assuming 18 decimals)
    return ethers.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error getting XP balance:', error);
    return '0';
  }
};

// Get Skill NFT count with real blockchain data
export const getSkillNFTCount = async (provider, userAddress) => {
  try {
    if (!provider || !userAddress) return '0';
    
    const contract = new ethers.Contract(SKILL_NFT_ADDRESS, SKILL_NFT_ABI, provider);
    const balance = await contract.balanceOf(userAddress);
    
    return balance.toString();
  } catch (error) {
    console.error('Error getting Skill NFT count:', error);
    return '0';
  }
};

// Estimate gas for transactions
export const estimateXPMintGas = async (signer, userAddress, xpAmount, reason) => {
  try {
    const contract = getXPContract(signer);
    const amount = ethers.parseUnits(xpAmount.toString(), 18);
    
    const gasEstimate = await contract.mint.estimateGas(userAddress, amount, reason);
    return gasEstimate.toString();
  } catch (error) {
    console.error('Error estimating gas:', error);
    return null;
  }
};

export const estimateSkillNFTMintGas = async (signer, userAddress, skill, level, evidence) => {
  try {
    const contract = getSkillNFTContract(signer);
    
    const gasEstimate = await contract.mintSkill.estimateGas(userAddress, skill, level, evidence);
    return gasEstimate.toString();
  } catch (error) {
    console.error('Error estimating gas:', error);
    return null;
  }
};

// Switch to EduChain network
export const switchToEduChain = async () => {
  if (!window.ethereum) {
    throw new Error('No wallet detected');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${EDUCHAIN_ID.toString(16)}` }],
    });
  } catch (switchError) {
    // If network doesn't exist, add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${EDUCHAIN_ID.toString(16)}`,
                             chainName: 'EDU Chain Testnet',
               rpcUrls: [process.env.NEXT_PUBLIC_EDUCHAIN_RPC],
               nativeCurrency: {
                 name: 'EDU',
                 symbol: 'EDU',
                 decimals: 18,
               },
               blockExplorerUrls: ['https://explorer.open-campus-codex.gelato.digital'],
            },
          ],
        });
      } catch (addError) {
        throw new Error('Failed to add EduChain network');
      }
    } else {
      throw new Error('Failed to switch to EduChain network');
    }
  }
};

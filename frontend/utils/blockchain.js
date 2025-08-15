import { ethers } from 'ethers';

// XP Token ABI - updated for new contract interface
const XP_TOKEN_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "string", "name": "reason", "type": "string"},
      {"internalType": "string", "name": "activity", "type": "string"}
    ],
    "name": "mintXP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "string", "name": "course", "type": "string"},
      {"internalType": "string", "name": "language", "type": "string"},
      {"internalType": "uint256", "name": "score", "type": "uint256"}
    ],
    "name": "mintQuizXP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address[]", "name": "recipients", "type": "address[]"},
      {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"},
      {"internalType": "string[]", "name": "reasons", "type": "string[]"},
      {"internalType": "string[]", "name": "activities", "type": "string[]"}
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
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getTotalXPEarned",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "string", "name": "activity", "type": "string"}
    ],
    "name": "getXPByActivity",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Skill NFT ABI - updated for new contract interface
const SKILL_NFT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "skill", "type": "string"},
      {"internalType": "string", "name": "metadataURI", "type": "string"}
    ],
    "name": "mintSkill",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "courseName", "type": "string"},
      {"internalType": "string", "name": "language", "type": "string"},
      {"internalType": "uint256", "name": "score", "type": "uint256"},
      {"internalType": "string", "name": "topic", "type": "string"},
      {"internalType": "string", "name": "metadataURI", "type": "string"}
    ],
    "name": "mintCourseCompletion",
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
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getCourseCompletion",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "courseName", "type": "string"},
          {"internalType": "string", "name": "language", "type": "string"},
          {"internalType": "uint256", "name": "completionDate", "type": "uint256"},
          {"internalType": "uint256", "name": "score", "type": "uint256"},
          {"internalType": "string", "name": "topic", "type": "string"}
        ],
        "internalType": "struct SkillNFT.CourseCompletion",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract addresses from environment
export const XP_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_XP;
export const SKILL_NFT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL;
export const EDUCHAIN_ID = Number(process.env.NEXT_PUBLIC_EDUCHAIN_CHAIN_ID || '656476');

// Debug logging
console.log('🔍 Blockchain Utils Loaded:');
console.log('XP_TOKEN_ADDRESS:', XP_TOKEN_ADDRESS);
console.log('SKILL_NFT_ADDRESS:', SKILL_NFT_ADDRESS);
console.log('EDUCHAIN_ID:', EDUCHAIN_ID);
console.log('Environment check:', {
  XP: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_XP,
  SKILL: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL,
  CHAIN_ID: process.env.NEXT_PUBLIC_EDUCHAIN_CHAIN_ID
});

// Check if user is on correct network
export const isCorrectNetwork = (chainId) => {
  console.log('🔍 Network Check:', { chainId, EDUCHAIN_ID, isCorrect: chainId === EDUCHAIN_ID });
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

// Convert Wagmi wallet client to ethers signer
export const getEthersSigner = (walletClient) => {
  if (!walletClient) {
    throw new Error('Wallet client not provided');
  }
  
  // Check if it's already an ethers signer
  if (walletClient._isSigner) {
    return walletClient;
  }
  
  // Check if it's a Wagmi wallet client
  if (walletClient.account && walletClient.chain) {
    // Create a custom provider from the wallet client
    const provider = new ethers.providers.Web3Provider(walletClient);
    return provider.getSigner();
  }
  
  // If it's something else, try to use it directly
  return walletClient;
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

    const signer = getEthersSigner(walletClient);
    const contract = getXPContract(signer);
    
    // Convert XP amount to wei (assuming 18 decimals)
    const amount = ethers.utils.parseUnits(xpAmount.toString(), 18);
    
    console.log('Minting XP for quiz:', { userAddress, amount: amount.toString(), quizDetails });
    
    // Use the new mintQuizXP function
    const tx = await contract.mintQuizXP(
      userAddress, 
      amount, 
      quizDetails.topic || 'Unknown Course', 
      quizDetails.language || 'en', 
      quizDetails.score || 100
    );
    
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

    const signer = getEthersSigner(walletClient);
    const contract = getSkillNFTContract(signer);
    
    const { courseName, language, score, topic } = skillDetails;
    
    // Create metadata URI for the NFT
    const metadata = {
      name: `Course Completion: ${courseName}`,
      description: `Successfully completed ${courseName} in ${language}`,
      image: "https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=Course+Complete",
      attributes: [
        { trait_type: "Course", value: courseName },
        { trait_type: "Language", value: language },
        { trait_type: "Score", value: score },
        { trait_type: "Topic", value: topic },
        { trait_type: "Completion Date", value: new Date().toISOString() }
      ]
    };
    
    // For now, we'll use a placeholder URI - in production, you'd upload to IPFS
    const tokenURI = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
    
    console.log('Minting Skill NFT:', { userAddress, courseName, language, score, topic });
    
    // Use the new mintCourseCompletion function
    const tx = await contract.mintCourseCompletion(
      userAddress, 
      courseName, 
      language, 
      score, 
      topic, 
      tokenURI
    );
    
    console.log('Transaction sent:', tx.hash);
    
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);
    console.log('🔍 Receipt structure:', {
      hasReceipt: !!receipt,
      hasLogs: !!(receipt && receipt.logs),
      logsType: receipt && receipt.logs ? typeof receipt.logs : 'undefined',
      logsLength: receipt && receipt.logs ? receipt.logs.length : 'N/A',
      logsIsArray: receipt && receipt.logs ? Array.isArray(receipt.logs) : 'N/A'
    });
    
         // Extract token ID from logs
     let tokenId = null;
     try {
       if (receipt && receipt.logs) {
         console.log('Transaction receipt logs:', receipt.logs);
         
         if (Array.isArray(receipt.logs) && receipt.logs.length > 0) {
           for (const log of receipt.logs) {
             try {
               if (log && log.topics && Array.isArray(log.topics) && log.topics.length > 0) {
                 const parsedLog = contract.interface.parseLog(log);
                 if (parsedLog && parsedLog.name === 'SkillMinted') {
                   tokenId = parsedLog.args.tokenId.toString();
                   break;
                 }
               }
             } catch (e) {
               // Continue searching for the right log
               console.log('Log parsing error:', e);
             }
           }
         }
       }
     } catch (e) {
       console.log('Error processing receipt logs:', e);
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
    if (!provider || !userAddress || !XP_TOKEN_ADDRESS) return '0';
    
    // Always use EduChain RPC for contract calls
    const educhainRPC = process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL || 'https://rpc.open-campus-codex.gelato.digital';
    console.log('🔍 Using RPC for XP balance:', educhainRPC);
    
    const ethersProvider = new ethers.providers.JsonRpcProvider(educhainRPC);
    const contract = new ethers.Contract(XP_TOKEN_ADDRESS, XP_TOKEN_ABI, ethersProvider);
    const balance = await contract.balanceOf(userAddress);
    
    // Convert from wei to tokens (assuming 18 decimals)
    return ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error getting XP balance:', error);
    return '0';
  }
};

// Get Skill NFT count with real blockchain data
export const getSkillNFTCount = async (provider, userAddress) => {
  try {
    if (!provider || !userAddress || !SKILL_NFT_ADDRESS) return '0';
    
    // Always use EduChain RPC for contract calls
    const educhainRPC = process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL || 'https://rpc.open-campus-codex.gelato.digital';
    const ethersProvider = new ethers.providers.JsonRpcProvider(educhainRPC);
    
    const contract = new ethers.Contract(SKILL_NFT_ADDRESS, SKILL_NFT_ABI, ethersProvider);
    const balance = await contract.balanceOf(userAddress);
    
    return balance.toString();
  } catch (error) {
    console.error('Error getting Skill NFT count:', error);
    return '0';
  }
};

// Get total XP earned by user
export const getTotalXPEarned = async (provider, userAddress) => {
  try {
    if (!provider || !userAddress || !XP_TOKEN_ADDRESS) return '0';
    
    // Always use EduChain RPC for contract calls
    const educhainRPC = process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL || 'https://rpc.open-campus-codex.gelato.digital';
    const ethersProvider = new ethers.providers.JsonRpcProvider(educhainRPC);
    
    const contract = new ethers.Contract(XP_TOKEN_ADDRESS, XP_TOKEN_ABI, ethersProvider);
    const totalEarned = await contract.getTotalXPEarned(userAddress);
    
    return ethers.utils.formatUnits(totalEarned, 18);
  } catch (error) {
    console.error('Error getting total XP earned:', error);
    return '0';
  }
};

// Get XP by activity
export const getXPByActivity = async (provider, userAddress, activity) => {
  try {
    if (!provider || !userAddress || !XP_TOKEN_ADDRESS) return '0';
    
    // Always use EduChain RPC for contract calls
    const educhainRPC = process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL || 'https://rpc.open-campus-codex.gelato.digital';
    const ethersProvider = new ethers.providers.JsonRpcProvider(educhainRPC);
    
    const contract = new ethers.Contract(XP_TOKEN_ADDRESS, XP_TOKEN_ABI, ethersProvider);
    const xpAmount = await contract.getXPByActivity(userAddress, activity);
    
    return ethers.utils.formatUnits(xpAmount, 18);
  } catch (error) {
    console.error('Error getting XP by activity:', error);
    return '0';
  }
};

// Estimate gas for transactions
export const estimateXPMintGas = async (walletClient, userAddress, xpAmount, reason, activity) => {
  try {
    const signer = getEthersSigner(walletClient);
    const contract = getXPContract(signer);
    const amount = ethers.utils.parseUnits(xpAmount.toString(), 18);
    
    const gasEstimate = await contract.mintXP.estimateGas(userAddress, amount, reason, activity);
    return gasEstimate.toString();
  } catch (error) {
    console.error('Error estimating gas:', error);
    return null;
  }
};

export const estimateSkillNFTMintGas = async (walletClient, userAddress, courseName, language, score, topic, tokenURI) => {
  try {
    const signer = getEthersSigner(walletClient);
    const contract = getSkillNFTContract(signer);
    
    const gasEstimate = await contract.mintCourseCompletion.estimateGas(
      userAddress, courseName, language, score, topic, tokenURI
    );
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
              rpcUrls: [process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL || 'https://rpc.open-campus-codex.gelato.digital'],
              nativeCurrency: {
                name: 'EDU',
                symbol: 'EDU',
                decimals: 18,
              },
              blockExplorerUrls: [process.env.NEXT_PUBLIC_EDUCHAIN_EXPLORER || 'https://explorer.open-campus-codex.gelato.digital'],
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

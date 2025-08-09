import { getPublicClient, getWalletClient } from 'wagmi/actions';
import { ethers } from 'ethers';

const xpAbi = [
  'function balanceOf(address) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function mint(address to, uint256 amount, string reason)',
  'function tip(address to, uint256 amount, string reason)',
  'event XPMinted(address indexed to, uint256 amount, string reason)'
];

const skillAbi = [
  'function nextTokenId() view returns (uint256)',
  'function mintSkill(address to, string skill, string tokenURI) returns (uint256)',
  'function mintLanguageHero(address to, string language, string tokenURI) returns (uint256)'
];

export function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return ethers.getDefaultProvider();
}

export async function getSigner() {
  const provider = getProvider();
  return await provider.getSigner();
}

export function getXPTokenContract(signerOrProvider) {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_XP;
  return new ethers.Contract(address, xpAbi, signerOrProvider || getProvider());
}

export function getSkillNFTContract(signerOrProvider) {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL;
  return new ethers.Contract(address, skillAbi, signerOrProvider || getProvider());
}

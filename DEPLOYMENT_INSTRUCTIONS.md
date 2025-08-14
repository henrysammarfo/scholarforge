# ScholarForge Deployment Instructions

## 🚀 Complete Blockchain Integration & Deployment Guide

This guide will walk you through deploying the updated ScholarForge project with full blockchain integration, multi-language support, and AI-powered lesson generation.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **MetaMask** or another Web3 wallet
3. **EduChain Testnet** access
4. **OpenAI API Key** (for AI lesson generation)

## 🔧 Environment Setup

### 1. Create Environment File

Copy the `env.template` file to `.env` and fill in your values:

```bash
cp env.template .env
```

### 2. Configure Environment Variables

Edit `.env` with your actual values:

```env
# EduChain Testnet Configuration
EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital
EDUCHAIN_CHAIN_ID=656476
EDUCHAIN_EXPLORER=https://explorer.open-campus-codex.gelato.digital

# Contract Addresses (will be filled after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS_XP=
NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL=
NEXT_PUBLIC_EDUCHAIN_ID=656476
NEXT_PUBLIC_EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital
NEXT_PUBLIC_EDUCHAIN_EXPLORER=https://explorer.open-campus-codex.gelato.digital

# Deployment Account (REQUIRED - your private key for deploying contracts)
ACCOUNT_PRIVATE_KEY=your_private_key_here

# OpenAI Configuration (REQUIRED for AI lesson generation)
OPENAI_API_KEY=your_openai_api_key_here
USE_REAL_AI=true
```

## 🏗️ Smart Contract Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Deploy Contracts to EduChain Testnet

```bash
npx hardhat run scripts/deploy.js --network educhain
```

### 3. Update Environment Variables

After successful deployment, the script will output contract addresses. Update your `.env` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS_XP=0x... # Address from deployment output
NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL=0x... # Address from deployment output
```

### 4. Verify Deployment

Check the `deployment-info.json` file created by the deployment script for all contract details.

## 🌐 Frontend Deployment

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Create Frontend Environment File

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS_XP=0x... # Same as root .env
NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL=0x... # Same as root .env
NEXT_PUBLIC_EDUCHAIN_ID=656476
NEXT_PUBLIC_EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital
NEXT_PUBLIC_EDUCHAIN_EXPLORER=https://explorer.open-campus-codex.gelato.digital
```

### 3. Run Frontend Development Server

```bash
npm run dev
```

## 🔗 Network Configuration

### EduChain Testnet Details

- **Chain ID**: 656476
- **RPC URL**: https://rpc.open-campus-codex.gelato.digital
- **Explorer**: https://explorer.open-campus-codex.gelato.digital
- **Currency**: EDU (18 decimals)

### Adding EduChain to MetaMask

1. Open MetaMask
2. Click "Add Network"
3. Use the details above
4. The app will automatically prompt users to add the network if not present

## 🎯 Key Features Implemented

### 1. **Blockchain Integration**
- ✅ XP Token (ERC20) for rewards
- ✅ Skill NFT (ERC721) for course completion
- ✅ Automatic network detection and switching
- ✅ Real-time balance display
- ✅ Transaction history

### 2. **Multi-Language Support**
- ✅ English, Twi, Yoruba, Swahili, French, Spanish, Hindi
- ✅ Complete UI localization
- ✅ Language-specific content generation
- ✅ Persistent language preferences

### 3. **AI-Powered Lesson Creation**
- ✅ OpenAI integration for lesson generation
- ✅ Multi-language lesson creation
- ✅ Automatic quiz generation
- ✅ African context integration

### 4. **Enhanced Wallet Experience**
- ✅ Real-time balance updates
- ✅ Network status monitoring
- ✅ Automatic network switching
- ✅ Transaction tracking

## 🧪 Testing the Integration

### 1. **Connect Wallet**
- Navigate to `/wallet`
- Connect your MetaMask
- Ensure you're on EduChain testnet

### 2. **Test Language Switching**
- Go to `/learn`
- Select different languages
- Verify UI changes to selected language

### 3. **Test AI Lesson Generation**
- Go to `/create-lesson`
- Select language and enter topic
- Generate lesson with AI
- Verify content is in selected language

### 4. **Test Blockchain Functions**
- Complete a course/quiz
- Verify XP minting
- Check NFT minting for course completion

## 🐛 Troubleshooting

### Common Issues

1. **"Wrong Network" Error**
   - Ensure MetaMask is connected to EduChain testnet
   - Use the network switching button in the wallet

2. **Contract Not Found Errors**
   - Verify contract addresses in `.env` files
   - Ensure contracts were deployed successfully

3. **AI Generation Fails**
   - Check OpenAI API key is valid
   - Verify `USE_REAL_AI=true` in environment

4. **Language Not Changing**
   - Clear browser localStorage
   - Refresh the page after language selection

### Debug Commands

```bash
# Check contract deployment
npx hardhat run scripts/deploy.js --network educhain

# Verify contracts on blockchain
npx hardhat verify --network educhain CONTRACT_ADDRESS

# Check frontend build
cd frontend && npm run build
```

## 📱 Production Deployment

### 1. **Build Frontend**

```bash
cd frontend
npm run build
npm start
```

### 2. **Deploy to Vercel/Netlify**

- Connect your repository
- Set environment variables in deployment platform
- Deploy automatically on git push

### 3. **Verify Production**

- Test all features in production
- Verify blockchain integration works
- Check language switching functionality

## 🔐 Security Notes

1. **Never commit private keys** to version control
2. **Use environment variables** for sensitive data
3. **Test thoroughly** on testnet before mainnet
4. **Monitor contract interactions** for security issues

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure you're on the correct network
4. Check contract deployment status

## 🎉 Success Indicators

Your deployment is successful when:

- ✅ Contracts deploy without errors
- ✅ Frontend connects to EduChain testnet
- ✅ Wallet shows real balances
- ✅ Language switching works throughout the app
- ✅ AI lesson generation works in multiple languages
- ✅ XP and NFT minting functions properly

---

**Happy Learning! 🚀📚**

# 🚀 Deploy ScholarForge to Vercel

## Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)
- Your ScholarForge project pushed to GitHub

## Step 1: Push to GitHub

1. **Initialize git repository** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - ScholarForge platform"
```

2. **Create GitHub repository**:
- Go to https://github.com
- Click "New repository"
- Name it "scholarforge"
- Make it public
- Don't initialize with README (you already have files)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/scholarforge.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project**:
   - Click "New Project"
   - Import your "scholarforge" repository
   - Select the repository

3. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default
   - **Install Command**: `npm install`

4. **Environment Variables**:
   Add these in the Environment Variables section:
   ```
   NEXT_PUBLIC_EDUCHAIN_ID=656476
   NEXT_PUBLIC_EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital
   EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital
   USE_REAL_AI=false
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from frontend directory**:
```bash
cd frontend
vercel
```

4. **Follow prompts**:
   - Link to existing project? **N**
   - Project name: **scholarforge**
   - Directory: **./** (current directory)
   - Override settings? **N**

## Step 3: Configure Environment Variables

After deployment, add environment variables in Vercel dashboard:

1. **Go to your project dashboard** on Vercel
2. **Click Settings** tab
3. **Click Environment Variables**
4. **Add these variables**:

### Required Variables:
```
NEXT_PUBLIC_EDUCHAIN_ID = 656476
NEXT_PUBLIC_EDUCHAIN_RPC_URL = https://rpc.open-campus-codex.gelato.digital
EDUCHAIN_RPC_URL = https://rpc.open-campus-codex.gelato.digital
```

### Smart Contract Addresses (add after deploying contracts):
```
NEXT_PUBLIC_CONTRACT_ADDRESS_XP = your_xp_contract_address
NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL = your_nft_contract_address
```

### Optional AI Configuration:
```
USE_REAL_AI = false
OPENAI_API_KEY = your_openai_key (if you want real AI)
```

## Step 4: Deploy Smart Contracts to EduChain Testnet

1. **Set up environment** (create .env in root):
```
EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital
ACCOUNT_PRIVATE_KEY=your_private_key_here
```

2. **Deploy contracts**:
```bash
cd .. # Go back to root
npx hardhat run scripts/deploy.js --network educhain
```

3. **Update Vercel environment variables** with contract addresses
4. **Redeploy** (automatic when you update env vars)

## Step 5: Custom Domain (Optional)

1. **In Vercel dashboard**:
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Step 6: Verify Deployment

1. **Visit your deployed site**:
   - Vercel will give you a URL like: `https://scholarforge-xyz.vercel.app`

2. **Test functionality**:
   - ✅ Homepage loads
   - ✅ Language selection works
   - ✅ Course content loads
   - ✅ AI lesson generation works
   - ✅ Wallet connection works
   - ✅ Quiz functionality works

## Troubleshooting

### Common Issues:

1. **Build fails**:
   - Check that all dependencies are in package.json
   - Ensure no import errors
   - Check console for specific errors

2. **Environment variables not working**:
   - Make sure variables start with `NEXT_PUBLIC_` for client-side
   - Redeploy after adding env vars

3. **Blockchain not working**:
   - Verify EduChain testnet RPC URL
   - Check contract addresses are correct
   - Ensure wallet has testnet tokens

## Final Deployment URL

Your live ScholarForge platform will be available at:
`https://your-project-name.vercel.app`

## Demo Video Ready! 🎬

Once deployed, you can:
- Share the live URL in your presentation
- Show real-time blockchain transactions
- Demonstrate all features online
- Record your demo video with the live site

## Quick Deploy Commands Summary:

```bash
# From project root
git add .
git commit -m "Ready for deployment"
git push origin main

# Deploy to Vercel
cd frontend
vercel --prod
```

Your ScholarForge platform will be live and ready for your presentation! 🚀

#!/bin/bash

# 🚀 Quick Deploy Script for ScholarForge to Vercel

echo "🚀 Starting ScholarForge deployment to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ]; then
    echo "❌ Error: Run this script from the ScholarForge root directory"
    exit 1
fi

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

# Ensure we're in frontend directory
cd frontend

echo "🔍 Checking project structure..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: No package.json found in frontend directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "🌐 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_EDUCHAIN_ID=656476"
echo "   - NEXT_PUBLIC_EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital"
echo "   - EDUCHAIN_RPC_URL=https://rpc.open-campus-codex.gelato.digital"
echo ""
echo "2. Deploy smart contracts to EduChain testnet"
echo "3. Update contract addresses in Vercel environment variables"
echo ""
echo "🎬 Your ScholarForge platform is now live and ready for demo!"

# ScholarForge Frontend

A modern, responsive web application for ScholarForge - the revolutionary onchain learning platform.

## Features

- 🌍 **Multi-language Support**: Learn in Twi, Yoruba, Swahili, and more
- 🎓 **Interactive Quizzes**: Engaging quiz interface with timer and scoring
- 🏆 **XP Tracking**: Real-time XP display and earning
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Modern UI**: Built with Next.js, Tailwind CSS, and Framer Motion
- 🔗 **Web3 Ready**: Prepared for wallet integration and smart contract interaction

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Web3**: Ethers.js (ready for integration)
- **Language**: TypeScript/JavaScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS_XP=your_xp_token_address
   NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL=your_skill_nft_address
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Pages

### Home (`/`)
- Hero section with project vision
- Feature showcase
- Statistics and call-to-action
- Professional landing page design

### Learn (`/learn`)
- Language selection interface
- Interactive quiz taking
- Real-time scoring and timer
- Quiz completion results

## Components

### Core Components
- **LanguageSelector**: Choose learning language
- **QuizInterface**: Interactive quiz taking
- **Navigation**: Responsive header with wallet status
- **Stats**: XP and NFT display

### UI Components
- **Animated Cards**: Smooth hover effects
- **Progress Indicators**: Quiz progress and timer
- **Buttons**: Consistent styling with hover states
- **Modals**: For future features (wallet connection, etc.)

## Styling

### Design System
- **Colors**: Primary (blue), Secondary (purple), Success (green)
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and micro-interactions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interface

## Web3 Integration (Ready)

The frontend is prepared for Web3 integration:

### Smart Contract Integration
- Contract addresses in environment variables
- Ethers.js ready for wallet connection
- Event listening for real-time updates

### Wallet Features (To Implement)
- MetaMask connection
- Transaction signing
- XP balance display
- NFT gallery

## Development

### File Structure
```
frontend/
├── pages/           # Next.js pages
├── components/      # Reusable components
├── styles/          # Global styles
├── public/          # Static assets
├── utils/           # Utility functions
└── hooks/           # Custom React hooks
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Future Enhancements

- [ ] Wallet integration (MetaMask, WalletConnect)
- [ ] Real-time XP updates from smart contracts
- [ ] NFT gallery and management
- [ ] Leaderboards and social features
- [ ] Offline quiz storage
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Accessibility improvements

---

**Built with ❤️ for ScholarForge - Learn Local, Earn Global** 🌍🎓

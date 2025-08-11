import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { 
  WalletIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  KeyIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { getXPBalance, getSkillNFTCount } from '../utils/blockchain';
import dynamic from 'next/dynamic';

// Client-side only component to prevent SSR issues with Wagmi hooks
const WalletContent = dynamic(() => import('../components/WalletContent'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading wallet...</p>
      </div>
    </div>
  )
});

export default function Wallet() {
  return (
    <>
      <Head>
        <title>Wallet - ScholarForge</title>
      </Head>
      <WalletContent />
    </>
  );
}
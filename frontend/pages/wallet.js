import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount, useSwitchNetwork, useNetwork } from 'wagmi';

export default function Wallet() {
  const { isDark, setIsDark } = useNavigation();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const xp = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_XP;
  const skill = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL;
  const { switchNetwork } = useSwitchNetwork();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Wallet - ScholarForge</title>
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">EduChain Testnet Status</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Make sure you're connected to EduChain Testnet to use onchain features.</p>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="text-gray-600 dark:text-gray-300">Connected: {isConnected ? 'Yes' : 'No'}</div>
            <div className="text-gray-600 dark:text-gray-300">Network: {chain?.name || 'Not connected'}</div>
            <div className="text-gray-600 dark:text-gray-300">Chain ID: {chain?.id ?? '—'}</div>
            <div className="text-gray-600 dark:text-gray-300">XPToken: {xp || '—'}</div>
            <div className="text-gray-600 dark:text-gray-300">SkillNFT: {skill || '—'}</div>
          </div>
          <div className="mt-4">
            <button onClick={() => switchNetwork?.(Number(process.env.NEXT_PUBLIC_EDUCHAIN_ID || '656476'))} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">Switch to EduChain Testnet</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">XP → ScholarForge Token (Plan)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">For the MVP demo, you earn XP. Post-hackathon, XP converts into ScholarForge (SFT) tokens on EduChain via a snapshot-based conversion with anti-abuse rules:</p>
          <ul className="list-disc ml-6 mt-3 text-sm text-gray-700 dark:text-gray-200 space-y-1">
            <li>Snapshot of XP balances per address at T0.</li>
            <li>Convert at a fixed rate (e.g., 1 XP → 1 SFT) up to a per-user cap.</li>
            <li>Sybil resistance via onchain activity checks and allowlist partners.</li>
            <li>Claims open for a limited window; unclaimed go to community pool.</li>
          </ul>
          <div className="mt-4 text-xs text-gray-500">Coming soon.</div>
        </motion.div>
      </div>
    </div>
  );
}

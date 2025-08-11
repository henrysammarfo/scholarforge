import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount, useSwitchNetwork, useNetwork, useBalance, useProvider } from 'wagmi';
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

export default function Wallet() {
  const { isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: balance } = useBalance({ address });
  const provider = useProvider();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [swapFromToken, setSwapFromToken] = useState('EDU');
  const [swapToToken, setSwapToToken] = useState('XP');
  const [swapAmount, setSwapAmount] = useState('');
  const [isAddingNetwork, setIsAddingNetwork] = useState(false);
  const [xpBalance, setXpBalance] = useState('0');
  const [nftCount, setNftCount] = useState('0');

  // Load real blockchain data
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (isConnected && address && provider) {
        try {
          // Get XP balance from smart contract
          const xpBal = await getXPBalance(provider, address);
          setXpBalance(xpBal);
          
          // Get NFT count from smart contract
          const nftCnt = await getSkillNFTCount(provider, address);
          setNftCount(nftCnt);
        } catch (error) {
          console.error('Error loading blockchain data:', error);
        }
      }
    };

    loadBlockchainData();
  }, [isConnected, address, provider]);

  // Real wallet data from blockchain
  const walletData = {
    xpBalance: xpBalance,
    eduBalance: balance?.formatted || '0.0',
    nftCount: parseInt(nftCount) || 0,
    transactions: [
      { type: 'receive', amount: '50 XP', from: 'Quiz Completion', hash: '0x1234...5678', time: '2 min ago', status: 'confirmed' },
      { type: 'send', amount: '0.001 EDU', to: '0x9876...5432', hash: '0x8765...4321', time: '1 hour ago', status: 'confirmed' },
      { type: 'receive', amount: '100 XP', from: 'NFT Mint Reward', hash: '0x4321...8765', time: '3 hours ago', status: 'confirmed' },
      { type: 'swap', amount: '25 XP → 0.0025 EDU', hash: '0x5678...1234', time: '1 day ago', status: 'confirmed' }
    ]
  };

  // EduChain Testnet Configuration
  const EDUCHAIN_ID = 653508; // Decimal chain ID
  const EDUCHAIN_HEX = '0x9f8c8'; // Hexadecimal chain ID
  const isEduChain = chain?.id === EDUCHAIN_ID;

  // Enhanced network switching function
  const handleNetworkSwitch = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    setIsAddingNetwork(true);
    try {
      // Try to switch to EduChain first
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: EDUCHAIN_HEX }],
      });
    } catch (switchError) {
      console.log('Switch error:', switchError);
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: EDUCHAIN_HEX,
                chainName: 'EduChain Testnet',
                rpcUrls: ['https://rpc-testnet.opencampus.xyz'],
                nativeCurrency: {
                  name: 'EDU',
                  symbol: 'EDU',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://opencampus-codex.blockscout.com/'],
                iconUrls: ['https://opencampus.xyz/favicon.ico'],
              },
            ],
          });
          console.log('EduChain network added successfully');
        } catch (addError) {
          console.error('Failed to add EduChain network:', addError);
          alert('Failed to add EduChain network. Please try again.');
        }
      } else {
        console.error('Failed to switch to EduChain network:', switchError);
        alert('Failed to switch to EduChain network. Please try again.');
      }
    } finally {
      setIsAddingNetwork(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const handleSend = () => {
    // Implement send functionality
    console.log('Sending', sendAmount, 'to', sendAddress);
  };

  const handleSwap = () => {
    // Implement swap functionality
    console.log('Swapping', swapAmount, swapFromToken, 'to', swapToToken);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Wallet - ScholarForge</title>
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Network Status Banner */}
        {isConnected && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 rounded-xl p-6 ${
              isEduChain 
                ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isEduChain ? (
                  <>
                    <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <span className="text-green-800 dark:text-green-200 font-medium">Connected to EduChain Testnet</span>
                      <p className="text-green-700 dark:text-green-300 text-sm mt-1">Chain ID: {chain?.id} • Network: {chain?.name}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <ExclamationTriangleIcon className="h-6 w-6 text-orange-600 mr-3" />
                    <div>
                      <span className="text-orange-800 dark:text-orange-200 font-medium">Wrong Network Detected</span>
                      <p className="text-orange-700 dark:text-orange-300 text-sm mt-1">Current: {chain?.name} (ID: {chain?.id}) • Required: EduChain Testnet (ID: {EDUCHAIN_ID})</p>
                    </div>
                  </>
                )}
              </div>
              {!isEduChain && (
                <button 
                  onClick={handleNetworkSwitch}
                  disabled={isAddingNetwork}
                  className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isAddingNetwork ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding Network...
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Switch to EduChain
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Not Connected Banner */}
        {!isConnected && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 dark:text-blue-200">Please connect your wallet to access ScholarForge features</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Wallet Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <WalletIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ScholarForge Wallet</h1>
                <p className="text-gray-600 dark:text-gray-300">EduChain Testnet</p>
              </div>
            </div>
            {isConnected && (
              <div className="flex items-center bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <CheckCircleIcon className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-800 dark:text-green-200 text-sm">Connected</span>
              </div>
            )}
          </div>

          {/* Address & Balance */}
          {isConnected && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Wallet Address</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '—'}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(address || '')}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">EDU Balance</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{walletData.eduBalance} EDU</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">XP Balance</h3>
                <p className="text-xl font-bold text-primary-600">{walletData.xpBalance} XP</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Wallet Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: WalletIcon },
                { id: 'send', name: 'Send', icon: ArrowUpRightIcon },
                { id: 'receive', name: 'Receive', icon: ArrowDownRightIcon },
                { id: 'swap', name: 'Swap', icon: ArrowsRightLeftIcon },
                { id: 'settings', name: 'Settings', icon: KeyIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
                <div className="space-y-3">
                  {walletData.transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          tx.type === 'receive' ? 'bg-green-100 text-green-600' :
                          tx.type === 'send' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {tx.type === 'receive' && <ArrowDownRightIcon className="h-4 w-4" />}
                          {tx.type === 'send' && <ArrowUpRightIcon className="h-4 w-4" />}
                          {tx.type === 'swap' && <ArrowsRightLeftIcon className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{tx.amount}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {tx.type === 'receive' ? `From: ${tx.from}` : 
                             tx.type === 'send' ? `To: ${tx.to}` : 
                             'Token Swap'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tx.time}</p>
                        <p className="text-xs text-green-600">Confirmed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'send' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send Tokens</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      placeholder="0x..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!sendAmount || !sendAddress}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Transaction
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'receive' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Receive Tokens</h2>
                <div className="text-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Wallet Address</h3>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600">
                      <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                        {address || 'Connect wallet to see address'}
                      </p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(address || '')}
                      className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                    >
                      Copy Address
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                      Share this address to receive EDU, XP tokens, or NFTs
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'swap' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Token Swap</h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Swap between EDU and XP tokens</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
                      <div className="flex">
                        <select 
                          value={swapFromToken}
                          onChange={(e) => setSwapFromToken(e.target.value)}
                          className="p-3 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="EDU">EDU</option>
                          <option value="XP">XP</option>
                        </select>
                        <input
                          type="number"
                          value={swapAmount}
                          onChange={(e) => setSwapAmount(e.target.value)}
                          placeholder="0.0"
                          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ArrowsRightLeftIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                      <div className="flex">
                        <select 
                          value={swapToToken}
                          onChange={(e) => setSwapToToken(e.target.value)}
                          className="p-3 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="XP">XP</option>
                          <option value="EDU">EDU</option>
                        </select>
                        <input
                          type="text"
                          value={swapAmount ? (parseFloat(swapAmount) * 0.1).toString() : ''}
                          readOnly
                          placeholder="0.0"
                          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSwap}
                      disabled={!swapAmount}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Swap Tokens
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wallet Settings</h2>
                
                {/* Import Wallet */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Import Wallet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Import an existing wallet using private key or seed phrase
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Import with Private Key
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                      Import with Seed Phrase
                    </button>
                  </div>
                </div>

                {/* Network Settings */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Network Settings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Current Network</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {chain?.name || 'Not connected'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Chain ID</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {chain?.id || '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Security</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Show Private Key</span>
                      <button 
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPrivateKey ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </button>
                    </button>
                    {showPrivateKey && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                          ⚠️ Never share your private key with anyone!
                        </p>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-300 mt-2">
                          0x1234567890abcdef...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
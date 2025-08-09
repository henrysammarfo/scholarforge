import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { 
  AcademicCapIcon, 
  TrophyIcon, 
  UserIcon,
  ChartBarIcon,
  CogIcon,
  BookOpenIcon,
  GlobeAltIcon,
  FireIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { navigateToLearn, isDark, setIsDark, isWalletConnected } = useNavigation();
  const { openConnectModal } = useConnectModal();

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Head>
          <title>Dashboard - ScholarForge</title>
        </Head>
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Connect your wallet to view your dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Track progress, XP, NFTs, and settings after connecting.</p>
          <button onClick={() => openConnectModal && openConnectModal()} className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700">Connect Wallet</button>
        </div>
      </div>
    )
  }

  // Mock user data
  const user = {
    name: "Kwame Asante",
    avatar: "🇬🇭",
    level: 15,
    xp: 1250,
    totalXP: 8500,
    streak: 7,
    languages: ["Twi", "English", "French"],
    nfts: 3,
    quizzesCompleted: 24,
    accuracy: 87
  };

  const recentActivity = [
    { type: 'quiz', title: 'Ghanaian History Quiz', language: 'Twi', xp: 50, date: '2 hours ago' },
    { type: 'nft', title: 'Language Hero: Twi', language: 'Twi', xp: 100, date: '1 day ago' },
    { type: 'quiz', title: 'Crypto Basics', language: 'English', xp: 30, date: '2 days ago' },
    { type: 'quiz', title: 'Nigerian Culture', language: 'Yoruba', xp: 45, date: '3 days ago' }
  ];

  const learningStats = [
    { label: 'Languages', value: user.languages.length, icon: GlobeAltIcon, color: 'primary' },
    { label: 'Quizzes Completed', value: user.quizzesCompleted, icon: CheckCircleIcon, color: 'success' },
    { label: 'Current Streak', value: user.streak, icon: FireIcon, color: 'secondary' },
    { label: 'Accuracy', value: `${user.accuracy}%`, icon: StarIcon, color: 'success' }
  ];

  const nfts = [
    { id: 1, name: 'Language Hero: Twi', image: '🏆', rarity: 'Legendary' },
    { id: 2, name: 'Math Master', image: '📐', rarity: 'Rare' },
    { id: 3, name: 'Cultural Explorer', image: '🌍', rarity: 'Common' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Dashboard - ScholarForge</title>
        <meta name="description" content="Your learning dashboard and progress" />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{user.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-gray-600 dark:text-gray-300">Level {user.level} Scholar</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Languages:</span>
                  {user.languages.map((lang, index) => (
                    <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">{user.xp.toLocaleString()}</div>
              <div className="text-gray-600 dark:text-gray-300">Total XP</div>
              <div className="mt-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${(user.xp / user.totalXP) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {user.xp.toLocaleString()} / {user.totalXP.toLocaleString()} XP
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={navigateToLearn} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Start Learning
            </button>
            <button className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg">
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white dark:bg-gray-900 rounded-lg p-1 mb-8">
          {['overview', 'progress', 'nfts', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'quiz' ? 'bg-primary-100' : 'bg-secondary-100'
                      }`}>
                        {activity.type === 'quiz' ? (
                          <BookOpenIcon className="h-5 w-5 text-primary-600" />
                        ) : (
                          <TrophyIcon className="h-5 w-5 text-secondary-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.language} • {activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success-600">+{activity.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Language Progress */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Language Progress</h2>
              <div className="space-y-4">
                {user.languages.map((language, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{language}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">75% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Progress */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Topic Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Ghanaian History', 'Nigerian Culture', 'Crypto Basics', 'African Cuisine', 'Sports', 'Science'].map((topic, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{topic}</h3>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-success-600 h-2 rounded-full" 
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">60%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'nfts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your NFTs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                  <div key={nft.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">{nft.image}</div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{nft.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      nft.rarity === 'Legendary' ? 'bg-yellow-100 text-yellow-800' :
                      nft.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {nft.rarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Switch between light and dark</p>
                  </div>
                  <button onClick={() => setIsDark(!isDark)} className="text-primary-600 hover:text-primary-700">Toggle</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Notification Preferences</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Manage your learning reminders</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">Configure</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Privacy Settings</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Control your data and visibility</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">Configure</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Language Preferences</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Set your preferred learning languages</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">Configure</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

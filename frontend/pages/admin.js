import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount } from 'wagmi';
import { walletProfileManager } from '../utils/walletProfileManager';
import { enhancedLessonManager } from '../utils/enhancedLessonManager';
import { 
  UserGroupIcon,
  BookOpenIcon,
  TrophyIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Admin wallet addresses loaded from environment variables for security
const ADMIN_WALLETS = process.env.NEXT_PUBLIC_ADMIN_WALLETS 
  ? process.env.NEXT_PUBLIC_ADMIN_WALLETS.split(',').map(addr => addr.trim())
  : [];

// Debug log for admin configuration
console.log('🔍 Admin Configuration:', {
  envVar: process.env.NEXT_PUBLIC_ADMIN_WALLETS,
  adminWallets: ADMIN_WALLETS,
  isClient: typeof window !== 'undefined'
});

export default function AdminDashboard() {
  const { isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('overview');
  const [allProfiles, setAllProfiles] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [communityFeed, setCommunityFeed] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current wallet is admin
  useEffect(() => {
    if (address && isConnected) {
      console.log('🔍 Admin Check:', { 
        address, 
        adminWallets: ADMIN_WALLETS,
        isAdmin: ADMIN_WALLETS.includes(address.toLowerCase())
      });
      
      const adminStatus = ADMIN_WALLETS.includes(address.toLowerCase());
      setIsAdmin(adminStatus);
      
      if (adminStatus) {
        loadAdminData();
      }
    }
  }, [address, isConnected]);

  const loadAdminData = () => {
    // Load all profiles
    const profiles = walletProfileManager.getAllProfiles();
    setAllProfiles(profiles);
    
    // Load all lessons and quizzes
    const lessons = enhancedLessonManager.getAllLessons();
    const quizzes = enhancedLessonManager.getAllQuizzes();
    setAllLessons(Object.values(lessons));
    setAllQuizzes(Object.values(quizzes));
    
    // Load community feed
    const feed = enhancedLessonManager.getCommunityFeed();
    setCommunityFeed(feed);
  };

  // Access control - only admins can view this page
  if (!address || !isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Admin Access Required
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Please connect your wallet to access the admin dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              This wallet does not have admin privileges
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stats = {
    totalUsers: allProfiles.length,
    totalLessons: allLessons.length,
    totalQuizzes: allQuizzes.length,
    totalContent: communityFeed.length,
    activeUsers: allProfiles.filter(p => p.stats.totalXP > 0).length,
    totalXP: allProfiles.reduce((sum, p) => sum + p.stats.totalXP, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Admin Dashboard - ScholarForge</title>
        <meta name="description" content="ScholarForge admin dashboard" />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage ScholarForge platform and community
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg">
                <BookOpenIcon className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Content</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalContent}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total XP</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalXP.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Admin Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: ChartBarIcon },
                { id: 'users', name: 'User Management', icon: UserGroupIcon },
                { id: 'content', name: 'Content Management', icon: BookOpenIcon },
                { id: 'settings', name: 'Settings', icon: CogIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Platform Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Users */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Users</h3>
                    <div className="space-y-2">
                      {allProfiles.slice(0, 5).map((profile) => (
                        <div key={profile.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">
                            {profile.name} ({profile.walletAddress.slice(0, 6)}...)
                          </span>
                          <span className="text-primary-600 font-medium">{profile.stats.totalXP} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Content */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Content</h3>
                    <div className="space-y-2">
                      {communityFeed.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">
                            {item.title} ({item.type})
                          </span>
                          <span className="text-gray-500">{item.creatorName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">User Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Wallet
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          XP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {allProfiles.map((profile) => (
                        <tr key={profile.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-2xl mr-3">{profile.avatar}</div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {profile.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {profile.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {profile.stats.totalXP.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {profile.stats.currentLevel}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Content Management Tab */}
            {activeTab === 'content' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Content Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lessons */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Lessons ({allLessons.length})</h3>
                      <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700">
                        <PlusIcon className="h-4 w-4 mr-1 inline" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {allLessons.slice(0, 5).map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300 truncate">
                            {lesson.title}
                          </span>
                          <div className="flex space-x-1">
                            <button className="text-blue-600 hover:text-blue-800">
                              <EyeIcon className="h-3 w-3" />
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-800">
                              <PencilIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quizzes */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Quizzes ({allQuizzes.length})</h3>
                      <button className="bg-secondary-600 text-white px-3 py-1 rounded text-sm hover:bg-secondary-700">
                        <PlusIcon className="h-4 w-4 mr-1 inline" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {allQuizzes.slice(0, 5).map((quiz) => (
                        <div key={quiz.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300 truncate">
                            {quiz.title}
                          </span>
                          <div className="flex space-x-1">
                            <button className="text-blue-600 hover:text-blue-800">
                              <EyeIcon className="h-3 w-3" />
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-800">
                              <PencilIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Admin Settings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Platform Settings */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Platform Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Maintenance Mode</span>
                        <button className="bg-gray-300 dark:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                          Disabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">New User Registration</span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Enabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Content Moderation</span>
                        <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                          Manual
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Admin Access</span>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {ADMIN_WALLETS.length} wallets
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Session Timeout</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">24 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">2FA Required</span>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                          Disabled
                        </button>
                      </div>
                    </div>
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

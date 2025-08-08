import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useNavigation } from './_app';
import { 
  AcademicCapIcon, 
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  PlusIcon,
  FireIcon,
  GlobeAltIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

export default function Community() {
  const { navigateToCreate, navigateToDashboard, navigateHome } = useNavigation();
  const [activeTab, setActiveTab] = useState('discussions');

  // Mock community data
  const discussions = [
    {
      id: 1,
      title: "Best resources for learning Twi grammar?",
      author: "KwameGH",
      avatar: "🇬🇭",
      language: "Twi",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      content: "I'm struggling with Twi verb conjugations. Any recommendations for good resources or courses?",
      tags: ["grammar", "twi", "help"]
    },
    {
      id: 2,
      title: "Yoruba cultural expressions quiz - feedback wanted!",
      author: "AishaNG",
      avatar: "🇳🇬",
      language: "Yoruba",
      replies: 12,
      likes: 31,
      timeAgo: "5 hours ago",
      content: "Created a quiz about traditional Yoruba greetings and expressions. Would love community feedback!",
      tags: ["yoruba", "culture", "quiz", "feedback"]
    },
    {
      id: 3,
      title: "How crypto education can empower African youth",
      author: "BlockchainAfrica",
      avatar: "₿",
      language: "English",
      replies: 56,
      likes: 89,
      timeAgo: "1 day ago",
      content: "Let's discuss how blockchain and crypto education can create opportunities for young Africans...",
      tags: ["crypto", "education", "africa", "blockchain"]
    }
  ];

  const leaderboard = [
    { rank: 1, name: "TwiMaster", avatar: "🇬🇭", xp: 2500, contributions: 45, language: "Twi" },
    { rank: 2, name: "YorubaQueen", avatar: "🇳🇬", xp: 2200, contributions: 38, language: "Yoruba" },
    { rank: 3, name: "SwahiliScholar", avatar: "🇰🇪", xp: 1980, contributions: 42, language: "Swahili" },
    { rank: 4, name: "CryptoTeacher", avatar: "₿", xp: 1750, contributions: 29, language: "English" },
    { rank: 5, name: "CultureKeeper", avatar: "🌍", xp: 1650, contributions: 35, language: "French" }
  ];

  const communityQuizzes = [
    {
      id: 1,
      title: "Ghanaian Independence History",
      creator: "HistoryBuff",
      language: "English",
      difficulty: "Intermediate",
      takes: 234,
      rating: 4.8,
      xpReward: 75
    },
    {
      id: 2,
      title: "Traditional Yoruba Proverbs",
      creator: "ProverbMaster",
      language: "Yoruba",
      difficulty: "Advanced",
      takes: 156,
      rating: 4.9,
      xpReward: 100
    },
    {
      id: 3,
      title: "DeFi Basics for Beginners",
      creator: "DeFiGuru",
      language: "English", 
      difficulty: "Beginner",
      takes: 567,
      rating: 4.7,
      xpReward: 50
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Head>
        <title>Community - ScholarForge</title>
        <meta name="description" content="Connect with learners, share knowledge, and contribute to the ScholarForge community" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={navigateHome}>
                <AcademicCapIcon className="h-8 w-8 text-primary-600" />
              </button>
              <span className="ml-2 text-xl font-bold text-gray-900">ScholarForge</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={navigateToDashboard} className="text-gray-600 hover:text-gray-900">Dashboard</button>
              <button 
                onClick={navigateToCreate}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow learners, share knowledge, and build the future of African education together.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1">
            {['discussions', 'leaderboard', 'quizzes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'discussions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
                  <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New Discussion
                  </button>
                </div>

                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{discussion.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{discussion.author}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{discussion.language}</span>
                            <span>•</span>
                            <span>{discussion.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {discussion.tags.map((tag, index) => (
                          <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{discussion.title}</h4>
                    <p className="text-gray-700 mb-4">{discussion.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                          <HeartIcon className="h-4 w-4" />
                          <span className="text-sm">{discussion.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                          <ChatBubbleLeftRightIcon className="h-4 w-4" />
                          <span className="text-sm">{discussion.replies}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                          <ShareIcon className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Join Discussion →
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Leaderboard</h2>
                
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          user.rank === 1 ? 'bg-yellow-500' :
                          user.rank === 2 ? 'bg-gray-400' :
                          user.rank === 3 ? 'bg-yellow-600' : 'bg-gray-300'
                        }`}>
                          {user.rank}
                        </div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.language} Expert</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary-600">{user.xp.toLocaleString()} XP</div>
                        <div className="text-sm text-gray-600">{user.contributions} contributions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'quizzes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Community Quizzes</h2>
                  <button 
                    onClick={navigateToCreate}
                    className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Quiz
                  </button>
                </div>

                {communityQuizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 text-sm">Created by {quiz.creator}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-500 mb-1">
                          <StarIcon className="h-4 w-4 mr-1" />
                          <span className="font-medium">{quiz.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">{quiz.takes} takes</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                          {quiz.language}
                        </span>
                        <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs">
                          {quiz.difficulty}
                        </span>
                        <span className="bg-success-100 text-success-800 px-2 py-1 rounded-full text-xs">
                          +{quiz.xpReward} XP
                        </span>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Take Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Learners</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Community Quizzes</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">XP Distributed</span>
                    <span className="font-semibold">500K+</span>
                  </div>
                </div>
              </motion.div>

              {/* Popular Languages */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">Popular Languages</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🇺🇸</span>
                      <span>English</span>
                    </div>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🇬🇭</span>
                      <span>Twi</span>
                    </div>
                    <span className="text-sm text-gray-600">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🇳🇬</span>
                      <span>Yoruba</span>
                    </div>
                    <span className="text-sm text-gray-600">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🇰🇪</span>
                      <span>Swahili</span>
                    </div>
                    <span className="text-sm text-gray-600">12%</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={navigateToCreate}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Quiz
                  </button>
                  <button className="w-full bg-secondary-600 text-white py-2 px-4 rounded-lg hover:bg-secondary-700 transition-colors flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                    Start Discussion
                  </button>
                  <button className="w-full bg-success-600 text-white py-2 px-4 rounded-lg hover:bg-success-700 transition-colors flex items-center justify-center">
                    <GlobeAltIcon className="h-4 w-4 mr-2" />
                    Translate Content
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

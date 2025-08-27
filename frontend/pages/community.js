import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount } from 'wagmi';
import { enhancedLessonManager } from '../utils/enhancedLessonManager';
import { walletProfileManager } from '../utils/walletProfileManager';
import { 
  AcademicCapIcon, 
  UserGroupIcon,
  UserIcon,
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
  const { navigateToCreate, navigateToDashboard, navigateHome, isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('discussions');
  const [communityFeed, setCommunityFeed] = useState([]);
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Load community feed from enhanced lesson manager
  useEffect(() => {
    const loadCommunityFeed = () => {
      const feed = enhancedLessonManager.getCommunityFeed();
      setCommunityFeed(feed);
      setFilteredFeed(feed);
    };

    loadCommunityFeed();
    
    // Refresh feed every 5 seconds for real-time updates
    const interval = setInterval(loadCommunityFeed, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter community feed based on selections
  useEffect(() => {
    let filtered = communityFeed;
    
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(item => item.language === selectedLanguage);
    }
    
    if (selectedTopic !== 'all') {
      filtered = filtered.filter(item => item.topic === selectedTopic);
    }
    
    setFilteredFeed(filtered);
  }, [communityFeed, selectedLanguage, selectedTopic]);

  // Get available languages and topics from feed
  const availableLanguages = ['all', ...new Set(communityFeed.map(item => item.language))];
  const availableTopics = ['all', ...new Set(communityFeed.map(item => item.topic))];

  // Search profiles by username or display name
  const searchProfiles = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const profiles = walletProfileManager.getAllProfiles();
      const results = profiles.filter(profile => {
        const name = profile.name?.toLowerCase() || '';
        const username = profile.username?.toLowerCase() || '';
        const displayName = profile.displayName?.toLowerCase() || '';
        const searchTerm = query.toLowerCase();
        
        return name.includes(searchTerm) || 
               username.includes(searchTerm) || 
               displayName.includes(searchTerm);
      }).slice(0, 10);
      
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching profiles:', error);
      setSearchResults([]);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchProfiles(query);
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  // Generate real leaderboard from actual user profiles
  const generateRealLeaderboard = () => {
    try {
      const profiles = walletProfileManager.getAllProfiles();
      const sortedProfiles = profiles
        .filter(profile => profile.stats?.totalXP > 0)
        .sort((a, b) => (b.stats?.totalXP || 0) - (a.stats?.totalXP || 0))
        .slice(0, 10);
      
      return sortedProfiles.map((profile, index) => ({
        rank: index + 1,
        name: profile.name || `Scholar_${profile.walletAddress?.slice(2, 8)}`,
        avatar: profile.avatar || '🎓',
        xp: profile.stats?.totalXP || 0,
        contributions: (profile.stats?.quizzesCompleted || 0) + (profile.stats?.lessonsCompleted || 0),
        language: profile.learningProgress?.[0]?.language || 'English',
        walletAddress: profile.walletAddress
      }));
    } catch (error) {
      console.error('Error generating leaderboard:', error);
      return [];
    }
  };

  const leaderboard = generateRealLeaderboard();

  // Get real community quizzes from enhanced lesson manager
  const getRealCommunityQuizzes = () => {
    try {
      const feed = enhancedLessonManager.getCommunityFeed();
      return feed
        .filter(item => item.type === 'quiz')
        .slice(0, 10)
        .map(quiz => ({
          id: quiz.id,
          title: quiz.title,
          creator: quiz.creatorName,
          language: quiz.language,
          difficulty: quiz.difficulty || 'Beginner',
          takes: quiz.attempts || 0,
          rating: quiz.averageScore || 0,
          xpReward: quiz.xpReward || 50,
          createdAt: quiz.createdAt
        }));
    } catch (error) {
      console.error('Error getting community quizzes:', error);
      return [];
    }
  };

  const communityQuizzes = getRealCommunityQuizzes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Community - ScholarForge</title>
        <meta name="description" content="Connect with learners, share knowledge, and contribute to the ScholarForge community" />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Community Hub</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Connect with fellow learners, share knowledge, and build the future of African education together.
          </p>
          
          {/* Profile Search */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search profiles by username..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.map((profile) => (
                  <div
                    key={profile.walletAddress}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                    onClick={() => {
                      // Navigate to profile view
                      window.location.href = `/profile/${profile.walletAddress}`;
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{profile.avatar || '🎓'}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {profile.name || profile.displayName || `Scholar_${profile.walletAddress?.slice(2, 8)}`}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Level {profile.stats?.currentLevel || 1} • {profile.stats?.totalXP || 0} XP
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white dark:bg-gray-900 rounded-lg p-1">
            {['discussions', 'leaderboard', 'quizzes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Feed</h2>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => navigateToCreate()}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Lesson
                    </button>
                    <button 
                      onClick={() => navigateToCreateQuiz()}
                      className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center"
                    >
                    <PlusIcon className="h-4 w-4 mr-2" />
                      Create Quiz
                  </button>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Language:</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    >
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>
                          {lang === 'all' ? 'All Languages' : lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic:</label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    >
                      {availableTopics.map(topic => (
                        <option key={topic} value={topic}>
                          {topic === 'all' ? 'All Topics' : topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredFeed.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No content yet</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Be the first to create a lesson or quiz!</p>
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => navigateToCreate()}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Create Your First Lesson
                      </button>
                      <button 
                        onClick={() => navigateToCreateQuiz()}
                        className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors"
                      >
                        Create Your First Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredFeed.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {item.type === 'quiz' ? '🧠' : '📚'}
                          </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.creatorName}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                              <span>{item.language}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(item.createdAt)}</span>
                            <span>•</span>
                              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                                {item.type === 'quiz' ? 'Quiz' : 'Lesson'}
                              </span>
                          </div>
                        </div>
                      </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{item.difficulty}</div>
                          {item.xpReward > 0 && (
                            <div className="text-sm text-green-600 font-medium">+{item.xpReward} XP</div>
                          )}
                      </div>
                    </div>

                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500">
                          <HeartIcon className="h-4 w-4" />
                            <span className="text-sm">{item.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                            <BookOpenIcon className="h-4 w-4" />
                            <span className="text-sm">{item.views}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-500">
                          <ShareIcon className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                        <button 
                          onClick={() => {
                            if (item.type === 'quiz') {
                              // Navigate to quiz page with quiz ID
                              window.location.href = `/quiz?id=${item.id}`;
                            } else {
                              // Navigate to course page with lesson data
                              localStorage.setItem('sf_selected_topic_id', item.topic?.toLowerCase() || 'culture');
                              localStorage.setItem('sf_selected_topic_name', item.topic || 'Cultural Studies');
                              localStorage.setItem('sf_selected_language_code', item.language?.toLowerCase() || 'en');
                              localStorage.setItem('sf_selected_language_name', item.language || 'English');
                              window.location.href = '/course';
                            }
                          }}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          {item.type === 'quiz' ? 'Take Quiz →' : 'Start Learning →'}
                      </button>
                    </div>
                  </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Leaderboard</h2>
                
                                 <div className="space-y-4">
                   {leaderboard.map((user) => (
                     <div 
                       key={user.rank} 
                       className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-transparent hover:border-primary-600 cursor-pointer transition-all duration-200"
                       onClick={() => {
                         if (user.walletAddress) {
                           window.location.href = `/profile/${user.walletAddress}`;
                         }
                       }}
                     >
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
                           <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                           <p className="text-sm text-gray-600 dark:text-gray-300">{user.language} Expert</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="font-bold text-primary-600">{user.xp.toLocaleString()} XP</div>
                         <div className="text-sm text-gray-600 dark:text-gray-300">{user.contributions} contributions</div>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Quizzes</h2>
                  <button 
                    onClick={navigateToCreate}
                    className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Quiz
                  </button>
                </div>

                {communityQuizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Created by {quiz.creator}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-500 mb-1">
                          <StarIcon className="h-4 w-4 mr-1" />
                          <span className="font-medium">{quiz.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{quiz.takes} takes</div>
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
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Community Stats</h3>
                <div className="space-y-3">
                                      <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Active Learners</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(() => {
                          const profiles = walletProfileManager.getAllProfiles();
                          const activeProfiles = profiles.filter(profile => 
                            new Date(profile.stats?.lastActivityDate || 0) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                          );
                          return activeProfiles.length;
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Languages</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(() => {
                          const feed = enhancedLessonManager.getCommunityFeed();
                          const languages = new Set(feed.map(item => item.language));
                          return languages.size;
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Community Quizzes</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(() => {
                          const feed = enhancedLessonManager.getCommunityFeed();
                          return feed.filter(item => item.type === 'quiz').length;
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Content</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(() => {
                          const feed = enhancedLessonManager.getCommunityFeed();
                          return feed.length;
                        })()}
                      </span>
                    </div>
                </div>
              </motion.div>

              {/* Popular Languages */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6"
              >
                                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Popular Languages</h3>
                  <div className="space-y-3">
                    {(() => {
                      const feed = enhancedLessonManager.getCommunityFeed();
                      const languageCounts = {};
                      feed.forEach(item => {
                        languageCounts[item.language] = (languageCounts[item.language] || 0) + 1;
                      });
                      
                      const sortedLanguages = Object.entries(languageCounts)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 4);
                      
                      return sortedLanguages.map(([language, count]) => {
                        const percentage = feed.length > 0 ? Math.round((count / feed.length) * 100) : 0;
                        const flag = {
                          'English': '🇺🇸',
                          'Twi': '🇬🇭',
                          'Yoruba': '🇳🇬',
                          'Swahili': '🇰🇪',
                          'French': '🇫🇷',
                          'Spanish': '🇪🇸',
                          'Hindi': '🇮🇳',
                          'Arabic': '🇸🇦',
                          'Chinese': '🇨🇳',
                          'Portuguese': '🇵🇹'
                        }[language] || '🌍';
                        
                        return (
                          <div key={language} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{flag}</span>
                              <span className="text-gray-900 dark:text-white">{language}</span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{percentage}%</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
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

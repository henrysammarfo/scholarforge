import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount } from 'wagmi';
import { walletProfileManager } from '../utils/walletProfileManager';
import { enhancedLessonManager } from '../utils/enhancedLessonManager';
import {
  GlobeAltIcon,
  FireIcon,
  StarIcon,
  CheckCircleIcon,
  BookOpenIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { navigateToLearn, isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();

  const [user, setUser] = useState(null);
  const [skillNFTs, setSkillNFTs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [userLessons, setUserLessons] = useState([]);

  // Load wallet profile when wallet connects
  useEffect(() => {
    if (address && isConnected) {
      loadWalletProfile();
    }
  }, [address, isConnected]);

  const loadWalletProfile = () => {
    if (!address) return;

    // Get or create profile for this wallet
    const profile = walletProfileManager.getOrCreateProfile(address);
    
    if (profile) {
      setUser({
        name: profile.name,
        avatar: profile.avatar,
        level: profile.stats.currentLevel,
        xp: profile.stats.totalXP,
        totalXP: profile.stats.totalXP,
        streak: profile.stats.currentStreak,
        languages: profile.learningProgress.map(lang => lang.language),
        nfts: profile.skillNFTs.length,
        quizzesCompleted: profile.stats.quizzesCompleted,
        accuracy: profile.stats.accuracy || 0
      });

      setSkillNFTs(profile.skillNFTs);
      // Get real-time activity from profile
      const realRecentActivity = [];
      
      if (profile.recentActivity && profile.recentActivity.length > 0) {
        profile.recentActivity.slice(0, 5).forEach(activity => {
          switch (activity.type) {
            case 'quiz_completed':
              realRecentActivity.push({
                type: "quiz",
                title: `Completed Quiz`,
                xp: activity.data.xpEarned || 50,
                date: new Date(activity.timestamp).toLocaleDateString(),
                language: activity.data.language || 'English'
              });
              break;
            case 'lesson_completed':
              realRecentActivity.push({
                type: "course",
                title: `Completed Lesson`,
                xp: activity.data.xpEarned || 25,
                date: new Date(activity.timestamp).toLocaleDateString(),
                language: activity.data.language || 'English'
              });
              break;
            case 'xp_gained':
              realRecentActivity.push({
                type: "xp",
                title: `Gained ${activity.data.xp} XP`,
                xp: activity.data.xp,
                date: new Date(activity.timestamp).toLocaleDateString(),
                language: "Level Up!"
              });
              break;
          }
        });
      }
      
      // If no real activity, show placeholder
      if (realRecentActivity.length === 0) {
        realRecentActivity.push({
          type: "quiz",
          title: "No recent activity",
          xp: 0,
          date: "Start learning to see activity here",
          language: "English"
        });
      }
      
      setRecentActivity(realRecentActivity);
      
      // Load user's created lessons
      const lessons = enhancedLessonManager.getUserLessons(address);
      setUserLessons(lessons);
    }
  };

  // Real-time updates when wallet profile changes
  useEffect(() => {
    if (!address || !isConnected) return;

    const handleProfileUpdate = () => {
      loadWalletProfile();
    };

    // Check for profile updates every 2 seconds for real-time feel
    const interval = setInterval(handleProfileUpdate, 2000);
    
    // Also listen for storage changes (when quizzes/lessons are completed)
    const handleStorageChange = (e) => {
      if (e.key && (e.key.includes('quiz') || e.key.includes('lesson') || e.key.includes('xp'))) {
        loadWalletProfile();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [address, isConnected]);

  // Show loading state when wallet not connected
  if (!address || !isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to ScholarForge
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Connect your wallet to access your personalized learning dashboard
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-gray-600 dark:text-gray-300">
                Your learning journey starts here. Connect your wallet to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state when profile not loaded
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate learning stats based on current user data
  const getLearningStats = () => {
    if (!user) return [];
    
    return [
      { label: 'Languages', value: user.languages?.length || 0, icon: GlobeAltIcon, color: 'primary' },
      { label: 'Quizzes Completed', value: user.quizzesCompleted || 0, icon: CheckCircleIcon, color: 'success' },
      { label: 'Current Streak', value: user.streak || 0, icon: FireIcon, color: 'secondary' },
      { label: 'Accuracy', value: `${user.accuracy || 0}%`, icon: StarIcon, color: 'success' }
    ];
  };

  // Generate achievements based on actual user progress
  const generateAchievements = () => {
    const achievements = [];
    
    // First Quiz Completed
    if (user.quizzesCompleted >= 1) {
      achievements.push({
        id: 1,
        title: "First Quiz Completed",
        description: "Completed your first quiz",
        icon: "🎯",
        earned: true,
        date: new Date().toLocaleDateString()
      });
    }
    
    // Week Warrior (7-day streak)
    if (user.streak >= 7) {
      achievements.push({
        id: 2,
        title: "Week Warrior",
        description: "7-day learning streak",
        icon: "🔥",
        earned: true,
        date: new Date().toLocaleDateString()
      });
    }
    
    // Language Explorer (learned multiple languages)
    if (user.languages.length >= 2) {
      achievements.push({
        id: 3,
        title: "Language Explorer",
        description: `Learned ${user.languages.length} languages`,
        icon: "🌍",
        earned: true,
        date: new Date().toLocaleDateString()
      });
    }
    
    // XP Milestone
    if (user.xp >= 1000) {
      achievements.push({
        id: 4,
        title: "XP Master",
        description: "Earned 1000+ XP",
        icon: "⭐",
        earned: true,
        date: new Date().toLocaleDateString()
      });
    }
    
    // Level Achiever
    if (user.level >= 5) {
      achievements.push({
        id: 5,
        title: "Level Achiever",
        description: `Reached level ${user.level}`,
        icon: "🏆",
        earned: true,
        date: new Date().toLocaleDateString()
      });
    }
    
    // Add unearned achievements for motivation
    if (user.quizzesCompleted < 5) {
      achievements.push({
        id: 6,
        title: "Quiz Enthusiast",
        description: "Complete 5 quizzes",
        icon: "📚",
        earned: false,
        date: null
      });
    }
    
    if (user.streak < 30) {
      achievements.push({
        id: 7,
        title: "Monthly Master",
        description: "30-day learning streak",
        icon: "📅",
        earned: false,
        date: null
      });
    }
    
    return achievements;
  };

  const achievements = generateAchievements();



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
            <button 
              onClick={() => window.location.href = '/profile'}
              className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
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

        {/* Blockchain status */}


        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getLearningStats().map((stat, index) => (
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
                {user.languages.map((language, index) => {
                  // Get real progress from wallet profile
                  const profile = walletProfileManager.getProfile(address);
                  const langProgress = profile?.learningProgress?.find(l => l.language === language);
                  const languageXP = langProgress?.xp || 0;
                  const languageQuizzes = langProgress?.quizzesCompleted || 0;
                  const languageLessons = langProgress?.lessonsCompleted || 0;
                  const totalActivities = languageQuizzes + languageLessons;
                  const progress = totalActivities > 0 ? Math.min(100, (languageXP / (totalActivities * 50)) * 100) : 0;
                  
                  return (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{language}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round(progress)}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{languageXP} XP</span>
                        <span>{totalActivities} activities</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Achievements</h2>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 border rounded-lg ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20' 
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            achievement.earned 
                              ? 'text-green-900 dark:text-green-100' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm ${
                            achievement.earned 
                              ? 'text-green-700 dark:text-green-200' 
                              : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                              Earned: {achievement.date}
                            </p>
                          )}
                        </div>
                        {achievement.earned && (
                          <div className="text-green-500">
                            <CheckCircleIcon className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-gray-600 dark:text-gray-300">No achievements yet. Start learning to earn your first badge!</p>
                </div>
              )}
            </div>

            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
              {(() => {
                const activities = [];
                
                // Get recent quiz completions
                const completedQuizzes = user.completedQuizzes || [];
                completedQuizzes.slice(0, 5).forEach(quiz => {
                  activities.push({
                    type: 'quiz',
                    icon: '🎯',
                    title: `Completed ${quiz.topic} Quiz`,
                    description: `Earned ${quiz.xpEarned} XP`,
                    time: new Date(quiz.completedAt).toLocaleDateString(),
                    color: 'text-green-600'
                  });
                });
                
                // Get recent lesson completions
                const completedLessons = user.completedLessons || [];
                completedLessons.slice(0, 5).forEach(lesson => {
                  activities.push({
                    type: 'lesson',
                    icon: '📚',
                    title: `Completed ${lesson.topic} Lesson`,
                    description: `Earned ${lesson.xpEarned} XP`,
                    time: new Date(lesson.completedAt).toLocaleDateString(),
                    color: 'text-blue-600'
                  });
                });
                
                // Get recent XP gains
                if (user.xp > 0) {
                  activities.push({
                    type: 'xp',
                    icon: '⭐',
                    title: 'XP Milestone Reached',
                    description: `Total XP: ${user.xp.toLocaleString()}`,
                    time: 'Today',
                    color: 'text-yellow-600'
                  });
                }
                
                // Sort by time (most recent first)
                activities.sort((a, b) => new Date(b.time) - new Date(a.time));
                
                return activities.length > 0 ? (
                  <div className="space-y-3">
                    {activities.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-gray-600 dark:text-gray-300">No activities yet. Start learning to see your progress!</p>
                  </div>
                );
              })()}
            </div>

            {/* Language Learning Progress */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Language Learning Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['English', 'Twi', 'Yoruba', 'Swahili', 'French', 'Spanish', 'Hindi', 'Arabic', 'Chinese', 'Portuguese'].map((language) => {
                  const profile = walletProfileManager.getProfile(address);
                  const langProgress = profile?.learningProgress?.find(l => l.language === language);
                  const langXP = langProgress?.xp || 0;
                  const langLessons = langProgress?.lessonsCompleted || 0;
                  const progress = langLessons > 0 ? Math.min(100, (langXP / (langLessons * 50)) * 100) : 0;
                  
                  const flags = {
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
                  };
                  
                  return (
                    <div key={language} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">{flags[language]}</span>
                        <h3 className="font-medium text-gray-900 dark:text-white">{language}</h3>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{langXP} XP</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{langLessons} lessons</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round(progress)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Topic Progress */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Topic Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['culture', 'crypto', 'food', 'technology', 'business', 'health', 'environment'].map((topicId) => {
                  const topicNames = {
                    culture: 'Cultural Studies',
                    crypto: 'Cryptocurrency',
                    food: 'African Cuisine',
                    technology: 'Modern Technology',
                    business: 'Business & Entrepreneurship',
                    health: 'Health & Wellness',
                    environment: 'Environmental Science'
                  };
                  
                  // Get real progress from user profile
                  const profile = walletProfileManager.getProfile(address);
                  const topicProgress = profile?.topicProgress?.find(t => t.topic === topicId);
                  const topicXP = topicProgress?.xp || 0;
                  const topicQuizzes = topicProgress?.quizzesCompleted || 0;
                  const topicLessons = topicProgress?.lessonsCompleted || 0;
                  const totalActivities = topicQuizzes + topicLessons;
                  const progress = totalActivities > 0 ? Math.min(100, (topicXP / (totalActivities * 50)) * 100) : 0;
                  
                  return (
                    <div key={topicId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{topicNames[topicId]}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{topicXP} XP</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{totalActivities} activities</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-success-600 h-2 rounded-full" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round(progress)}%</span>
                      </div>
                    </div>
                  );
                })}
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Skill NFTs</h2>
              
              {skillNFTs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillNFTs.map((nft, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
                      <div className="text-center">
                        <div className="text-4xl mb-3">🏆</div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{nft.skill}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{nft.topic} • {nft.language}</p>
                        <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs px-2 py-1 rounded-full mb-3">
                          {nft.level}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                          <p>Minted: {new Date(nft.mintedAt).toLocaleDateString()}</p>
                          {nft.tokenId && <p>Token ID: {nft.tokenId}</p>}
                        </div>
                        {nft.txHash && (
                                                     <a 
                             href={`https://explorer.open-campus-codex.gelato.digital/tx/${nft.txHash}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-xs"
                           >
                             View on Explorer ↗
                           </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrophyIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Skill NFTs Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Complete courses 100% to earn Skill NFTs that prove your expertise!
                  </p>
                  <button 
                    onClick={() => window.location.href = '/learn'}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
                  >
                    Start Learning
                  </button>
                </div>
              )}
            </div>

                        {/* My Lessons Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Created Lessons</h2>
              
              {/* Personal Lessons */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-xl mr-2">🔒</span>
                  Personal Lessons
                </h3>
                {(() => {
                  const personalLessons = enhancedLessonManager.getPersonalLessons(address);
                  return personalLessons.length > 0 ? (
                    <div className="space-y-3">
                      {personalLessons.slice(0, 3).map((lesson) => (
                        <div key={lesson.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">{lesson.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {lesson.language}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                  {lesson.topic}
                                </span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Personal
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                localStorage.setItem('sf_selected_topic_id', lesson.topic?.toLowerCase() || 'culture');
                                localStorage.setItem('sf_selected_topic_name', lesson.topic || 'Cultural Studies');
                                localStorage.setItem('sf_selected_language_code', lesson.language?.toLowerCase() || 'en');
                                localStorage.setItem('sf_selected_language_name', lesson.language || 'English');
                                window.location.href = '/course';
                              }}
                              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                            >
                              View →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No personal lessons yet</p>
                  );
                })()}
              </div>

              {/* Community Lessons */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="text-xl mr-2">🌍</span>
                  Community Lessons
                </h3>
                {(() => {
                  const communityLessons = enhancedLessonManager.getCommunityLessons(address);
                  return communityLessons.length > 0 ? (
                    <div className="space-y-3">
                      {communityLessons.slice(0, 3).map((lesson) => (
                        <div key={lesson.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">{lesson.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                                  {lesson.language}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                  {lesson.topic}
                                </span>
                                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                  Community
                    </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                localStorage.setItem('sf_selected_topic_id', lesson.topic?.toLowerCase() || 'culture');
                                localStorage.setItem('sf_selected_topic_name', lesson.topic || 'Cultural Studies');
                                localStorage.setItem('sf_selected_language_code', lesson.language?.toLowerCase() || 'en');
                                localStorage.setItem('sf_selected_language_name', lesson.language || 'English');
                                window.location.href = '/course';
                              }}
                              className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                            >
                              View →
                            </button>
                          </div>
                  </div>
                ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No community lessons yet</p>
                  );
                })()}
              </div>

              {/* Create New Lesson Button */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => window.location.href = '/create-lesson'}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm"
                >
                  Create New Lesson
                </button>
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

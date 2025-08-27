import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useNavigation } from '../_app';
import { useAccount } from 'wagmi';
import { walletProfileManager } from '../../utils/walletProfileManager';
import { enhancedLessonManager } from '../../utils/enhancedLessonManager';
import { 
  TrophyIcon,
  StarIcon,
  FireIcon,
  BookOpenIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function ProfileView() {
  const router = useRouter();
  const { wallet } = router.query;
  const { navigateHome, navigateToDashboard, isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  
  const [profileData, setProfileData] = useState(null);
  const [userLessons, setUserLessons] = useState([]);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wallet) {
      loadProfileData(wallet);
    }
  }, [wallet]);

  const loadProfileData = (walletAddress) => {
    try {
      setLoading(true);
      setError(null);

      const profile = walletProfileManager.getProfile(walletAddress);
      if (!profile) {
        setError('Profile not found');
        setLoading(false);
        return;
      }

      setProfileData(profile);

      const lessons = enhancedLessonManager.getCommunityLessons(walletAddress);
      setUserLessons(lessons);

      const quizzes = enhancedLessonManager.getCommunityFeed()
        .filter(item => item.type === 'quiz' && item.creatorWallet === walletAddress);
      setUserQuizzes(quizzes);

      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const generateAchievements = () => {
    if (!profileData?.stats) return [];
    
    const achievements = [];
    
    if (profileData.stats.quizzesCompleted >= 1) {
      achievements.push({
        id: 1,
        title: "First Quiz Completed",
        description: "Completed first quiz",
        icon: "🎯",
        earned: true
      });
    }
    
    if (profileData.stats.currentStreak >= 7) {
      achievements.push({
        id: 2,
        title: "Week Warrior",
        description: "7-day learning streak",
        icon: "🔥",
        earned: true
      });
    }
    
    if (profileData.learningProgress?.length >= 2) {
      achievements.push({
        id: 3,
        title: "Language Explorer",
        description: `Learned ${profileData.learningProgress.length} languages`,
        icon: "🌍",
        earned: true
      });
    }
    
    if (profileData.stats.totalXP >= 1000) {
      achievements.push({
        id: 4,
        title: "XP Master",
        description: "Earned 1000+ XP",
        icon: "⭐",
        earned: true
      });
    }
    
    if (profileData.stats.currentLevel >= 5) {
      achievements.push({
        id: 5,
        title: "Level Achiever",
        description: `Reached level ${profileData.stats.currentLevel}`,
        icon: "🏆",
        earned: true
      });
    }
    
    return achievements;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => router.back()}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const achievements = generateAchievements();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>{profileData.name || 'Profile'} - ScholarForge</title>
        <meta name="description" content={`View ${profileData.name || 'user'}'s learning profile and achievements`} />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{profileData.avatar || '🎓'}</div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {profileData.name || `Scholar_${wallet?.slice(2, 8)}`}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Level {profileData.stats?.currentLevel || 1} Scholar
                </p>
                
                {profileData.bio && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{profileData.bio}</p>
                )}

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>Joined {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Learning Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total XP</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profileData.stats?.totalXP?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Current Level</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profileData.stats?.currentLevel || 1}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Current Streak</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profileData.stats?.currentStreak || 0} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Quizzes Completed</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profileData.stats?.quizzesCompleted || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Lessons Completed</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profileData.stats?.lessonsCompleted || 0}
                  </span>
                </div>
              </div>
            </motion.div>

            {profileData.learningProgress && profileData.learningProgress.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Languages</h2>
                <div className="space-y-3">
                  {profileData.learningProgress.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{lang.language}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {lang.xp || 0} XP
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No achievements earned yet
                </p>
              )}
            </motion.div>

            {userLessons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Created Lessons</h2>
                <div className="space-y-4">
                  {userLessons.slice(0, 5).map((lesson) => (
                    <div key={lesson.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                              {lesson.language}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                              {lesson.topic}
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
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {userQuizzes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Created Quizzes</h2>
                <div className="space-y-4">
                  {userQuizzes.slice(0, 5).map((quiz) => (
                    <div key={quiz.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{quiz.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                              {quiz.language}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                              {quiz.difficulty || 'Beginner'}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              +{quiz.xpReward || 50} XP
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            window.location.href = `/quiz?id=${quiz.id}`;
                          }}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Take Quiz →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

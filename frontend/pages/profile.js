import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useNavigation } from './_app';
import { 
  AcademicCapIcon, 
  UserIcon,
  CogIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  BookOpenIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  PencilIcon,
  ShareIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { navigateHome, navigateToDashboard } = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Kwame Asante",
    username: "kwame_scholar",
    email: "kwame@example.com",
    bio: "Passionate about learning African languages and sharing cultural knowledge with the community.",
    location: "Accra, Ghana",
    website: "https://kwamescholar.com",
    avatar: "🇬🇭",
    joinedDate: "January 2024"
  });

  const stats = {
    totalXP: 8500,
    currentLevel: 15,
    quizzesCompleted: 87,
    coursesCompleted: 12,
    communityContributions: 23,
    languagesLearning: 4,
    currentStreak: 12,
    longestStreak: 45
  };

  const achievements = [
    { id: 1, title: "First Quiz Completed", description: "Completed your first quiz", icon: "🎯", earned: true, date: "Jan 15, 2024" },
    { id: 2, title: "Week Warrior", description: "7-day learning streak", icon: "🔥", earned: true, date: "Jan 22, 2024" },
    { id: 3, title: "Culture Explorer", description: "Completed 5 culture quizzes", icon: "🏛️", earned: true, date: "Feb 3, 2024" },
    { id: 4, title: "Language Hero: Twi", description: "Top contributor in Twi", icon: "🏆", earned: true, date: "Feb 10, 2024" },
    { id: 5, title: "Community Helper", description: "Helped 10 other learners", icon: "🤝", earned: true, date: "Feb 15, 2024" },
    { id: 6, title: "Master Learner", description: "Reach level 20", icon: "🎓", earned: false, date: null },
    { id: 7, title: "Polyglot", description: "Learn 5 languages", icon: "🌍", earned: false, date: null },
    { id: 8, title: "Quiz Master", description: "Create 10 quizzes", icon: "📝", earned: false, date: null }
  ];

  const learningProgress = [
    { language: "Twi", progress: 85, level: "Advanced", flag: "🇬🇭" },
    { language: "English", progress: 95, level: "Expert", flag: "🇺🇸" },
    { language: "Yoruba", progress: 60, level: "Intermediate", flag: "🇳🇬" },
    { language: "French", progress: 30, level: "Beginner", flag: "🇫🇷" }
  ];

  const recentActivity = [
    { type: "quiz", title: "Completed Ghanaian History Quiz", xp: 75, date: "2 hours ago", icon: "📚" },
    { type: "achievement", title: "Earned Community Helper badge", xp: 100, date: "1 day ago", icon: "🏆" },
    { type: "course", title: "Finished Traditional Arts course", xp: 150, date: "2 days ago", icon: "🎨" },
    { type: "quiz", title: "Created Crypto Basics Quiz", xp: 50, date: "3 days ago", icon: "₿" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Head>
        <title>Profile - ScholarForge</title>
        <meta name="description" content="Your ScholarForge learning profile and achievements" />
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
                onClick={() => setIsEditing(!isEditing)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="text-6xl mb-4">{profileData.avatar}</div>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
                  <p className="text-gray-600 mb-1">@{profileData.username}</p>
                </>
              )}
              
              <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{stats.totalXP.toLocaleString()}</div>
                <div className="text-sm text-primary-700">Total XP</div>
              </div>

              <div className="mt-4 text-left space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  {profileData.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Joined {profileData.joinedDate}
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={3}
                  className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 text-sm mt-4">{profileData.bio}</p>
              )}

              <button className="w-full mt-4 bg-secondary-600 text-white py-2 px-4 rounded-lg hover:bg-secondary-700 transition-colors flex items-center justify-center">
                <ShareIcon className="h-4 w-4 mr-2" />
                Share Profile
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900">{stats.currentLevel}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{stats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{stats.quizzesCompleted}</div>
                  <div className="text-sm text-gray-600">Quizzes</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{stats.languagesLearning}</div>
                  <div className="text-sm text-gray-600">Languages</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
              <div className="space-y-4">
                {learningProgress.map((lang, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{lang.flag}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{lang.language}</h3>
                          <p className="text-sm text-gray-600">{lang.level}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{lang.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lang.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'border-success-300 bg-success-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <div className="flex-1">
                        <h3 className={`font-medium ${achievement.earned ? 'text-success-900' : 'text-gray-600'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? 'text-success-700' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-success-600 mt-1">Earned {achievement.date}</p>
                        )}
                      </div>
                      {achievement.earned && (
                        <CheckCircleIcon className="h-5 w-5 text-success-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success-600">+{activity.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

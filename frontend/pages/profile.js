import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
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
  CalendarIcon,
  WalletIcon,
  PhotoIcon,
  LinkIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { navigateHome, navigateToDashboard, isDark, setIsDark } = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const fileInputRef = useRef(null);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [profileData, setProfileData] = useState({
    name: "Kwame Asante",
    username: "kwame_scholar",
    email: "kwame@example.com",
    bio: "Passionate about learning African languages and sharing cultural knowledge with the community.",
    location: "Accra, Ghana",
    website: "https://kwamescholar.com",
    avatar: "🇬🇭",
    profileImage: null,
    joinedDate: "January 2024",
    connections: {
      wallet: isConnected ? address : null,
      google: null,
      twitter: null,
      linkedin: null,
      github: null
    }
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConnectWallet = async () => {
    if (!isConnected && connectors.length > 0) {
      try {
        await connect({ connector: connectors[0] });
        setProfileData({
          ...profileData,
          connections: {
            ...profileData.connections,
            wallet: address
          }
        });
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
    setProfileData({
      ...profileData,
      connections: {
        ...profileData.connections,
        wallet: null
      }
    });
  };

  const handleSocialConnect = (platform) => {
    // Mock social connection - in production, integrate with OAuth providers
    alert(`Connecting to ${platform}... (Demo - Integration needed)`);
    setProfileData({
      ...profileData,
      connections: {
        ...profileData.connections,
        [platform]: `@${profileData.username}`
      }
    });
  };

  const handleSocialDisconnect = (platform) => {
    setProfileData({
      ...profileData,
      connections: {
        ...profileData.connections,
        [platform]: null
      }
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Profile - ScholarForge</title>
        <meta name="description" content="Your ScholarForge learning profile and achievements" />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center"
            >
              {/* Profile Picture */}
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">{profileData.avatar}</span>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700"
                  >
                    <PhotoIcon className="h-4 w-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Full name"
                  />
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Email address"
                  />
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Location"
                  />
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Website URL"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{profileData.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">@{profileData.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{profileData.email}</p>
                </>
              )}
              
              <div className="mt-4 p-3 bg-primary-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{stats.totalXP.toLocaleString()}</div>
                <div className="text-sm text-primary-700 dark:text-primary-300">Total XP</div>
              </div>

              <div className="mt-4 text-left space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  {profileData.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Joined {profileData.joinedDate}
                </div>
                {profileData.website && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                      Website
                    </a>
                  </div>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={3}
                  className="w-full mt-4 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">{profileData.bio}</p>
              )}

              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => setShowConnections(!showConnections)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Manage Connections
                </button>
                <button className="w-full bg-secondary-600 text-white py-2 px-4 rounded-lg hover:bg-secondary-700 transition-colors flex items-center justify-center">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share Profile
                </button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mt-6"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.currentLevel}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Level</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.quizzesCompleted}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Quizzes</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.languagesLearning}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Languages</div>
                </div>
              </div>
            </motion.div>

            {/* Connections Modal */}
            {showConnections && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mt-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Account Connections</h2>
                  <button 
                    onClick={() => setShowConnections(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Wallet Connection */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <WalletIcon className="h-6 w-6 text-primary-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Crypto Wallet</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {isConnected ? (
                      <button 
                        onClick={handleDisconnectWallet}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={handleConnectWallet}
                        className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700"
                      >
                        Connect
                      </button>
                    )}
                  </div>

                  {/* Google Connection */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-3 flex items-center justify-center">
                        <span className="text-lg">🔍</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Google Account</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {profileData.connections.google || 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {profileData.connections.google ? (
                      <button 
                        onClick={() => handleSocialDisconnect('google')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleSocialConnect('google')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Connect
                      </button>
                    )}
                  </div>

                  {/* Twitter/X Connection */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-3 flex items-center justify-center">
                        <span className="text-lg">𝕏</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">X (Twitter)</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {profileData.connections.twitter || 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {profileData.connections.twitter ? (
                      <button 
                        onClick={() => handleSocialDisconnect('twitter')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleSocialConnect('twitter')}
                        className="bg-blue-400 text-white px-3 py-1 rounded text-sm hover:bg-blue-500"
                      >
                        Connect
                      </button>
                    )}
                  </div>

                  {/* LinkedIn Connection */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-3 flex items-center justify-center">
                        <span className="text-lg">💼</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">LinkedIn</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {profileData.connections.linkedin || 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {profileData.connections.linkedin ? (
                      <button 
                        onClick={() => handleSocialDisconnect('linkedin')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleSocialConnect('linkedin')}
                        className="bg-blue-700 text-white px-3 py-1 rounded text-sm hover:bg-blue-800"
                      >
                        Connect
                      </button>
                    )}
                  </div>

                  {/* GitHub Connection */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-3 flex items-center justify-center">
                        <span className="text-lg">🐙</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">GitHub</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {profileData.connections.github || 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {profileData.connections.github ? (
                      <button 
                        onClick={() => handleSocialDisconnect('github')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleSocialConnect('github')}
                        className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-900"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-blue-900 dark:text-blue-200">Security & Privacy</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your connected accounts help verify your identity and enable features like easy login and social sharing. 
                    You can disconnect any service at any time.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
              <div className="space-y-4">
                {learningProgress.map((lang, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{lang.flag}</span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{lang.language}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{lang.level}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{lang.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'border-success-300 bg-success-50' 
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 opacity-80'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <div className="flex-1">
                        <h3 className={`font-medium ${achievement.earned ? 'text-success-900' : 'text-gray-600 dark:text-gray-300'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? 'text-success-700' : 'text-gray-500 dark:text-gray-400'}`}>
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[{ type: "quiz", title: "Completed Ghanaian History Quiz", xp: 75, date: "2 hours ago", icon: "📚" },
                  { type: "achievement", title: "Earned Community Helper badge", xp: 100, date: "1 day ago", icon: "🏆" },
                  { type: "course", title: "Finished Traditional Arts course", xp: 150, date: "2 days ago", icon: "🎨" },
                  { type: "quiz", title: "Created Crypto Basics Quiz", xp: 50, date: "3 days ago", icon: "₿" }].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.date}</p>
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

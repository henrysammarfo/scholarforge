// Wallet Profile Manager for ScholarForge
// Creates unique profiles for each wallet connection

export class WalletProfileManager {
  constructor() {
    this.storagePrefix = 'sf_wallet_profile_';
    this.currentWallet = null;
  }

  // Create a completely fresh profile for a new wallet
  createFreshProfile(walletAddress) {
    const profileId = this.generateProfileId(walletAddress);
    
    const freshProfile = {
      id: profileId,
      walletAddress: walletAddress,
      name: `Scholar_${walletAddress.slice(2, 8)}`,
      username: `user_${walletAddress.slice(2, 8)}`,
      displayName: `Scholar_${walletAddress.slice(2, 8)}`,
      email: '',
      bio: 'Passionate learner on ScholarForge',
      location: '',
      website: '',
      avatar: '🎓',
      profileImage: null,
      joinedDate: new Date().toISOString(),
      connections: { 
        wallet: walletAddress, 
        google: null, 
        twitter: null, 
        linkedin: null, 
        github: null 
      },
      preferences: { 
        language: 'en', 
        theme: 'light', 
        notifications: true 
      },
      stats: {
        totalXP: 0,
        currentLevel: 1,
        quizzesCompleted: 0,
        coursesCompleted: 0,
        communityContributions: 0,
        languagesLearning: 1,
        currentStreak: 0,
        longestStreak: 0,
        accuracy: 0
      },
      achievements: [],
      learningProgress: [],
      recentActivity: [],
      skillNFTs: [],
      completedQuizzes: [],
      createdLessons: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.saveProfile(freshProfile);
    this.setCurrentWallet(walletAddress);
    return freshProfile;
  }

  // Get or create profile for a wallet
  getOrCreateProfile(walletAddress) {
    if (!walletAddress) return null;

    const existingProfile = this.getProfile(walletAddress);
    if (existingProfile) {
      this.setCurrentWallet(walletAddress);
      return existingProfile;
    }

    return this.createFreshProfile(walletAddress);
  }

  // Get profile for specific wallet
  getProfile(walletAddress) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }
      
      const storageKey = `${this.storagePrefix}${walletAddress.toLowerCase()}`;
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  // Save profile to localStorage
  saveProfile(profile) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      
      const storageKey = `${this.storagePrefix}${profile.walletAddress.toLowerCase()}`;
      localStorage.setItem(storageKey, JSON.stringify(profile));
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  }

  // Update profile
  updateProfile(walletAddress, updates) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const updatedProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveProfile(updatedProfile);
    return updatedProfile;
  }

  // Set current wallet
  setCurrentWallet(walletAddress) {
    this.currentWallet = walletAddress;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('sf_current_wallet', walletAddress);
    }
  }

  // Get current wallet
  getCurrentWallet() {
    if (!this.currentWallet && typeof window !== 'undefined' && window.localStorage) {
      this.currentWallet = localStorage.getItem('sf_current_wallet');
    }
    return this.currentWallet;
  }

  // Get current profile
  getCurrentProfile() {
    const wallet = this.getCurrentWallet();
    return wallet ? this.getProfile(wallet) : null;
  }

  // Clear wallet data (for logout)
  clearWalletData(walletAddress) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      
      const storageKey = `${this.storagePrefix}${walletAddress.toLowerCase()}`;
      localStorage.removeItem(storageKey);
      localStorage.removeItem('sf_current_wallet');
      this.currentWallet = null;
      return true;
    } catch (error) {
      console.error('Error clearing wallet data:', error);
      return false;
    }
  }

  // Generate unique profile ID
  generateProfileId(walletAddress) {
    return `profile_${walletAddress.slice(2, 8)}_${Date.now()}`;
  }

              // Update XP and recalculate level
  updateXP(walletAddress, xpGained) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const newTotalXP = profile.stats.totalXP + xpGained;
    const newLevel = Math.max(1, Math.floor(newTotalXP / 100) + 1);

    // Add to recent activity
    this.addActivity(walletAddress, 'xp_gained', {
      xp: xpGained,
      totalXP: newTotalXP,
      level: newLevel
    });

    return this.updateProfile(walletAddress, {
      stats: {
        ...profile.stats,
        totalXP: newTotalXP,
        currentLevel: newLevel
      }
    });
  }

  // Add XP (alias for updateXP for easier use)
  addXP(walletAddress, xpGained) {
    return this.updateXP(walletAddress, xpGained);
  }

  // Add activity to recent activity feed
  addActivity(walletAddress, activityType, data) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const activity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: activityType,
      data: data,
      timestamp: new Date().toISOString()
    };

    const updatedRecentActivity = [activity, ...profile.recentActivity].slice(0, 50); // Keep last 50 activities

    return this.updateProfile(walletAddress, {
      recentActivity: updatedRecentActivity
    });
  }

          // Update streak when user completes learning activity
          updateStreak(walletAddress) {
            const profile = this.getProfile(walletAddress);
            if (!profile) return null;

            const today = new Date().toDateString();
            const lastActivity = profile.stats.lastActivityDate;
            
            if (lastActivity === today) {
              // Already updated today
              return profile;
            }

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            let newStreak = profile.stats.currentStreak;
            let longestStreak = profile.stats.longestStreak;

            if (lastActivity === yesterdayStr) {
              // Consecutive day
              newStreak += 1;
            } else if (lastActivity !== today) {
              // Break in streak
              newStreak = 1;
            }

            longestStreak = Math.max(longestStreak, newStreak);

            return this.updateProfile(walletAddress, {
              stats: {
                ...profile.stats,
                currentStreak: newStreak,
                longestStreak: longestStreak,
                lastActivityDate: today
              }
            });
          }

            // Record quiz completion
          recordQuizCompletion(walletAddress, quizId, score, xpEarned, topic, language) {
            const profile = this.getProfile(walletAddress);
            if (!profile) return null;

            const completedQuiz = {
              id: quizId,
              completedAt: new Date().toISOString(),
              score,
              xpEarned,
              topic,
              language
            };

            const updatedStats = {
              ...profile.stats,
              quizzesCompleted: profile.stats.quizzesCompleted + 1,
              totalXP: profile.stats.totalXP + xpEarned
            };

            // Recalculate level
            updatedStats.currentLevel = Math.max(1, Math.floor(updatedStats.totalXP / 100) + 1);

                // Update streak
    this.updateStreak(walletAddress);

    // Add to recent activity
    this.addActivity(walletAddress, 'lesson_completed', {
      lessonId,
      xpEarned,
      topic,
      language
    });

    // Update language learning progress
            let updatedLearningProgress = [...profile.learningProgress];
            const existingLangIndex = updatedLearningProgress.findIndex(lang => lang.language === language);
            
            if (existingLangIndex >= 0) {
              updatedLearningProgress[existingLangIndex] = {
                ...updatedLearningProgress[existingLangIndex],
                xp: updatedLearningProgress[existingLangIndex].xp + xpEarned,
                lessonsCompleted: updatedLearningProgress[existingLangIndex].lessonsCompleted + 1
              };
            } else {
              updatedLearningProgress.push({
                language,
                xp: xpEarned,
                lessonsCompleted: 1,
                startedAt: new Date().toISOString()
              });
            }

            // Update topic progress
            let updatedTopicProgress = [...profile.topicProgress];
            const existingTopicIndex = updatedTopicProgress.findIndex(t => t.topic === topic);
            
            if (existingTopicIndex >= 0) {
              updatedTopicProgress[existingTopicIndex] = {
                ...updatedTopicProgress[existingTopicIndex],
                xp: updatedTopicProgress[existingTopicIndex].xp + xpEarned,
                quizzesCompleted: updatedTopicProgress[existingTopicIndex].quizzesCompleted + 1
              };
            } else {
              updatedTopicProgress.push({
                topic,
                xp: xpEarned,
                quizzesCompleted: 1,
                startedAt: new Date().toISOString()
              });
            }

            return this.updateProfile(walletAddress, {
              stats: updatedStats,
              completedQuizzes: [...profile.completedQuizzes, completedQuiz],
              learningProgress: updatedLearningProgress,
              topicProgress: updatedTopicProgress
            });
          }

  // Add created lesson
  addCreatedLesson(walletAddress, lessonId) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    return this.updateProfile(walletAddress, {
      createdLessons: [...profile.createdLessons, lessonId],
      stats: {
        ...profile.stats,
        communityContributions: profile.stats.communityContributions + 1
      }
    });
  }

  // Record lesson completion
  recordLessonCompletion(walletAddress, lessonId, xpEarned, topic, language) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const completedLesson = {
      id: lessonId,
      completedAt: new Date().toISOString(),
      xpEarned,
      topic,
      language
    };

    const updatedStats = {
      ...profile.stats,
      lessonsCompleted: profile.stats.lessonsCompleted + 1,
      totalXP: profile.stats.totalXP + xpEarned
    };

    // Recalculate level
    updatedStats.currentLevel = Math.max(1, Math.floor(updatedStats.totalXP / 100) + 1);

    // Update streak
    this.updateStreak(walletAddress);

    // Add to recent activity
    this.addActivity(walletAddress, 'quiz_completed', {
      quizId,
      score,
      xpEarned,
      topic,
      language
    });

    // Update language learning progress
    let updatedLearningProgress = [...profile.learningProgress];
    const existingLangIndex = updatedLearningProgress.findIndex(lang => lang.language === language);
    
    if (existingLangIndex >= 0) {
      updatedLearningProgress[existingLangIndex] = {
        ...updatedLearningProgress[existingLangIndex],
        xp: updatedLearningProgress[existingLangIndex].xp + xpEarned,
        lessonsCompleted: updatedLearningProgress[existingLangIndex].lessonsCompleted + 1
      };
    } else {
      updatedLearningProgress.push({
        language,
        xp: xpEarned,
        lessonsCompleted: 1,
        startedAt: new Date().toISOString()
      });
    }

    // Update topic progress
    let updatedTopicProgress = [...profile.topicProgress];
    const existingTopicIndex = updatedTopicProgress.findIndex(t => t.topic === topic);
    
    if (existingTopicIndex >= 0) {
      updatedTopicProgress[existingTopicIndex] = {
        ...updatedTopicProgress[existingTopicIndex],
        xp: updatedTopicProgress[existingTopicIndex].xp + xpEarned,
        lessonsCompleted: updatedTopicProgress[existingTopicIndex].lessonsCompleted + 1
      };
    } else {
      updatedTopicProgress.push({
        topic,
        xp: xpEarned,
        lessonsCompleted: 1,
        startedAt: new Date().toISOString()
      });
    }

    return this.updateProfile(walletAddress, {
      stats: updatedStats,
      completedLessons: [...profile.completedLessons, completedLesson],
      learningProgress: updatedLearningProgress,
      topicProgress: updatedTopicProgress
    });
  }

  // Get all profiles (for admin purposes)
  getAllProfiles() {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }

    const profiles = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith(this.storagePrefix)) {
        try {
          const profile = JSON.parse(localStorage.getItem(key));
          if (profile) profiles.push(profile);
        } catch (error) {
          console.error('Error parsing profile:', error);
        }
      }
    });

    return profiles;
  }

  // Check if wallet has profile
  hasProfile(walletAddress) {
    return !!this.getProfile(walletAddress);
  }
}

export const walletProfileManager = new WalletProfileManager();

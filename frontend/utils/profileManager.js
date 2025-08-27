// Profile Management Utility for ScholarForge
export class ProfileManager {
  constructor() {
    this.storageKey = 'sf_user_profiles';
    this.currentProfileKey = 'sf_current_profile';
  }

  generateProfileId(walletAddress) {
    if (!walletAddress) return null;
    return `profile_${walletAddress.toLowerCase()}`;
  }

  createProfile(walletAddress, initialData = {}) {
    const profileId = this.generateProfileId(walletAddress);
    if (!profileId) return null;

    const defaultProfile = {
      id: profileId,
      walletAddress: walletAddress.toLowerCase(),
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
      connections: { wallet: walletAddress, google: null, twitter: null, linkedin: null, github: null },
      preferences: { language: 'en', theme: 'light', notifications: true },
      stats: { totalXP: 0, currentLevel: 1, quizzesCompleted: 0, coursesCompleted: 0, communityContributions: 0, languagesLearning: 1, currentStreak: 0, longestStreak: 0 },
      achievements: [],
      learningProgress: [],
      recentActivity: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const profile = { ...defaultProfile, ...initialData };
    this.saveProfile(profile);
    return profile;
  }

  getProfile(walletAddress) {
    if (!walletAddress) return null;
    try {
      const profiles = this.getAllProfiles();
      const profileId = this.generateProfileId(walletAddress);
      return profiles[profileId] || null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  getOrCreateProfile(walletAddress, initialData = {}) {
    let profile = this.getProfile(walletAddress);
    if (!profile) {
      profile = this.createProfile(walletAddress, initialData);
    }
    return profile;
  }

  updateProfile(walletAddress, updates) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const updatedProfile = { ...profile, ...updates, updatedAt: new Date().toISOString() };
    this.saveProfile(updatedProfile);
    return updatedProfile;
  }

  saveProfile(profile) {
    try {
      const profiles = this.getAllProfiles();
      profiles[profile.id] = profile;
      localStorage.setItem(this.storageKey, JSON.stringify(profiles));
      
      const currentProfile = this.getCurrentProfile();
      if (currentProfile && currentProfile.walletAddress === profile.walletAddress) {
        this.setCurrentProfile(profile);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }

  getAllProfiles() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error getting all profiles:', error);
      return {};
    }
  }

  setCurrentProfile(profile) {
    try {
      localStorage.setItem(this.currentProfileKey, JSON.stringify(profile));
    } catch (error) {
      console.error('Error setting current profile:', error);
    }
  }

  getCurrentProfile() {
    try {
      const stored = localStorage.getItem(this.currentProfileKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error getting current profile:', error);
      return null;
    }
  }

  clearCurrentProfile() {
    try {
      localStorage.removeItem(this.currentProfileKey);
    } catch (error) {
      console.error('Error clearing current profile:', error);
    }
  }

  updateProfileStats(walletAddress, statUpdates) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const updatedStats = { ...profile.stats, ...statUpdates };
    return this.updateProfile(walletAddress, { stats: updatedStats });
  }

  addAchievement(walletAddress, achievement) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const achievements = [...profile.achievements];
    if (!achievements.find(a => a.id === achievement.id)) {
      achievements.push({ ...achievement, earned: true, date: new Date().toISOString() });
    }

    return this.updateProfile(walletAddress, { achievements });
  }

  updateLearningProgress(walletAddress, language, progress) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const learningProgress = [...profile.learningProgress];
    const existingIndex = learningProgress.findIndex(p => p.language === language);
    
    if (existingIndex >= 0) {
      learningProgress[existingIndex] = { ...learningProgress[existingIndex], ...progress };
    } else {
      learningProgress.push({ language, progress: progress.progress || 0, level: progress.level || 'Beginner', flag: progress.flag || '🌍', ...progress });
    }

    return this.updateProfile(walletAddress, { learningProgress });
  }

  addRecentActivity(walletAddress, activity) {
    const profile = this.getProfile(walletAddress);
    if (!profile) return null;

    const recentActivity = [activity, ...profile.recentActivity];
    if (recentActivity.length > 20) {
      recentActivity.splice(20);
    }

    return this.updateProfile(walletAddress, { recentActivity });
  }

  getProfileByDisplayName(displayName) {
    try {
      const profiles = this.getAllProfiles();
      return Object.values(profiles).find(p => p.displayName === displayName) || null;
    } catch (error) {
      console.error('Error getting profile by display name:', error);
      return null;
    }
  }

  isDisplayNameAvailable(displayName, excludeWalletAddress = null) {
    try {
      const profiles = this.getAllProfiles();
      const existing = Object.values(profiles).find(p => 
        p.displayName === displayName && p.walletAddress !== excludeWalletAddress
      );
      return !existing;
    } catch (error) {
      console.error('Error checking display name availability:', error);
      return false;
    }
  }

  generateUniqueDisplayName(walletAddress, baseName = null) {
    if (!baseName) {
      baseName = `Scholar_${walletAddress.slice(2, 8)}`;
    }

    let displayName = baseName;
    let counter = 1;

    while (!this.isDisplayNameAvailable(displayName, walletAddress)) {
      displayName = `${baseName}_${counter}`;
      counter++;
    }

    return displayName;
  }
}

export const profileManager = new ProfileManager();

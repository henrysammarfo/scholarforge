// Language Management Utility for ScholarForge
export class LanguageManager {
  constructor() {
    this.supportedLanguages = {
      en: { name: 'English', flag: '🇺🇸', nativeName: 'English', rtl: false },
      tw: { name: 'Twi', flag: '🇬🇭', nativeName: 'Twi', rtl: false },
      yo: { name: 'Yoruba', flag: '🇳🇬', nativeName: 'Yorùbá', rtl: false },
      sw: { name: 'Swahili', flag: '🇰🇪', nativeName: 'Kiswahili', rtl: false },
      fr: { name: 'French', flag: '🇫🇷', nativeName: 'Français', rtl: false },
      es: { name: 'Spanish', flag: '🇲🇽', nativeName: 'Español', rtl: false },
      hi: { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी', rtl: false },
      ar: { name: 'Arabic', flag: '🇪🇬', nativeName: 'العربية', rtl: true },
      zh: { name: 'Chinese', flag: '🇨🇳', nativeName: '中文', rtl: false },
      pt: { name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português', rtl: false }
    };

    this.currentLanguage = this.getCurrentLanguage();
    this.fallbackLanguage = 'en';
  }

  getCurrentLanguage() {
    try {
      return localStorage.getItem('sf_selected_language_code') || 'en';
    } catch {
      return 'en';
    }
  }

  setCurrentLanguage(languageCode) {
    if (!this.supportedLanguages[languageCode]) {
      languageCode = this.fallbackLanguage;
    }

    try {
      localStorage.setItem('sf_selected_language_code', languageCode);
      this.currentLanguage = languageCode;
      
      document.documentElement.dir = this.supportedLanguages[languageCode].rtl ? 'rtl' : 'ltr';
      document.documentElement.lang = languageCode;
      
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: languageCode } 
      }));
      
      return true;
    } catch (error) {
      console.error('Error setting language:', error);
      return false;
    }
  }

  getLanguageInfo(languageCode) {
    return this.supportedLanguages[languageCode] || this.supportedLanguages[this.fallbackLanguage];
  }

  getAllLanguages() {
    return Object.entries(this.supportedLanguages).map(([code, info]) => ({
      code,
      ...info
    }));
  }

  isRTL(languageCode) {
    return this.supportedLanguages[languageCode]?.rtl || false;
  }

  filterContentByLanguage(content, languageCode) {
    if (!content) return content;
    
    if (Array.isArray(content)) {
      return content.filter(item => {
        if (typeof item === 'object' && item.language) {
          return item.language === languageCode;
        }
        return true;
      });
    }
    
    if (typeof content === 'object' && content.language) {
      return content.language === languageCode ? content : null;
    }
    
    return content;
  }

  getContentInLanguage(content, targetLanguage, fallbackLanguage = 'en') {
    if (!content) return null;
    
    if (typeof content === 'object' && !Array.isArray(content)) {
      if (content[targetLanguage]) {
        return content[targetLanguage];
      }
      
      if (content[fallbackLanguage]) {
        return content[fallbackLanguage];
      }
      
      return content;
    }
    
    if (Array.isArray(content)) {
      const targetContent = content.find(item => item.language === targetLanguage);
      if (targetContent) return targetContent;
      
      const fallbackContent = content.find(item => item.language === fallbackLanguage);
      return fallbackContent || content[0] || null;
    }
    
    return content;
  }

  async translateText(text, fromLanguage, toLanguage, context = '') {
    if (fromLanguage === toLanguage) return text;
    
    try {
      const cacheKey = `translation_${fromLanguage}_${toLanguage}_${btoa(text)}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }
      
      const placeholderTranslation = `[${toLanguage.toUpperCase()}] ${text}`;
      localStorage.setItem(cacheKey, JSON.stringify(placeholderTranslation));
      
      return placeholderTranslation;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  getLanguageProgress(walletAddress, languageCode) {
    try {
      const progressKey = `sf_language_progress_${walletAddress}_${languageCode}`;
      const stored = localStorage.getItem(progressKey);
      return stored ? JSON.parse(stored) : {
        level: 'Beginner',
        progress: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        totalXP: 0,
        lastActivity: null
      };
    } catch (error) {
      return {
        level: 'Beginner',
        progress: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        totalXP: 0,
        lastActivity: null
      };
    }
  }

  updateLanguageProgress(walletAddress, languageCode, updates) {
    try {
      const progressKey = `sf_language_progress_${walletAddress}_${languageCode}`;
      const currentProgress = this.getLanguageProgress(walletAddress, languageCode);
      
      const updatedProgress = {
        ...currentProgress,
        ...updates,
        lastActivity: new Date().toISOString()
      };
      
      localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
      return updatedProgress;
    } catch (error) {
      console.error('Error updating language progress:', error);
      return null;
    }
  }

  getUserLearningLanguages(walletAddress) {
    try {
      const languages = [];
      
      Object.keys(this.supportedLanguages).forEach(languageCode => {
        const progress = this.getLanguageProgress(walletAddress, languageCode);
        if (progress.lessonsCompleted > 0 || progress.quizzesCompleted > 0) {
          languages.push({
            code: languageCode,
            ...this.supportedLanguages[languageCode],
            progress: progress.progress,
            level: progress.level,
            lessonsCompleted: progress.lessonsCompleted,
            quizzesCompleted: progress.quizzesCompleted,
            totalXP: progress.totalXP
          });
        }
      });
      
      return languages.sort((a, b) => b.totalXP - a.totalXP);
    } catch (error) {
      return [];
    }
  }
}

export const languageManager = new LanguageManager();

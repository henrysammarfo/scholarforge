// Simple localization utility for ScholarForge
export const translations = {
  en: {
    // Navigation
    learn: "Learn",
    dashboard: "Dashboard",
    community: "Community",
    create: "Create",
    wallet: "Wallet",
    profile: "Profile",
    
    // Learning
    chooseLanguage: "Choose Your Learning Language",
    selectLanguage: "Select the language you want to learn in",
    chooseTopic: "Choose Your Topic",
    learningIn: "Learning in",
    selectTopic: "Select what you want to learn about",
    backToLanguages: "← Back to Languages",
    
    // Course
    lessons: "lessons",
    progress: "Progress",
    markComplete: "Mark Complete",
    nextLesson: "Next Lesson",
    previousLesson: "← Previous Lesson",
    takeQuiz: "Take Quiz",
    
    // Quiz
    quizCompleted: "Quiz Completed!",
    greatJob: "Great job! You scored",
    and: "and",
    earned: "earned",
    goToDashboard: "Go to Dashboard",
    takeAnotherQuiz: "Take Another Quiz",
    
    // Profile & Dashboard
    totalXP: "Total XP",
    level: "Level",
    dayStreak: "Day Streak",
    quizzes: "Quizzes",
    languages: "Languages",
    editProfile: "Edit Profile",
    saveProfile: "Save",
    learningProgress: "Learning Progress",
    achievements: "Achievements",
    recentActivity: "Recent Activity",
    
    // Blockchain
    mintXP: "Mint XP Tokens",
    mintSkillNFT: "Mint Skill NFT",
    wrongNetwork: "Wrong Network",
    switchNetwork: "Switch Network",
    connectWallet: "Connect your wallet to mint tokens",
    minting: "Minting...",
    mintingSuccess: "Minted Successfully!",
    mintingFailed: "Minting Failed",
    viewOnExplorer: "View on Explorer",
    
    // Common
    close: "Close",
    tryAgain: "Try Again",
    comingSoon: "Coming soon",
    loading: "Loading...",
    completed: "Completed",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert"
  },
  
  sw: {
    // Navigation
    learn: "Jifunze",
    dashboard: "Dashibodi",
    community: "Jamii",
    create: "Tengeneza",
    wallet: "Pochi",
    profile: "Wasifu",
    
    // Learning
    chooseLanguage: "Chagua Lugha Yako ya Kujifunza",
    selectLanguage: "Chagua lugha unayotaka kujifunza",
    chooseTopic: "Chagua Mada Yako",
    learningIn: "Kujifunza kwa",
    selectTopic: "Chagua unachotaka kujifunza",
    backToLanguages: "← Rudi kwa Lugha",
    
    // Course
    lessons: "masomo",
    progress: "Maendeleo",
    markComplete: "Weka Alama ya Kumaliza",
    nextLesson: "Somo Lijalo",
    previousLesson: "← Somo la Awali",
    takeQuiz: "Fanya Jaribio",
    
    // Quiz
    quizCompleted: "Jaribio Limekamilika!",
    greatJob: "Vizuri sana! Umepata alama",
    and: "na",
    earned: "umepata",
    goToDashboard: "Nenda Dashibodi",
    takeAnotherQuiz: "Fanya Jaribio Lingine",
    
    // Profile & Dashboard
    totalXP: "Jumla ya XP",
    level: "Kiwango",
    dayStreak: "Mfululizo wa Siku",
    quizzes: "Majaribio",
    languages: "Lugha",
    editProfile: "Hariri Wasifu",
    saveProfile: "Hifadhi",
    learningProgress: "Maendeleo ya Kujifunza",
    achievements: "Mafanikio",
    recentActivity: "Shughuli za Hivi Karibuni",
    
    // Blockchain
    mintXP: "Tengeneza Tokeni za XP",
    mintSkillNFT: "Tengeneza NFT ya Ujuzi",
    wrongNetwork: "Mtandao Usio Sahihi",
    switchNetwork: "Badilisha Mtandao",
    connectWallet: "Unganisha pochi yako ili kutengeneza tokeni",
    minting: "Inaengeneza...",
    mintingSuccess: "Imetengenezwa Kwa Ufanisi!",
    mintingFailed: "Imeshindwa Kutengeneza",
    viewOnExplorer: "Angalia kwenye Explorer",
    
    // Common
    close: "Funga",
    tryAgain: "Jaribu Tena",
    comingSoon: "Inakuja hivi karibuni",
    loading: "Inapakia...",
    completed: "Imekamilika",
    beginner: "Mwanzo",
    intermediate: "Kati",
    advanced: "Juu",
    expert: "Mtaalamu"
  }
};

export const getTranslation = (key, languageCode = 'en') => {
  return translations[languageCode]?.[key] || translations.en[key] || key;
};

export const getCurrentLanguage = () => {
  try {
    return localStorage.getItem('sf_selected_language_code') || 'en';
  } catch {
    return 'en';
  }
};

export const t = (key) => {
  return getTranslation(key, getCurrentLanguage());
};

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount } from 'wagmi';
import { getTranslation, getCurrentLanguage } from '../utils/localization';
import { languageManager } from '../utils/languageManager';
import { lessonManager } from '../utils/lessonManager';
import { 
  TrophyIcon, 
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Learn() {
  const { isDark, setIsDark, navigateToDashboard } = useNavigation();
  const { address, isConnected } = useAccount();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentLangCode, setCurrentLangCode] = useState('en');
  const [availableLessons, setAvailableLessons] = useState([]);

  const languages = languageManager.getAllLanguages();

  // Get localized topics based on selected language
  const getLocalizedTopics = (langCode) => {
    const topics = [
      { 
        id: 'culture', 
        name: getTranslation('culturalStudies', langCode), 
        icon: '🏛️', 
        description: getTranslation('culturalStudiesDesc', langCode) 
      },
      { 
        id: 'crypto', 
        name: getTranslation('cryptoWeb3', langCode), 
        icon: '₿', 
        description: getTranslation('cryptoWeb3Desc', langCode) 
      },
      { 
        id: 'food', 
        name: getTranslation('africanCuisine', langCode), 
        icon: '🍽️', 
        description: getTranslation('africanCuisineDesc', langCode) 
      },
      { 
        id: 'technology', 
        name: getTranslation('modernTechnology', langCode), 
        icon: '💻', 
        description: getTranslation('modernTechnologyDesc', langCode) 
      },
      { 
        id: 'business', 
        name: getTranslation('businessEntrepreneurship', langCode), 
        icon: '💼', 
        description: getTranslation('businessEntrepreneurshipDesc', langCode) 
      },
      { 
        id: 'health', 
        name: getTranslation('healthWellness', langCode), 
        icon: '🏥', 
        description: getTranslation('healthWellnessDesc', langCode) 
      },
      { 
        id: 'environment', 
        name: getTranslation('environmentalScience', langCode), 
        icon: '🌱', 
        description: getTranslation('environmentalScienceDesc', langCode) 
      }
    ];
    return topics;
  };

  // Load saved language and topic on component mount
  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      try {
        const savedLanguageCode = localStorage.getItem('sf_selected_language_code');
        const savedLanguageName = localStorage.getItem('sf_selected_language_name');
        const savedTopicId = localStorage.getItem('sf_selected_topic_id');
        const savedTopicName = localStorage.getItem('sf_selected_topic_name');

        if (savedLanguageCode && savedLanguageName) {
          const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
          if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
            setCurrentLangCode(savedLanguageCode);
          }
        }

        if (savedTopicId && savedTopicName && selectedLanguage) {
          const savedTopic = getLocalizedTopics(savedLanguageCode || 'en').find(topic => topic.id === savedTopicId);
          if (savedTopic) {
            setSelectedTopic(savedTopic);
          }
        }
      } catch (error) {
        console.error('Error loading saved preferences:', error);
      }
    }
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setSelectedTopic(null);
    setCurrentLangCode(language.code);
    
    // Update language using language manager
    languageManager.setCurrentLanguage(language.code);
    
    // Load available lessons for this language
    if (address) {
      const lessons = lessonManager.getLessonsByLanguage(language.code);
      setAvailableLessons(lessons);
    }
    
    try {
      localStorage.setItem('sf_selected_language_code', language.code);
      localStorage.setItem('sf_selected_language_name', language.name);
      localStorage.removeItem('sf_selected_topic_id');
      localStorage.removeItem('sf_selected_topic_name');
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    try {
      localStorage.setItem('sf_selected_topic_id', topic.id);
      localStorage.setItem('sf_selected_topic_name', topic.name);
    } catch (error) {
      console.error('Error saving topic preference:', error);
    }
    
    // Navigate to course page with selected language and topic
    window.location.href = `/course?lang=${selectedLanguage.code}&topic=${topic.id}`;
  };

  const resetSelections = () => {
    setSelectedLanguage(null);
    setSelectedTopic(null);
    setCurrentLangCode('en');
    
    try {
      localStorage.removeItem('sf_selected_language_code');
      localStorage.removeItem('sf_selected_language_name');
      localStorage.removeItem('sf_selected_topic_id');
      localStorage.removeItem('sf_selected_topic_name');
    } catch (error) {
      console.error('Error clearing preferences:', error);
    }
  };

  const currentTopics = getLocalizedTopics(currentLangCode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>{getTranslation('learn', currentLangCode)} - ScholarForge</title>
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <TrophyIcon className="h-16 w-16 text-primary-600 mr-4" />
            <div className="text-left">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {getTranslation('chooseLanguage', currentLangCode)}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {getTranslation('selectLanguage', currentLangCode)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Language Selection */}
        {!selectedLanguage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {languages.map((language, index) => (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleLanguageSelect(language)}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{language.flag}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {language.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Topic Selection */}
        {selectedLanguage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Language Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-3">{selectedLanguage.flag}</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {getTranslation('learningIn', currentLangCode)} {selectedLanguage.name}
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {getTranslation('selectTopic', currentLangCode)}
              </p>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTopicSelect(topic)}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{topic.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-center text-primary-600 group-hover:text-primary-700 transition-colors">
                      <span className="text-sm font-medium">
                        {getTranslation('startLearning', currentLangCode)}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={resetSelections}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-300"
              >
                <ArrowRightIcon className="h-5 w-5 mr-2 rotate-180" />
                {getTranslation('backToLanguages', currentLangCode)}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

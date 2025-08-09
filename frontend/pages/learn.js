import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { 
  TrophyIcon, 
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Learn() {
  const { isDark, setIsDark, navigateToDashboard } = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', description: 'Global language of opportunity' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭', description: 'Akan language of Ghana' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', description: 'Language of Nigeria' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', description: 'Language of Nigeria' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬', description: 'Language of Nigeria' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪', description: 'East African language' },
    { code: 'fr', name: 'French', flag: '🇫🇷', description: 'West African French' },
    { code: 'es', name: 'Spanish', flag: '🇲🇽', description: 'Latin American Spanish' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', description: 'Indian subcontinent' }
  ];

  const topics = [
    { id: 'culture', name: 'Cultural Studies', icon: '🏛️', description: 'Learn about African cultures and traditions' },
    { id: 'crypto', name: 'Crypto & Web3', icon: '₿', description: 'Blockchain, cryptocurrency, and digital finance' },
    { id: 'food', name: 'African Cuisine', icon: '🍲', description: 'Traditional and modern African cooking' },
    { id: 'sports', name: 'Sports & Fitness', icon: '⚽', description: 'African sports, fitness, and wellness' },
    { id: 'science', name: 'Science & Tech', icon: '🔬', description: 'STEM education and technology' },
    { id: 'business', name: 'Business & Entrepreneurship', icon: '💼', description: 'Business skills and startup knowledge' },
    { id: 'history', name: 'African History', icon: '📚', description: 'Rich history of African civilizations' },
    { id: 'arts', name: 'Arts & Music', icon: '🎨', description: 'African arts, music, and creative expression' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setSelectedTopic(null);
    try {
      localStorage.setItem('sf_selected_language_code', language.code)
      localStorage.setItem('sf_selected_language_name', language.name)
    } catch {}
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    try {
      localStorage.setItem('sf_selected_topic_id', topic.id)
      localStorage.setItem('sf_selected_topic_name', topic.name)
    } catch {}
    window.location.href = '/course';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Learn - ScholarForge</title>
        <meta name="description" content="Start learning in your preferred language" />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedLanguage ? (
          // Language Selection
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Learning Language
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Select the language you want to learn in
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLanguageSelect(language)}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-200"
                >
                  <div className="text-4xl mb-2">{language.flag}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {language.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !selectedTopic ? (
          // Topic Selection
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <button
                onClick={() => setSelectedLanguage(null)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-4"
              >
                ← Back to Languages
              </button>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Topic
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                Learning in <span className="font-semibold text-primary-600">{selectedLanguage.name}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Select what you want to learn about
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTopicSelect(topic)}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-200"
                >
                  <div className="text-4xl mb-2">{topic.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {topic.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

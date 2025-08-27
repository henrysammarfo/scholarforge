import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount } from 'wagmi';
import { getTranslation, getCurrentLanguage } from '../utils/localization';
import { enhancedLessonManager } from '../utils/enhancedLessonManager';
import { languageManager } from '../utils/languageManager';
import { 
  CpuChipIcon, 
  SparklesIcon, 
  BookOpenIcon, 
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function CreateLesson() {
  const { isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('en');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [currentLangCode, setCurrentLangCode] = useState('en');
  const [topic, setTopic] = useState('');
  const [lessonType, setLessonType] = useState('community'); // 'personal' or 'community'

  // Load saved language preference on component mount
  useEffect(() => {
    try {
      const savedLanguageCode = localStorage.getItem('sf_selected_language_code');
      if (savedLanguageCode) {
        setLanguage(savedLanguageCode);
        setCurrentLangCode(savedLanguageCode);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇲🇽' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
  ];

  const generate = async () => {
    if (!prompt.trim()) {
      alert(getTranslation('pleaseEnterTopic', currentLangCode));
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          language: language,
          topic: topic
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate lesson');
      }

      const data = await response.json();
      setResult({
        lessonTitle: data.lessonTitle,
        lessonContent: data.lessonContent,
        quiz: data.quiz.map(q => ({
          q: q.question,
          a: q.options,
          correct: q.correct,
          explanation: q.explanation
        }))
      });
    } catch (error) {
      console.error('Error generating lesson:', error);
      alert(getTranslation('failedToGenerate', currentLangCode));
    } finally {
      setGenerating(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCurrentLangCode(newLanguage);
    try {
      localStorage.setItem('sf_selected_language_code', newLanguage);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const publishLesson = () => {
    if (!result || !address || !isConnected) {
      alert('Please connect your wallet to publish lessons');
      return;
    }
    
    try {
      // Create lesson data
      const lessonData = {
        title: result.lessonTitle,
        content: result.lessonContent,
        language: language,
        topic: topic || 'custom',
        creatorWallet: address,
        description: `AI-generated lesson about ${prompt}`,
        difficulty: 'Beginner',
        estimatedDuration: '10 minutes',
        tags: [topic, language, 'ai-generated'],
        quiz: result.quiz,
        lessonType: lessonType, // 'personal' or 'community'
        isPublic: lessonType === 'community'
      };
      
      // Save lesson using enhanced lesson manager
      const savedLesson = enhancedLessonManager.createLesson(lessonData);
      
      if (savedLesson) {
        // Create quiz from lesson
        const quiz = enhancedLessonManager.createQuizFromLesson(savedLesson.id, {
          title: `Quiz: ${result.lessonTitle}`,
          description: `Test your knowledge of ${result.lessonTitle}`,
          questions: result.quiz.map(q => ({
            question: q.q,
            options: q.a,
            correct: q.correct,
            explanation: q.explanation
          }))
        });
        
        alert(getTranslation('lessonPublished', currentLangCode));
        
        // Navigate to the course page with the correct topic and language
        localStorage.setItem('sf_selected_topic_id', topic || 'custom');
        localStorage.setItem('sf_selected_topic_name', topic || 'Custom Topic');
        localStorage.setItem('sf_selected_language_code', language);
        localStorage.setItem('sf_selected_language_name', languages.find(l => l.code === language)?.name || 'English');
        window.location.href = '/course';
      } else {
        alert('Failed to save lesson. Please try again.');
      }
    } catch (error) {
      console.error('Error publishing lesson:', error);
      alert('Failed to publish lesson. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>{getTranslation('aiLessonCreator', currentLangCode)} - ScholarForge</title>
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <CpuChipIcon className="h-12 w-12 text-primary-600 mr-3" />
            <SparklesIcon className="h-8 w-8 text-secondary-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation('aiLessonCreator', currentLangCode)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered lesson creator that generates educational content in multiple languages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <BookOpenIcon className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {getTranslation('createYourLesson', currentLangCode)}
              </h2>
            </div>

            {/* Language Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getTranslation('lessonLanguage', currentLangCode)}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      language === lang.code
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{lang.flag}</div>
                      <div className="text-sm font-medium">{lang.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic Category
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select a topic category</option>
                <option value="culture">Cultural Studies</option>
                <option value="crypto">Crypto & Web3</option>
                <option value="food">African Cuisine</option>
                                        <option value="technology">Modern Technology</option>
                        <option value="business">Business & Entrepreneurship</option>
                        <option value="health">Health & Wellness</option>
                        <option value="environment">Environmental Science</option>
                <option value="custom">Custom Topic</option>
              </select>
            </div>

            {/* Lesson Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lesson Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLessonType('personal')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    lessonType === 'personal'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-sm font-medium">Personal Lesson</div>
                    <div className="text-xs text-gray-500">Private, only you can see</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setLessonType('community')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    lessonType === 'community'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🌍</div>
                    <div className="text-sm font-medium">Community Lesson</div>
                    <div className="text-xs text-gray-500">Public, everyone can see</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getTranslation('lessonTopic', currentLangCode)}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={getTranslation('lessonTopicPlaceholder', currentLangCode)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                rows={4}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={generating || !prompt.trim()}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {getTranslation('generating', currentLangCode)}...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  {getTranslation('generateLesson', currentLangCode)}
                </>
              )}
            </button>
          </motion.div>

          {/* Result Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <QuestionMarkCircleIcon className="h-6 w-6 text-secondary-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {getTranslation('generatedLesson', currentLangCode)}
              </h2>
            </div>

            {result ? (
              <div className="space-y-6">
                {/* Lesson Title */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {result.lessonTitle}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {getTranslation('language', currentLangCode)}: {languages.find(l => l.code === language)?.name}
                  </div>
                </div>

                {/* Lesson Content */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    {getTranslation('lessonContent', currentLangCode)}
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-h-40 overflow-y-auto">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {result.lessonContent}
                    </p>
                  </div>
                </div>

                {/* Quiz */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    {getTranslation('quiz', currentLangCode)} ({result.quiz.length} {getTranslation('questions', currentLangCode)})
                  </h4>
                  <div className="space-y-3">
                    {result.quiz.map((question, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          {index + 1}. {question.q}
                        </p>
                        <div className="space-y-1">
                          {question.a.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`text-sm p-2 rounded ${
                                optIndex === question.correct
                                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Button */}
                <button
                  onClick={publishLesson}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  {getTranslation('publishLesson', currentLangCode)}
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p>{getTranslation('noLessonGenerated', currentLangCode)}</p>
                <p className="text-sm mt-2">{getTranslation('generateLessonFirst', currentLangCode)}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

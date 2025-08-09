import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
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
  const [prompt, setPrompt] = useState('Intro to Python for beginners');
  const [language, setLanguage] = useState('en');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a lesson topic');
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
          language: language
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
      alert('Failed to generate lesson. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Create Lesson (AI) - ScholarForge</title>
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
            AI-Powered Lesson Creator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate culturally-relevant educational content with African context using advanced AI
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Your Lesson</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lesson Topic
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Introduction to Python programming for African developers, Blockchain applications for agriculture, Basic computer skills for students..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <GlobeAltIcon className="h-4 w-4 inline mr-1" />
                  Language
                </label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="tw">🇬🇭 Twi</option>
                  <option value="yo">🇳🇬 Yoruba</option>
                  <option value="sw">🇰🇪 Swahili</option>
                  <option value="fr">🇫🇷 French</option>
                </select>
              </div>

              <button 
                onClick={generate} 
                disabled={generating || !prompt.trim()} 
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-4 rounded-lg hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium text-lg transition-all duration-200"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating AI Content...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Generate Lesson with AI
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <CpuChipIcon className="h-8 w-8 mx-auto mb-2 text-primary-500" />
                  AI-Powered
                </div>
                <div>
                  <GlobeAltIcon className="h-8 w-8 mx-auto mb-2 text-secondary-500" />
                  Multi-Language
                </div>
                <div>
                  <BookOpenIcon className="h-8 w-8 mx-auto mb-2 text-success-500" />
                  African Context
                </div>
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            {!result ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <SparklesIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">AI-Generated Content Will Appear Here</h3>
                <p className="text-sm">Enter a topic and click generate to create your lesson</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    Generated Lesson
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    ~15 min read
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {result.lessonTitle}
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                    <div className="whitespace-pre-line">{result.lessonContent}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
                    Generated Quiz Questions ({result.quiz.length})
                  </h3>
                  <div className="space-y-3">
                    {result.quiz.map((q, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <p className="font-medium text-gray-900 dark:text-white mb-2">
                          {i + 1}. {q.q}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {q.a.map((option, idx) => (
                            <div 
                              key={idx} 
                              className={`p-2 rounded ${
                                idx === q.correct 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}. {option}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                    🚀 Coming Soon Features
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Save and publish lessons to the platform</li>
                    <li>• Share with other educators</li>
                    <li>• Export to multiple formats</li>
                    <li>• Integration with assessment tools</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>


      </div>
    </div>
  );
}

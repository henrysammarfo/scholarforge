import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { 
  AcademicCapIcon, 
  PlusIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
  BookOpenIcon,
  SparklesIcon,
  ShareIcon,
  ClockIcon,
  UsersIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

export default function Create() {
  const { navigateToCommunity, navigateToDashboard, navigateHome, isDark, setIsDark } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    language: '',
    topic: '',
    difficulty: 'beginner',
    xpReward: 50,
    maxParticipants: 100,
    duration: 30, // in minutes
    isPublic: true,
    allowRetakes: false,
    questions: [
      {
        id: 1,
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const [quizLink, setQuizLink] = useState('');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇲🇽' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  const topics = [
    { id: 'culture', name: 'Cultural Studies', icon: '🏛️' },
    { id: 'crypto', name: 'Crypto & Web3', icon: '₿' },
    { id: 'food', name: 'African Cuisine', icon: '🍲' },
    { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
    { id: 'science', name: 'Science & Tech', icon: '🔬' },
    { id: 'business', name: 'Business & Entrepreneurship', icon: '💼' },
    { id: 'history', name: 'African History', icon: '📚' },
    { id: 'arts', name: 'Arts & Music', icon: '🎨' }
  ];

  const addQuestion = () => {
    const newQuestion = {
      id: quizData.questions.length + 1,
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion]
    });
  };

  const removeQuestion = (questionId) => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter(q => q.id !== questionId)
      });
    }
  };

  const updateQuestion = (questionId, field, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    });
  };

  const updateAnswer = (questionId, answerIndex, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map(q => 
        q.id === questionId ? {
          ...q,
          answers: q.answers.map((a, i) => i === answerIndex ? value : a)
        } : q
      )
    });
  };

  const validateQuiz = () => {
    if (!quizData.title || !quizData.language || !quizData.topic) return false;
    
    return quizData.questions.every(q => 
      q.question.trim() && 
      q.answers.every(a => a.trim()) &&
      q.answers[q.correctAnswer].trim()
    );
  };

  const handleSubmit = () => {
    if (validateQuiz()) {
      // Generate quiz link
      const quizId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const link = `${window.location.origin}/quiz/${quizId}`;
      setQuizLink(link);
      
      // Here you would submit to your API
      console.log('Submitting quiz:', quizData);
      alert('Quiz created successfully! 🎉 You earned 25 XP for contributing to the community.');
      
      // Show share modal
      setShowShareModal(true);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const copyQuizLink = () => {
    navigator.clipboard.writeText(quizLink);
    alert('Quiz link copied to clipboard!');
  };

  const shareQuiz = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: quizData.title,
          text: `Check out this quiz: ${quizData.title}`,
          url: quizLink,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyQuizLink();
    }
  };

  const getStepColor = (step) => {
    if (step < currentStep) return 'bg-success-600';
    if (step === currentStep) return 'bg-primary-600';
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Create Quiz - ScholarForge</title>
        <meta name="description" content="Create and share educational quizzes with the ScholarForge community" />
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Create a Quiz</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share your knowledge and earn XP by creating educational content for the community.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getStepColor(step)}`}>
                  {step < currentStep ? <CheckCircleIcon className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 ${step < currentStep ? 'bg-success-600' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quiz Title *</label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                  placeholder="e.g., Ghanaian Culture and Traditions"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                  placeholder="Brief description of what learners will gain from this quiz..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language *</label>
                  <select
                    value={quizData.language}
                    onChange={(e) => setQuizData({...quizData, language: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select Language</option>
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic *</label>
                  <select
                    value={quizData.topic}
                    onChange={(e) => setQuizData({...quizData, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select Topic</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.icon} {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={quizData.difficulty}
                    onChange={(e) => setQuizData({...quizData, difficulty: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">XP Reward</label>
                  <input
                    type="number"
                    value={quizData.xpReward}
                    onChange={(e) => setQuizData({...quizData, xpReward: parseInt(e.target.value)})}
                    min="10"
                    max="200"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Quiz Settings */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quiz Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <UsersIcon className="h-4 w-4 inline mr-2" />
                    Max Participants
                  </label>
                  <input
                    type="number"
                    value={quizData.maxParticipants}
                    onChange={(e) => setQuizData({...quizData, maxParticipants: parseInt(e.target.value)})}
                    min="1"
                    max="1000"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum number of people who can take this quiz</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <ClockIcon className="h-4 w-4 inline mr-2" />
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={quizData.duration}
                    onChange={(e) => setQuizData({...quizData, duration: parseInt(e.target.value)})}
                    min="5"
                    max="180"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">Time limit for completing the quiz</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={quizData.isPublic}
                    onChange={(e) => setQuizData({...quizData, isPublic: e.target.checked})}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Make this quiz public (visible to everyone)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowRetakes"
                    checked={quizData.allowRetakes}
                    onChange={(e) => setQuizData({...quizData, allowRetakes: e.target.checked})}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowRetakes" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Allow participants to retake the quiz
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Questions */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Questions</h2>
                <button
                  onClick={addQuestion}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Question
                </button>
              </div>

              {quizData.questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Question {index + 1}</h3>
                    {quizData.questions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Question *</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      placeholder="Enter your question here..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Answer Options</label>
                    <div className="space-y-2">
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === answerIndex}
                            onChange={() => updateQuestion(question.id, 'correctAnswer', answerIndex)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => updateAnswer(question.id, answerIndex, e.target.value)}
                            placeholder={`Option ${answerIndex + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Explanation (Optional)</label>
                    <textarea
                      value={question.explanation}
                      onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                      placeholder="Explain why this answer is correct..."
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review & Publish</h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{quizData.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Language:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {languages.find(l => l.code === quizData.language)?.flag} {languages.find(l => l.code === quizData.language)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Topic:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {topics.find(t => t.id === quizData.topic)?.icon} {topics.find(t => t.id === quizData.topic)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Difficulty:</span>
                    <div className="font-medium capitalize text-gray-900 dark:text-white">{quizData.difficulty}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">XP Reward:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{quizData.xpReward} XP</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Max Participants:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{quizData.maxParticipants}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{quizData.duration} minutes</div>
                  </div>
                </div>
                {quizData.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-4">{quizData.description}</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Questions ({quizData.questions.length})</h4>
                <div className="space-y-4">
                  {quizData.questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        {index + 1}. {question.question}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {question.answers.map((answer, answerIndex) => (
                          <div key={answerIndex} className={`p-2 rounded text-sm ${
                            answerIndex === question.correctAnswer 
                              ? 'bg-success-100 text-success-800 border border-success-300' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                          }`}>
                            {answer}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">{question.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {!validateQuiz() && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-red-800 font-medium">Please complete all required fields</h4>
                    <p className="text-red-700 text-sm">Make sure all questions have content and answers.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex space-x-4">
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!validateQuiz()}
                  className="bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Publish Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <CheckCircleIcon className="h-16 w-16 text-success-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Published!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your quiz "{quizData.title}" has been successfully published and is now available for the community!
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quiz Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={quizLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                  />
                  <button
                    onClick={copyQuizLink}
                    className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={shareQuiz}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center"
                >
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share Quiz
                </button>
                <button
                  onClick={() => {
                    setShowShareModal(false);
                    navigateToCommunity();
                  }}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Go to Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

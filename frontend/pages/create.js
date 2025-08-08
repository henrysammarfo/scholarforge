import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
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
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Create() {
  const { navigateToCommunity, navigateToDashboard, navigateHome } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    language: '',
    topic: '',
    difficulty: 'beginner',
    xpReward: 50,
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
      // Here you would submit to your API
      console.log('Submitting quiz:', quizData);
      alert('Quiz created successfully! 🎉 You earned 25 XP for contributing to the community.');
      navigateToCommunity();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const getStepColor = (step) => {
    if (step < currentStep) return 'bg-success-600';
    if (step === currentStep) return 'bg-primary-600';
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Head>
        <title>Create Quiz - ScholarForge</title>
        <meta name="description" content="Create and share educational quizzes with the ScholarForge community" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={navigateHome}>
                <AcademicCapIcon className="h-8 w-8 text-primary-600" />
              </button>
              <span className="ml-2 text-xl font-bold text-gray-900">ScholarForge</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={navigateToCommunity} className="text-gray-600 hover:text-gray-900">Community</button>
              <button onClick={navigateToDashboard} className="text-gray-600 hover:text-gray-900">Dashboard</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create a Quiz</h1>
          <p className="text-xl text-gray-600">
            Share your knowledge and earn XP by creating educational content for the community.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getStepColor(step)}`}>
                  {step < currentStep ? <CheckCircleIcon className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 ${step < currentStep ? 'bg-success-600' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title *</label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                  placeholder="e.g., Ghanaian Culture and Traditions"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                  placeholder="Brief description of what learners will gain from this quiz..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                  <select
                    value={quizData.language}
                    onChange={(e) => setQuizData({...quizData, language: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
                  <select
                    value={quizData.topic}
                    onChange={(e) => setQuizData({...quizData, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={quizData.difficulty}
                    onChange={(e) => setQuizData({...quizData, difficulty: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">XP Reward</label>
                  <input
                    type="number"
                    value={quizData.xpReward}
                    onChange={(e) => setQuizData({...quizData, xpReward: parseInt(e.target.value)})}
                    min="10"
                    max="200"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Questions */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Quiz Questions</h2>
                <button
                  onClick={addQuestion}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Question
                </button>
              </div>

              {quizData.questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      placeholder="Enter your question..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options *</label>
                    <div className="space-y-2">
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === answerIndex}
                            onChange={() => updateQuestion(question.id, 'correctAnswer', answerIndex)}
                            className="text-primary-600"
                          />
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => updateAnswer(question.id, answerIndex, e.target.value)}
                            placeholder={`Option ${answerIndex + 1}`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Select the correct answer by clicking the radio button</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Explanation (Optional)</label>
                    <textarea
                      value={question.explanation}
                      onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                      placeholder="Explain why this is the correct answer..."
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Quiz</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{quizData.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Language:</span>
                    <div className="font-medium">
                      {languages.find(l => l.code === quizData.language)?.flag} {languages.find(l => l.code === quizData.language)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Topic:</span>
                    <div className="font-medium">
                      {topics.find(t => t.id === quizData.topic)?.icon} {topics.find(t => t.id === quizData.topic)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Difficulty:</span>
                    <div className="font-medium capitalize">{quizData.difficulty}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">XP Reward:</span>
                    <div className="font-medium">{quizData.xpReward} XP</div>
                  </div>
                </div>
                {quizData.description && (
                  <p className="text-gray-700 mt-4">{quizData.description}</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Questions ({quizData.questions.length})</h4>
                <div className="space-y-4">
                  {quizData.questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {question.answers.map((answer, answerIndex) => (
                          <div key={answerIndex} className={`p-2 rounded text-sm ${
                            answerIndex === question.correctAnswer 
                              ? 'bg-success-100 text-success-800 border border-success-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {answer}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <p className="text-sm text-gray-600 mt-2 italic">{question.explanation}</p>
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
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex space-x-4">
              {currentStep < 3 ? (
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
    </div>
  );
}

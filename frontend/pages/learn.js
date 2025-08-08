import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  TrophyIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Learn() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', description: 'Global language of opportunity' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭', description: 'Akan language of Ghana' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', description: 'Language of Nigeria' },
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

  // Sample quiz data based on topic and language
  const getQuizData = (topic, language) => {
    const quizzes = {
      'culture': {
        'en': {
          title: "Nigerian Culture Quiz",
          questions: [
            {
              question: "What is the traditional greeting in Yoruba culture?",
              answers: ["E kaaro", "Good morning", "Hello", "Hi there"],
              correctAnswer: 0
            },
            {
              question: "Which festival celebrates the harvest in Ghana?",
              answers: ["Homowo", "Christmas", "Easter", "New Year"],
              correctAnswer: 0
            },
            {
              question: "What does 'Ubuntu' mean in African philosophy?",
              answers: ["I am because we are", "Hello", "Thank you", "Goodbye"],
              correctAnswer: 0
            }
          ]
        },
        'tw': {
          title: "Ghanaian Culture Quiz",
          questions: [
            {
              question: "What is 'Akwaaba' in Twi?",
              answers: ["Welcome", "Thank you", "Goodbye", "Hello"],
              correctAnswer: 0
            },
            {
              question: "Which dance is from the Ashanti region?",
              answers: ["Adowa", "Azonto", "Kpanlogo", "All of the above"],
              correctAnswer: 3
            },
            {
              question: "What is the meaning of 'Sankofa'?",
              answers: ["Go back and get it", "Forward", "Stay here", "Move on"],
              correctAnswer: 0
            }
          ]
        }
      },
      'crypto': {
        'en': {
          title: "Crypto Basics Quiz",
          questions: [
            {
              question: "What is blockchain technology?",
              answers: ["A distributed ledger", "A type of cryptocurrency", "A bank account", "A computer game"],
              correctAnswer: 0
            },
            {
              question: "Which cryptocurrency was created first?",
              answers: ["Bitcoin", "Ethereum", "Litecoin", "Dogecoin"],
              correctAnswer: 0
            },
            {
              question: "What is DeFi?",
              answers: ["Decentralized Finance", "Digital Finance", "Direct Finance", "Daily Finance"],
              correctAnswer: 0
            }
          ]
        }
      },
      'food': {
        'en': {
          title: "African Cuisine Quiz",
          questions: [
            {
              question: "What is Jollof rice?",
              answers: ["A West African rice dish", "A type of bread", "A drink", "A dessert"],
              correctAnswer: 0
            },
            {
              question: "Which country is famous for Injera?",
              answers: ["Ethiopia", "Nigeria", "Ghana", "Kenya"],
              correctAnswer: 0
            },
            {
              question: "What is Fufu made from?",
              answers: ["Cassava and plantains", "Rice", "Wheat", "Corn"],
              correctAnswer: 0
            }
          ]
        }
      }
    };
    
    return quizzes[topic]?.[language] || quizzes['culture']['en'];
  };

  useEffect(() => {
    if (currentQuiz && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion, currentQuiz]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setSelectedTopic('');
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    // Navigate to course first, then quiz
    window.location.href = '/course';
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 10);
    }

    if (currentQuestion + 1 < currentQuiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      // Quiz completed
      const finalScore = selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer ? score + 10 : score;
      const earnedXP = Math.floor((finalScore / (currentQuiz.questions.length * 10)) * 100);
      setXpEarned(earnedXP);
      setQuizCompleted(true);
    }
  };

  const question = currentQuiz?.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Head>
        <title>Learn - ScholarForge</title>
        <meta name="description" content="Start learning in your preferred language" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ScholarForge</span>
            </div>
                         <div className="flex items-center space-x-4">
               <span className="text-sm text-gray-600">XP: 1,250</span>
               <span className="text-sm text-gray-600">NFTs: 3</span>
               <button className="text-gray-600 hover:text-gray-900">Dashboard</button>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedLanguage ? (
          // Language Selection
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Language
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Select the language you want to learn in
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLanguageSelect(language)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-200"
                >
                  <div className="text-4xl mb-2">{language.flag}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {language.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
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
                onClick={() => setSelectedLanguage('')}
                className="text-gray-600 hover:text-gray-900 mb-4"
              >
                ← Back to Languages
              </button>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Topic
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Learning in <span className="font-semibold text-primary-600">{selectedLanguage.name}</span>
              </p>
              <p className="text-gray-600 mb-8">
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
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-200"
                >
                  <div className="text-4xl mb-2">{topic.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {topic.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !quizCompleted ? (
          // Quiz Interface
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Quiz Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h2>
                <p className="text-gray-600">Question {currentQuestion + 1} of {currentQuiz.questions.length}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  {timeLeft}s
                </div>
                <div className="flex items-center text-success-600">
                  <TrophyIcon className="h-5 w-5 mr-1" />
                  {score} XP
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      selectedAnswer === index
                        ? 'border-primary-600 bg-primary-50 text-primary-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>

                         {/* Navigation */}
             <div className="flex justify-between items-center">
               <button
                 onClick={() => setSelectedTopic('')}
                 className="text-gray-600 hover:text-gray-900"
               >
                 ← Back to Topics
               </button>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {currentQuestion + 1 === currentQuiz.questions.length ? 'Finish Quiz' : 'Next Question'}
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>
        ) : (
          // Quiz Results
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="mb-8">
              <CheckCircleIcon className="h-16 w-16 text-success-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Quiz Completed!
              </h2>
              <p className="text-gray-600 mb-6">
                Great job! You've completed the {currentQuiz.title} quiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">{score}</div>
                <div className="text-gray-600">Score</div>
              </div>
              <div className="bg-success-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-success-600 mb-2">{xpEarned}</div>
                <div className="text-gray-600">XP Earned</div>
              </div>
              <div className="bg-secondary-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-secondary-600 mb-2">
                  {Math.floor((score / (currentQuiz.questions.length * 10)) * 100)}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>

                         <div className="space-y-4">
               <button
                 onClick={() => setSelectedTopic('')}
                 className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700"
               >
                 Take Another Quiz
               </button>
               <button
                 onClick={() => {
                   setQuizCompleted(false);
                   setCurrentQuestion(0);
                   setScore(0);
                   setTimeLeft(30);
                   setSelectedAnswer(null);
                 }}
                 className="block w-full text-gray-600 hover:text-gray-900"
               >
                 Retry This Quiz
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { TrophyIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { getXPTokenContract, getProvider } from '../utils/contracts';

function getQuizData(topicId, languageCode) {
  const quizzes = {
    culture: {
      en: {
        title: 'Nigerian Culture Quiz',
        questions: [
          { question: 'What is the traditional greeting in Yoruba culture?', answers: ['E kaaro', 'Good morning', 'Hello', 'Hi there'], correctAnswer: 0 },
          { question: 'Which festival celebrates the harvest in Ghana?', answers: ['Homowo', 'Christmas', 'Easter', 'New Year'], correctAnswer: 0 },
          { question: "What does 'Ubuntu' mean in African philosophy?", answers: ['I am because we are', 'Hello', 'Thank you', 'Goodbye'], correctAnswer: 0 },
        ],
      },
      tw: {
        title: 'Ghanaian Culture Quiz',
        questions: [
          { question: "What is 'Akwaaba' in Twi?", answers: ['Welcome', 'Thank you', 'Goodbye', 'Hello'], correctAnswer: 0 },
          { question: 'Which dance is from the Ashanti region?', answers: ['Adowa', 'Azonto', 'Kpanlogo', 'All of the above'], correctAnswer: 3 },
          { question: "What is the meaning of 'Sankofa'?", answers: ['Go back and get it', 'Forward', 'Stay here', 'Move on'], correctAnswer: 0 },
        ],
      },
    },
    crypto: {
      en: {
        title: 'Crypto Basics Quiz',
        questions: [
          { question: 'What is blockchain technology?', answers: ['A distributed ledger', 'A type of cryptocurrency', 'A bank account', 'A computer game'], correctAnswer: 0 },
          { question: 'Which cryptocurrency was created first?', answers: ['Bitcoin', 'Ethereum', 'Litecoin', 'Dogecoin'], correctAnswer: 0 },
          { question: 'What is DeFi?', answers: ['Decentralized Finance', 'Digital Finance', 'Direct Finance', 'Daily Finance'], correctAnswer: 0 },
        ],
      },
    },
    food: {
      en: {
        title: 'African Cuisine Quiz',
        questions: [
          { question: 'What is Jollof rice?', answers: ['A West African rice dish', 'A type of bread', 'A drink', 'A dessert'], correctAnswer: 0 },
          { question: 'Which country is famous for Injera?', answers: ['Ethiopia', 'Nigeria', 'Ghana', 'Kenya'], correctAnswer: 0 },
          { question: 'What is Fufu made from?', answers: ['Cassava and plantains', 'Rice', 'Wheat', 'Corn'], correctAnswer: 0 },
        ],
      },
    },
  };
  const fallback = { title: `${topicId} Quiz`, questions: [] };
  return (quizzes[topicId] && quizzes[topicId][languageCode]) || fallback;
}

export default function Quiz() {
  const { isDark, setIsDark, navigateToDashboard } = useNavigation();
  const [meta, setMeta] = useState({ languageCode: 'en', languageName: 'English', topicId: 'culture', topicName: 'Cultural Studies' });
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    try {
      const languageCode = localStorage.getItem('sf_selected_language_code') || 'en';
      const languageName = localStorage.getItem('sf_selected_language_name') || 'English';
      const topicId = localStorage.getItem('sf_selected_topic_id') || 'culture';
      const topicName = localStorage.getItem('sf_selected_topic_name') || 'Cultural Studies';
      setMeta({ languageCode, languageName, topicId, topicName });
      const q = getQuizData(topicId, languageCode);
      setQuiz(q);
    } catch {
      const q = getQuizData('culture', 'en');
      setQuiz(q);
    }
  }, []);

  useEffect(() => {
    if (!quiz || completed) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [quiz, currentQuestion, completed]);

  const handleNext = () => {
    if (!quiz) return;
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 10);
    }
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      const finalScore = selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? score + 10 : score;
      const earned = Math.floor((finalScore / (quiz.questions.length * 10)) * 100);
      setXpEarned(earned);
      setCompleted(true);
      try {
        const prev = Number(localStorage.getItem('sf_user_xp') || '0');
        localStorage.setItem('sf_user_xp', String(prev + earned));
        const qPrev = Number(localStorage.getItem('sf_quizzes_completed') || '0');
        localStorage.setItem('sf_quizzes_completed', String(qPrev + 1));
        // Onchain XP mint (testnet): call mint to the user's address if signer has QUIZMASTER_ROLE
        const provider = getProvider();
        const signer = await provider.getSigner().catch(() => null);
        if (signer) {
          const me = await signer.getAddress();
          const xp = getXPTokenContract(signer);
          const amount = BigInt(earned) * (10n ** 18n);
          try { await (await xp.mint(me, amount, `Quiz ${meta.topicName}`)).wait(); } catch {}
        }
      } catch {}
    }
  };

  const question = quiz?.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Quiz - {meta.topicName} ({meta.languageName})</title>
        <meta name="description" content="Take quiz to earn XP" />
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!completed ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{quiz?.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">Question {currentQuestion + 1} of {quiz?.questions.length || 0}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  {timeLeft}s
                </div>
                <div className="flex items-center text-success-600">
                  <TrophyIcon className="h-5 w-5 mr-1" />
                  {score} XP
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{question?.question}</h3>
              <div className="space-y-3">
                {question?.answers.map((ans, idx) => (
                  <button key={idx} onClick={() => setSelectedAnswer(idx)} className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${selectedAnswer === idx ? 'border-primary-600 bg-primary-50 text-primary-900' : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200'}`}>
                    {ans}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleNext} disabled={selectedAnswer === null} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                {currentQuestion + 1 === (quiz?.questions.length || 0) ? 'Finish Quiz' : 'Next Question'}
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
            <div className="mb-8">
              <CheckCircleIcon className="h-16 w-16 text-success-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Great job! You earned {xpEarned} XP.</p>
            </div>
            <div className="space-y-4">
              <button onClick={navigateToDashboard} className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">Go to Dashboard</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

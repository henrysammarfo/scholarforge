import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { getQuizQuestions } from '../data/courseContent';
import { mintXPForQuiz, isCorrectNetwork, switchToEduChain } from '../utils/blockchain';
import { useAccount, useNetwork } from 'wagmi';
import { useWalletClient } from 'wagmi';
import { TrophyIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon, CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function getQuizData(topicId, languageCode) {
  const questions = getQuizQuestions(topicId, languageCode);
  const topicTitles = {
    culture: 'Cultural Studies Quiz',
    crypto: 'Crypto & Web3 Quiz', 
    food: 'African Cuisine Quiz',
    sports: 'Sports & Fitness Quiz',
    science: 'Science & Technology Quiz',
    business: 'Business & Entrepreneurship Quiz',
    history: 'African History Quiz',
    arts: 'Arts & Music Quiz'
  };
  
  return {
    title: topicTitles[topicId] || `${topicId} Quiz`,
    questions: questions.map(q => ({
      question: q.question,
      answers: q.options,
      correctAnswer: q.correct,
      explanation: q.explanation
    }))
  };
}

export default function Quiz() {
  const { isDark, setIsDark, navigateToDashboard } = useNavigation();
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  
  const [meta, setMeta] = useState({ languageCode: 'en', languageName: 'English', topicId: 'culture', topicName: 'Cultural Studies' });
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [minting, setMinting] = useState(false);
  const [mintResult, setMintResult] = useState(null);
  const [showNetworkWarning, setShowNetworkWarning] = useState(false);

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
      
      // Check network for on-chain minting
      if (isConnected && chain) {
        setShowNetworkWarning(!isCorrectNetwork(chain.id));
      }
      
      try {
        const prev = Number(localStorage.getItem('sf_user_xp') || '0');
        localStorage.setItem('sf_user_xp', String(prev + earned));
        const qPrev = Number(localStorage.getItem('sf_quizzes_completed') || '0');
        localStorage.setItem('sf_quizzes_completed', String(qPrev + 1));
      } catch {}
    }
  };

  const handleMintXP = async () => {
    if (!isConnected || !walletClient || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!isCorrectNetwork(chain?.id)) {
      try {
        await switchToEduChain();
        // Wait a moment for network switch
        setTimeout(() => {
          setShowNetworkWarning(false);
          handleMintXP(); // Retry after network switch
        }, 1000);
        return;
      } catch (error) {
        alert('Please switch to EduChain Testnet to mint XP');
        return;
      }
    }

    setMinting(true);
    try {
      const quizDetails = {
        topic: meta.topicName,
        language: meta.languageName,
        score: score,
        questionsTotal: quiz.questions.length
      };

      const result = await mintXPForQuiz(walletClient, address, xpEarned, quizDetails);
      setMintResult(result);

      if (result.success) {
        // Update local storage with on-chain confirmation
        try {
          localStorage.setItem('sf_last_mint_tx', result.txHash);
          localStorage.setItem('sf_onchain_xp', String(Number(localStorage.getItem('sf_onchain_xp') || '0') + xpEarned));
          
          // Add to recent activity
          const activity = {
            type: 'quiz',
            title: `${meta.topicName} Quiz`,
            language: meta.languageName,
            xp: xpEarned,
            date: new Date().toLocaleString(),
            txHash: result.txHash
          };
          
          const recentActivity = JSON.parse(localStorage.getItem('sf_recent_activity') || '[]');
          recentActivity.unshift(activity); // Add to beginning
          if (recentActivity.length > 10) recentActivity.pop(); // Keep only last 10
          localStorage.setItem('sf_recent_activity', JSON.stringify(recentActivity));
          
          // Track completed languages
          const completedLangs = JSON.parse(localStorage.getItem('sf_completed_languages') || '[]');
          if (!completedLangs.includes(meta.languageName)) {
            completedLangs.push(meta.languageName);
            localStorage.setItem('sf_completed_languages', JSON.stringify(completedLangs));
          }
        } catch {}
      }
    } catch (error) {
      setMintResult({
        success: false,
        error: error.message || 'Failed to mint XP'
      });
    } finally {
      setMinting(false);
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
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Great job! You scored {score}/{quiz?.questions.length * 10} and earned {xpEarned} XP.
              </p>
            </div>

            {/* Network Warning */}
            {showNetworkWarning && isConnected && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
              >
                <div className="flex items-center justify-center mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-800 dark:text-orange-200 font-medium">Wrong Network</span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                  Switch to EduChain Testnet to mint your XP tokens on-chain
                </p>
                <button 
                  onClick={() => switchToEduChain().then(() => setShowNetworkWarning(false)).catch(() => {})}
                  className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700"
                >
                  Switch Network
                </button>
              </motion.div>
            )}

            {/* On-chain Minting Section */}
            {isConnected && !showNetworkWarning && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-primary-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-center mb-4">
                  <CurrencyDollarIcon className="h-8 w-8 text-primary-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mint XP On-Chain</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Mint your {xpEarned} XP tokens directly to your wallet on EduChain Testnet
                </p>
                
                {!mintResult ? (
                  <button
                    onClick={handleMintXP}
                    disabled={minting}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {minting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Minting XP...
                      </>
                    ) : (
                      <>
                        <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                        Mint {xpEarned} XP Tokens
                      </>
                    )}
                  </button>
                ) : mintResult.success ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircleIcon className="h-6 w-6 mr-2" />
                      <span className="font-medium">XP Tokens Minted Successfully!</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border text-xs">
                      <p className="text-gray-600 dark:text-gray-300 mb-1">Transaction Hash:</p>
                      <p className="font-mono text-gray-900 dark:text-white break-all">{mintResult.txHash}</p>
                    </div>
                    <a 
                      href={`https://opencampus-codex.blockscout.com/tx/${mintResult.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      View on Explorer
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-red-600">
                      <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
                      <span className="font-medium">Minting Failed</span>
                    </div>
                    <p className="text-sm text-red-600">{mintResult.error}</p>
                    <button
                      onClick={handleMintXP}
                      className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isConnected && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 Connect your wallet to mint XP tokens on EduChain Testnet
                  </p>
                </div>
              )}
              <button 
                onClick={navigateToDashboard} 
                className="w-full bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => window.location.href = '/learn'} 
                className="w-full bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700"
              >
                Take Another Quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XMarkIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getTranslation } from '../utils/localization';
import { mintSkillNFT } from '../utils/blockchain';

export default function CourseCompletionModal({ 
  isOpen, 
  onClose, 
  courseData, 
  onProceedToQuiz,
  currentLanguage = 'en'
}) {
  const [step, setStep] = useState('completion'); // completion, minting, success
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [autoProceed, setAutoProceed] = useState(false);

  const { courseName, language, topic, score } = courseData || {};

  useEffect(() => {
    if (isOpen && step === 'completion') {
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setAutoProceed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, step]);

  const handleMarkComplete = async () => {
    if (!window.ethereum) {
      alert(getTranslation('connectWallet', currentLanguage));
      return;
    }

    setIsMinting(true);
    setStep('minting');

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];

      const result = await mintSkillNFT(
        window.ethereum, 
        userAddress, 
        {
          courseName: courseName || 'Unknown Course',
          language: language || currentLanguage,
          score: score || 100,
          topic: topic || 'General'
        }
      );

      if (result.success) {
        setMintResult(result);
        setStep('success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert(getTranslation('mintingFailed', currentLanguage) + ': ' + error.message);
      setStep('completion');
    } finally {
      setIsMinting(false);
    }
  };

  const handleSkip = () => {
    onProceedToQuiz();
    onClose();
  };

  const handleProceedToQuiz = () => {
    onProceedToQuiz();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getTranslation('courseCompleted', currentLanguage)}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Step 1: Course Completion */}
          {step === 'completion' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {getTranslation('congratulations', currentLanguage)}!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {getTranslation('courseCompletedDesc', currentLanguage)}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      {getTranslation('course', currentLanguage)}:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">{courseName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      {getTranslation('language', currentLanguage)}:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">{language}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      {getTranslation('topic', currentLanguage)}:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">{topic}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      {getTranslation('score', currentLanguage)}:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">{score}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleMarkComplete}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <TrophyIcon className="h-5 w-5 inline mr-2" />
                  {getTranslation('mintCompletionNFT', currentLanguage)}
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {getTranslation('autoProceedIn', currentLanguage)} {countdown}s
                </div>

                <button
                  onClick={handleSkip}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {getTranslation('skipAndContinue', currentLanguage)}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Minting */}
          {step === 'minting' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {getTranslation('mintingNFT', currentLanguage)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {getTranslation('pleaseWait', currentLanguage)}
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {getTranslation('nftMintedSuccess', currentLanguage)}!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {getTranslation('completionRecorded', currentLanguage)}
                </p>
                
                {mintResult && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                    <p className="text-green-800 dark:text-green-200">
                      {getTranslation('transactionHash', currentLanguage)}: {mintResult.txHash.slice(0, 10)}...
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleProceedToQuiz}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {getTranslation('proceedToQuiz', currentLanguage)}
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

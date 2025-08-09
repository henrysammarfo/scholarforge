import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { courseContent } from '../data/courseContent';
import { mintSkillNFT, isCorrectNetwork, switchToEduChain } from '../utils/blockchain';
import { useAccount, useNetwork } from 'wagmi';
import { useWalletClient } from 'wagmi';
import { 
  BookOpenIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function cleanMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
}

export default function Course() {
  const { navigateToLearn, navigateToDashboard, isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseProgress, setCourseProgress] = useState(0);
  const [courseMeta, setCourseMeta] = useState({ languageName: '', topicName: '', topicId: '', languageCode: '' });
  const [courseData, setCourseData] = useState(null);
  const [showNFTMinting, setShowNFTMinting] = useState(false);
  const [mintingNFT, setMintingNFT] = useState(false);
  const [nftMintResult, setNFTMintResult] = useState(null);
  const [showNetworkWarning, setShowNetworkWarning] = useState(false);

  // Load course data based on selected topic and language
  useEffect(() => {
    try {
      const langCode = localStorage.getItem('sf_selected_language_code') || 'en';
      const langName = localStorage.getItem('sf_selected_language_name') || 'English';
      const topicId = localStorage.getItem('sf_selected_topic_id') || 'culture';
      const topicName = localStorage.getItem('sf_selected_topic_name') || 'Cultural Studies';
      
      setCourseMeta({ 
        languageName: langName, 
        topicName: topicName,
        topicId: topicId,
        languageCode: langCode
      });

      // Get course content for this topic and language
      const content = courseContent[topicId];
      console.log('Loading course for:', { topicId, langCode, hasContent: !!content });
      
      if (content) {
        const languageContent = content[langCode] || content['en']; // Fallback to English
        console.log('Language content found:', !!languageContent);
        
        if (languageContent) {
          const newCourseData = {
            title: languageContent.title,
            language: langName,
            topic: topicName,
            description: languageContent.description,
            totalLessons: languageContent.lessons.length,
            estimatedTime: `${languageContent.lessons.length * 8} minutes`,
            difficulty: "Beginner",
            lessons: languageContent.lessons
          };
          console.log('Setting course data:', newCourseData.title);
          setCourseData(newCourseData);
        } else {
          console.warn('No language content found for:', langCode);
          setCourseData({
            title: "Language Not Available",
            language: langName,
            topic: topicName,
            description: `Course content is not available in ${langName}. Please try English.`,
            totalLessons: 1,
            estimatedTime: "5 minutes",
            difficulty: "Beginner",
            lessons: [{
              id: 1,
              title: "Language Not Available",
              content: `This course is not yet available in ${langName}. Please select English to continue.`,
              duration: "1 minute",
        type: "text"
            }]
          });
        }
      } else {
        console.warn('No content found for topic:', topicId);
        setCourseData({
          title: "Topic Not Found",
          language: langName,
          topic: topicName,
          description: "This topic is not yet available. Please try another topic.",
          totalLessons: 1,
          estimatedTime: "5 minutes",
          difficulty: "Beginner",
          lessons: [{
            id: 1,
            title: "Topic Not Available",
            content: "This course topic is not yet available. Please go back and select another topic.",
            duration: "1 minute",
        type: "text"
          }]
        });
      }
    } catch (error) {
      console.error('Error loading course data:', error);
    }
  }, []);

  useEffect(() => {
    if (courseData) {
    const progress = (completedLessons.length / courseData.totalLessons) * 100;
    setCourseProgress(progress);
      
      // Check if course is 100% completed for NFT minting
      if (progress === 100 && !showNFTMinting && !nftMintResult) {
        setShowNFTMinting(true);
        
        // Check network for NFT minting
        if (isConnected && chain) {
          setShowNetworkWarning(!isCorrectNetwork(chain.id));
        }
      }
    }
  }, [completedLessons, courseData, isConnected, chain]);



  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const goToNextLesson = () => {
    if (courseData && currentLesson < courseData.lessons.length - 1) {
      markLessonComplete(courseData.lessons[currentLesson].id);
      setCurrentLesson(currentLesson + 1);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const goToQuiz = () => {
    if (courseData) {
    markLessonComplete(courseData.lessons[currentLesson].id);
      
      // Store topic and language for quiz
      try {
        localStorage.setItem('sf_quiz_topic_id', courseMeta.topicId);
        localStorage.setItem('sf_quiz_language_code', courseMeta.languageCode);
      } catch {}
      
      window.location.href = '/quiz';
    }
  };

  const handleMintSkillNFT = async () => {
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
          handleMintSkillNFT(); // Retry after network switch
        }, 1000);
        return;
      } catch (error) {
        alert('Please switch to EduChain Testnet to mint your Skill NFT');
        return;
      }
    }

    setMintingNFT(true);
    try {
      const skillDetails = {
        skill: `${courseMeta.topicName} Expert`,
        level: "Proficient",
        topic: courseMeta.topicName,
        language: courseMeta.languageName,
        completionPercentage: 100
      };

      const result = await mintSkillNFT(walletClient, address, skillDetails);
      setNFTMintResult(result);

      if (result.success) {
        // Update local storage with NFT data
        try {
          const nftData = {
            tokenId: result.tokenId,
            skill: skillDetails.skill,
            level: skillDetails.level,
            topic: courseMeta.topicName,
            language: courseMeta.languageName,
            mintedAt: new Date().toISOString(),
            txHash: result.txHash
          };
          
          const existingNFTs = JSON.parse(localStorage.getItem('sf_skill_nfts') || '[]');
          existingNFTs.push(nftData);
          localStorage.setItem('sf_skill_nfts', JSON.stringify(existingNFTs));
          
          // Add NFT mint to recent activity
          const activity = {
            type: 'nft',
            title: `${skillDetails.skill} NFT`,
            language: courseMeta.languageName,
            xp: 100, // Bonus XP for NFT
            date: new Date().toLocaleString(),
            txHash: result.txHash
          };
          
          const recentActivity = JSON.parse(localStorage.getItem('sf_recent_activity') || '[]');
          recentActivity.unshift(activity);
          if (recentActivity.length > 10) recentActivity.pop();
          localStorage.setItem('sf_recent_activity', JSON.stringify(recentActivity));
        } catch {}
      }
    } catch (error) {
      setNFTMintResult({
        success: false,
        error: error.message || 'Failed to mint Skill NFT'
      });
    } finally {
      setMintingNFT(false);
    }
  };

  const currentLessonData = courseData ? courseData.lessons[currentLesson] : null;

  // Show loading state if course data is not loaded yet
  if (!courseData || !currentLessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Head>
          <title>Loading Course - ScholarForge</title>
        </Head>
        <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Course Content...</h1>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we load your course material.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Course: {courseMeta.topicName || courseData.title} - ScholarForge</title>
        <meta name="description" content={courseData.description} />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{courseMeta.topicName || courseData.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Language: {courseMeta.languageName || courseData.language}</p>
              
              {/* Course Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {courseData.estimatedTime}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  {courseData.totalLessons} lessons
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <StarIcon className="h-4 w-4 mr-2" />
                  {courseData.difficulty}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(courseProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${courseProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Lesson List */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Lessons</h3>
                {courseData.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      index === currentLesson
                        ? 'bg-primary-100 text-primary-900 border-l-4 border-primary-600'
                        : completedLessons.includes(lesson.id)
                        ? 'bg-success-50 text-success-900'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{lesson.title}</span>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircleIcon className="h-4 w-4 text-success-600" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{lesson.duration}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentLesson}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8"
            >
              {/* Lesson Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs mr-3">
                      Lesson {currentLesson + 1} of {courseData.totalLessons}
                    </span>
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {currentLessonData.duration}
                  </div>
                  {completedLessons.includes(currentLessonData.id) && (
                    <div className="flex items-center text-success-600">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentLessonData.title}
                </h1>
              </div>

              {/* Lesson Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-200 leading-relaxed">
                  {cleanMarkdown(currentLessonData.content)}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={goToPreviousLesson}
                  disabled={currentLesson === 0}
                  className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous Lesson
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={() => markLessonComplete(currentLessonData.id)}
                    className="bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                  
                  {currentLesson < courseData.lessons.length - 1 ? (
                    <button
                      onClick={goToNextLesson}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                    >
                      Next Lesson
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={goToQuiz}
                      className="bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors flex items-center"
                    >
                      Take Quiz
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* NFT Minting Modal */}
        {showNFTMinting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="mb-6">
                  <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Course Completed! 🎉
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    You've completed 100% of {courseMeta.topicName}. Mint your Skill NFT to prove your expertise!
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
                      Switch to EduChain Testnet to mint your Skill NFT
                    </p>
                    <button 
                      onClick={() => switchToEduChain().then(() => setShowNetworkWarning(false)).catch(() => {})}
                      className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700"
                    >
                      Switch Network
                    </button>
                  </motion.div>
                )}

                {/* NFT Minting Section */}
                {isConnected && !showNetworkWarning && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-purple-200 dark:border-gray-600">
                    <div className="flex items-center justify-center mb-4">
                      <SparklesIcon className="h-8 w-8 text-purple-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mint Skill NFT</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">NFT Details:</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <p><strong>Skill:</strong> {courseMeta.topicName} Expert</p>
                        <p><strong>Level:</strong> Proficient</p>
                        <p><strong>Language:</strong> {courseMeta.languageName}</p>
                        <p><strong>Completion:</strong> 100%</p>
                      </div>
                    </div>
                    
                    {!nftMintResult ? (
                      <button
                        onClick={handleMintSkillNFT}
                        disabled={mintingNFT}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {mintingNFT ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Minting NFT...
                          </>
                        ) : (
                          <>
                            <TrophyIcon className="h-5 w-5 mr-2" />
                            Mint Skill NFT
                          </>
                        )}
                      </button>
                    ) : nftMintResult.success ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center text-green-600">
                          <CheckCircleIcon className="h-6 w-6 mr-2" />
                          <span className="font-medium">Skill NFT Minted Successfully!</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded border text-xs">
                          <p className="text-gray-600 dark:text-gray-300 mb-1">Transaction Hash:</p>
                          <p className="font-mono text-gray-900 dark:text-white break-all">{nftMintResult.txHash}</p>
                          {nftMintResult.tokenId && (
                            <p className="text-gray-600 dark:text-gray-300 mt-2 mb-1">Token ID: {nftMintResult.tokenId}</p>
                          )}
                        </div>
                        <a 
                          href={`https://opencampus-codex.blockscout.com/tx/${nftMintResult.txHash}`}
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
                        <p className="text-sm text-red-600">{nftMintResult.error}</p>
                        <button
                          onClick={handleMintSkillNFT}
                          className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {!isConnected && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      💡 Connect your wallet to mint your Skill NFT on EduChain Testnet
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowNFTMinting(false)}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                  <button
                    onClick={navigateToDashboard}
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

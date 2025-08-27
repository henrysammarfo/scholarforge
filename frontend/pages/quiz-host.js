import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { useAccount } from 'wagmi';
import { enhancedLessonManager } from '../utils/enhancedLessonManager';
import { walletProfileManager } from '../utils/walletProfileManager';
import { 
  ClockIcon,
  TrophyIcon,
  UserGroupIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function QuizHost() {
  const { navigateToDashboard, isDark, setIsDark } = useNavigation();
  const { address, isConnected } = useAccount();
  
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizState, setQuizState] = useState('waiting'); // waiting, active, paused, ended
  const [timeLeft, setTimeLeft] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  // Load user's quizzes when wallet connects
  useEffect(() => {
    if (address && isConnected) {
      loadMyQuizzes();
    }
  }, [address, isConnected]);

  // Timer effect for active quizzes
  useEffect(() => {
    let interval;
    if (quizState === 'active' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState, timeLeft]);

  const loadMyQuizzes = () => {
    if (!address) return;
    
    const quizzes = enhancedLessonManager.getPersonalQuizzes(address);
    setMyQuizzes(quizzes);
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizState('active');
    setTimeLeft(quiz.timeLimit || 300); // Default 5 minutes
    setParticipants([]);
    setLeaderboard([]);
  };

  const pauseQuiz = () => {
    setQuizState('paused');
  };

  const resumeQuiz = () => {
    setQuizState('active');
  };

  const endQuiz = () => {
    setQuizState('ended');
    distributeXP();
  };

  const distributeXP = () => {
    if (!selectedQuiz || participants.length === 0) return;

    // Sort participants by score
    const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);
    
    // Distribute XP to top 3
    const xpRewards = [100, 50, 25]; // 1st, 2nd, 3rd place
    
    sortedParticipants.slice(0, 3).forEach((participant, index) => {
      const xpEarned = xpRewards[index];
      walletProfileManager.addXP(participant.walletAddress, xpEarned);
      
      // Update participant with XP earned
      participant.xpEarned = xpEarned;
      participant.rank = index + 1;
    });

    setLeaderboard(sortedParticipants);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuizStatusColor = (state) => {
    switch (state) {
      case 'waiting': return 'text-gray-500';
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'ended': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getQuizStatusIcon = (state) => {
    switch (state) {
      case 'waiting': return '⏳';
      case 'active': return '▶️';
      case 'paused': return '⏸️';
      case 'ended': return '🏁';
      default: return '⏳';
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect Your Wallet to Host Quizzes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You need to connect your wallet to create and host quizzes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Quiz Host - ScholarForge</title>
      </Head>
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quiz Host Dashboard
          </h1>
          <button
            onClick={() => setShowCreateQuiz(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create New Quiz</span>
          </button>
        </div>

        {/* Quiz Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Quizzes */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📝</span>
              My Quizzes
            </h2>
            
            {myQuizzes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  You haven't created any quizzes yet.
                </p>
                <button
                  onClick={() => setShowCreateQuiz(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                >
                  Create Your First Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {quiz.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getQuizStatusColor(quiz.state || 'waiting')}`}>
                          {getQuizStatusIcon(quiz.state || 'waiting')} {quiz.state || 'waiting'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>Time Limit: {Math.floor((quiz.timeLimit || 300) / 60)}m</span>
                      <span>XP Reward: {quiz.xpReward || 50}</span>
                      <span>Questions: {quiz.questions?.length || 0}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startQuiz(quiz)}
                        disabled={quizState === 'active'}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                      >
                        <PlayIcon className="w-4 h-4" />
                        <span>Start</span>
                      </button>
                      <button
                        onClick={() => setSelectedQuiz(quiz)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Quiz Control */}
          {selectedQuiz && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">🎮</span>
                Active Quiz: {selectedQuiz.title}
              </h2>
              
              <div className="space-y-4">
                {/* Quiz Status */}
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {quizState === 'active' ? formatTime(timeLeft) : '--:--'}
                  </div>
                  <div className={`text-sm font-medium ${getQuizStatusColor(quizState)}`}>
                    {getQuizStatusIcon(quizState)} {quizState.toUpperCase()}
                  </div>
                </div>

                {/* Quiz Controls */}
                <div className="flex space-x-2">
                  {quizState === 'waiting' && (
                    <button
                      onClick={() => startQuiz(selectedQuiz)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <PlayIcon className="w-5 h-5" />
                      <span>Start Quiz</span>
                    </button>
                  )}
                  
                  {quizState === 'active' && (
                    <>
                      <button
                        onClick={pauseQuiz}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <PauseIcon className="w-5 h-5" />
                        <span>Pause</span>
                      </button>
                      <button
                        onClick={endQuiz}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <StopIcon className="w-5 h-5" />
                        <span>End</span>
                      </button>
                    </>
                  )}
                  
                  {quizState === 'paused' && (
                    <button
                      onClick={resumeQuiz}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <PlayIcon className="w-5 h-5" />
                      <span>Resume</span>
                    </button>
                  )}
                </div>

                {/* Participants */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <UserGroupIcon className="w-5 h-5 mr-2" />
                    Participants ({participants.length})
                  </h3>
                  {participants.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No participants yet. Share the quiz link to invite people!
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {participants.map((participant, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700 dark:text-gray-300">
                            {participant.name || `Participant ${index + 1}`}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            Score: {participant.score || 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Leaderboard */}
                {quizState === 'ended' && leaderboard.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <TrophyIcon className="w-5 h-5 mr-2" />
                      Final Results
                    </h3>
                    <div className="space-y-2">
                      {leaderboard.slice(0, 3).map((participant, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {participant.name || `Participant ${index + 1}`}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                              Score: {participant.score}
                            </div>
                            <div className="text-green-600 dark:text-green-400 text-sm">
                              +{participant.xpEarned} XP
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Create Quiz Modal */}
        {showCreateQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Create New Quiz
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create quizzes from the Create Quiz page, then manage them here.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCreateQuiz(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowCreateQuiz(false);
                    window.location.href = '/create';
                  }}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                >
                  Go to Create Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

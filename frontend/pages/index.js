import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { 
  AcademicCapIcon, 
  GlobeAltIcon, 
  TrophyIcon, 
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const { navigateToLearn, navigateToDashboard, navigateToCommunity, navigateToCreate, isDark, setIsDark } = useNavigation();

  const features = [
    {
      icon: AcademicCapIcon,
      title: "Learn in Your Language",
      description: "Take quizzes in Twi, Yoruba, Swahili, and more African languages"
    },
    {
      icon: TrophyIcon,
      title: "Earn XP & NFTs",
      description: "Get rewarded with XP tokens and verifiable Skill NFTs"
    },
    {
      icon: UserGroupIcon,
      title: "Community Driven",
      description: "Contribute translations and earn from community tips"
    },
    {
      icon: GlobeAltIcon,
      title: "Offline First",
      description: "Learn anywhere, sync when you're online"
    },
    {
      icon: ShieldCheckIcon,
      title: "Onchain Credentials",
      description: "Verifiable achievements that can't be faked"
    },
    {
      icon: SparklesIcon,
      title: "Language Heroes",
      description: "Special recognition for top contributors in each language"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>ScholarForge - Learn Local, Earn Global</title>
        <meta name="description" content="Revolutionary onchain learning platform for African languages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Learn Local,
              <span className="text-primary-600"> Earn Global</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              The revolutionary onchain learning platform that empowers students to learn in their native languages, 
              earn verifiable credentials, and contribute to the global knowledge economy.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={navigateToLearn}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Start Learning
              </button>
              <button 
                onClick={navigateToDashboard}
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                View Dashboard
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ScholarForge?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're not just another learning app—we're building a movement to democratize education globally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1.3B+</div>
              <div className="text-primary-100">Students Globally</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">7+</div>
              <div className="text-primary-100">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-primary-100">Offline Capable</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$6T</div>
              <div className="text-primary-100">Education Market</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary-600 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the movement to make learning accessible, rewarding, and culturally relevant for everyone, everywhere.
          </p>
          <button 
            onClick={navigateToLearn}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AcademicCapIcon className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">ScholarForge</span>
            </div>
            <p className="text-gray-400">
              Learn Local, Earn Global 🌍🎓
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

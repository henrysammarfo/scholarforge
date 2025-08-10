import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  PlusIcon,
  WalletIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigation } from '../pages/_app';

export default function Header({ onToggleTheme, isDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isWalletConnected } = useNavigation();

  const navigation = [
    { name: 'Learn', href: '/learn', icon: BookOpenIcon },
    { name: 'Dashboard', href: '/dashboard', icon: AcademicCapIcon },
    { name: 'Community', href: '/community', icon: UserGroupIcon },
    { name: 'Create Quiz', href: '/create', icon: PlusIcon },
    { name: 'Create Lesson', href: '/create-lesson', icon: SparklesIcon },
    { name: 'Wallet', href: '/wallet', icon: WalletIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => window.location.href = '/'}
            >
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl group-hover:shadow-lg transition-all duration-300">
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">ScholarForge</span>
            </motion.div>
          </div>

          {/* Desktop Navigation - Only show when wallet is connected */}
          {isWalletConnected && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </nav>
          )}

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </motion.button>

            {/* Mobile menu button - Only show when wallet is connected */}
            {isWalletConnected && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            {/* Wallet Connect Button */}
            <div className="ml-2">
              <ConnectButton 
                chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }} 
                showBalance={false} 
                accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} 
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Only show when wallet is connected */}
        {isMenuOpen && isWalletConnected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

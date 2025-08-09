import Link from 'next/link';
import { useEffect } from 'react';
import { AcademicCapIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigation } from '../pages/_app';

export default function Header({ onToggleTheme, isDark }) {
  const { isWalletConnected } = useNavigation();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', !!isDark);
    }
  }, [isDark]);

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <AcademicCapIcon className="h-8 w-8 text-primary-600" />
            </Link>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">ScholarForge</span>
          </div>
          <div className="flex items-center space-x-4">
            {isWalletConnected && (
              <>
                <Link href="/learn" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Learn</Link>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Dashboard</Link>
                <Link href="/community" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Community</Link>
                <Link href="/create" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Create</Link>
                <Link href="/wallet" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Wallet</Link>
              </>
            )}
            <button onClick={onToggleTheme} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
              {isDark ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
            </button>
            <ConnectButton chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }} showBalance={false} accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} />
          </div>
        </div>
      </div>
    </nav>
  );
}

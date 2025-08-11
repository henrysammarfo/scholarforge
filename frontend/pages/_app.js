import '../styles/globals.css'
import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { WagmiConfig, configureChains, createConfig, useAccount } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, bsc, avalanche, celo, scroll, zkSync } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultWallets, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

// Global navigation context
const NavigationContext = createContext()

export function useNavigation() {
  return useContext(NavigationContext)
}

function buildChains() {
  const defaultChains = [mainnet, polygon, optimism, arbitrum, base, bsc, avalanche, celo, scroll, zkSync]
  const idStr = process.env.NEXT_PUBLIC_EDUCHAIN_ID
  const rpc = process.env.NEXT_PUBLIC_EDUCHAIN_RPC
  if (idStr && rpc) {
    const idNum = Number(idStr)
    const educhain = {
      id: idNum,
      name: 'EduChain',
      network: 'educhain',
      nativeCurrency: { name: 'EDU', symbol: 'EDU', decimals: 18 },
      rpcUrls: {
        default: { http: [rpc] },
        public: { http: [rpc] }
      }
    }
    return [educhain, ...defaultChains]
  }
  return defaultChains
}

const { chains, publicClient } = configureChains(
  buildChains(),
  [publicProvider()]
)

const { connectors } = getDefaultWallets({ appName: 'ScholarForge', projectId: 'scholarforge-demo', chains })

const wagmiConfig = createConfig({ autoConnect: true, connectors, publicClient })
const queryClient = new QueryClient()

function AppInner({ Component, pageProps, navigationValue, setIsWalletConnected }) {
  const { isConnected } = useAccount()
  useEffect(() => {
    setIsWalletConnected(!!isConnected)
  }, [isConnected, setIsWalletConnected])
  return (
    <NavigationContext.Provider value={navigationValue}>
      <Component {...pageProps} />
    </NavigationContext.Provider>
  )
}

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const router = useRouter()

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('scholarforge-theme')
    if (savedTheme) {
      const isDarkTheme = savedTheme === 'dark'
      setIsDark(isDarkTheme)
      // Apply theme to HTML element
      if (isDarkTheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Apply theme changes to HTML element and save to localStorage
  const handleThemeChange = (newTheme) => {
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('scholarforge-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('scholarforge-theme', 'light')
    }
  }

  const navigationValue = {
    user,
    setUser,
    isWalletConnected,
    setIsWalletConnected,
    isDark,
    setIsDark: handleThemeChange,
    router,
    navigateToLearn: () => router.push('/learn'),
    navigateToDashboard: () => router.push('/dashboard'),
    navigateToProfile: () => router.push('/profile'),
    navigateToCommunity: () => router.push('/community'),
    navigateToCreate: () => router.push('/create'),
    navigateHome: () => router.push('/')
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains} theme={isDark ? darkTheme() : lightTheme()}>
          <AppInner Component={Component} pageProps={pageProps} navigationValue={navigationValue} setIsWalletConnected={setIsWalletConnected} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

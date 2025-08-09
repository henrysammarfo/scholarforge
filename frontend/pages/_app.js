import '../styles/globals.css'
import { useState, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
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

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, bsc, avalanche, celo, scroll, zkSync],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({ appName: 'ScholarForge', projectId: 'scholarforge-demo', chains })

const wagmiConfig = createConfig({ autoConnect: true, connectors, publicClient })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const router = useRouter()

  const navigationValue = {
    user,
    setUser,
    isWalletConnected,
    setIsWalletConnected,
    isDark,
    setIsDark,
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
          <NavigationContext.Provider value={navigationValue}>
            <Component {...pageProps} />
          </NavigationContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

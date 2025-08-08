import '../styles/globals.css'
import { useState, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

// Global navigation context
const NavigationContext = createContext()

export function useNavigation() {
  return useContext(NavigationContext)
}

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const router = useRouter()

  const navigationValue = {
    user,
    setUser,
    isWalletConnected,
    setIsWalletConnected,
    router,
    navigateToLearn: () => router.push('/learn'),
    navigateToDashboard: () => router.push('/dashboard'),
    navigateToProfile: () => router.push('/profile'),
    navigateToCommunity: () => router.push('/community'),
    navigateToCreate: () => router.push('/create'),
    navigateHome: () => router.push('/')
  }

  return (
    <NavigationContext.Provider value={navigationValue}>
      <Component {...pageProps} />
    </NavigationContext.Provider>
  )
}

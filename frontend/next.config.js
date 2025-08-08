/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud'],
  },
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS_XP: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_XP,
    NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SKILL,
  },
}

module.exports = nextConfig

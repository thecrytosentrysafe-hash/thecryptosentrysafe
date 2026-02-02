import { IdCard, Layers, Bell, ArrowDown, ArrowLeftRight, Home, ArrowUp, Cog, Bot, CreditCard, ImageIcon, Smartphone, TrendingUp, Shield, Globe, Send, CheckCircle2, Lock, User, Users } from "lucide-react";

export const CRYPTO_ASSETS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    id: "bitcoin",
    balance: 0,
    icon_image: "/images/coins/btc.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "USDT",
    name: "Tether",
    id: "tether",
    balance: 0,
    icon_image: "/images/coins/usdt.png",
    network_image: "/images/coins/trx.png",
    network: "TRC20",
    on: true
  },
  {
    symbol: "USDT",
    name: "Tether",
    id: "tether",
    balance: 0,
    icon_image: "/images/coins/usdt.png",
    network_image: "/images/coins/bnb.png",
    network: "BNB",
    on: true
  },
  {
    symbol: "USDT",
    name: "Tether",
    id: "tether",
    balance: 0,
    icon_image: "/images/coins/usdt.png",
    network_image: "/images/coins/eth.png",
    network: "ERC20",
    on: true
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    id: "ethereum",
    balance: 0,
    icon_image: "/images/coins/eth.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "TRX",
    name: "Tron",
    id: "tron",
    balance: 0,
    icon_image: "/images/coins/trx.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    id: "binancecoin",
    balance: 0,
    icon_image: "/images/coins/bnb.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    id: "polkadot",
    balance: 0,
    icon_image: "/images/coins/dot.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    id: "bitcoin-cash",
    balance: 0,
    icon_image: "/images/coins/bch.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    id: "litecoin",
    balance: 0,
    icon_image: "/images/coins/ltc.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "XLM",
    name: "Stellar",
    id: "stellar",
    balance: 0,
    icon_image: "/images/coins/xlm.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "DASH",
    name: "Dash",
    id: "dash",
    balance: 0,
    icon_image: "/images/coins/dash.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    id: "dogecoin",
    balance: 0,
    icon_image: "/images/coins/doge.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "SOL",
    name: "Solana",
    id: "solana",
    balance: 0,
    icon_image: "/images/coins/sol.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "XDC",
    name: "XDC",
    id: "xdc",
    balance: 0,
    icon_image: "/images/coins/xdc.png",
    network_image: null,
    network: null,
    on: true
  },
  {
    symbol: "XRP",
    name: "Ripple",
    id: "ripple",
    balance: 0,
    icon_image: "/images/coins/xrp.png",
    network_image: null,
    network: null,
    on: true
  }
]

export const enum MenuItems {
  Wallet = "Wallet",
  Swap = "Swap",
  Send = "Send",
  Receive = "Receive",
  Referral = "Referrals",
  Settings = "Settings"
}
export const enum CryptoItems {
  Crypto = "Manage Crypto",
  Address = "Crypto Address",
  Notification = "Notification"
}

export const MENU_ITEMS = [
  { href: "/dashboard", icon: Home, label: MenuItems.Wallet },
  { href: "/swap", icon: ArrowLeftRight, label: MenuItems.Swap },
  { href: "#", icon: ArrowDown, label: MenuItems.Send, clickable: true },
  { href: "#", icon: ArrowUp, label: MenuItems.Receive, clickable: true },
  { href: "/referral", icon: Users, label: MenuItems.Referral },
  { href: "/settings", icon: Cog, label: MenuItems.Settings }
];

export const CRYPTO_ITEMS = [
  { href: "/crypto/manage", icon: Layers, label: CryptoItems.Crypto },
  { href: "/crypto/address", icon: IdCard, label: CryptoItems.Address },
  { href: "/notifications", icon: Bell, label: CryptoItems.Notification },
];

export const features = [
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Support for multiple blockchains including Ethereum, Binance Smart Chain, Polygon, and more.",
    tags: ["Ethereum", "BSC", "Polygon"],
    color: "purple",
  },
  {
    icon: TrendingUp,
    title: "DeFi Integration",
    description: "Direct access to decentralized exchanges, lending platforms, and yield farming opportunities.",
    tags: ["Swap", "Stake", "Farm"],
    color: "pink",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description:
      "Enterprise-grade security with multi-sig support, hardware wallet integration, and biometric authentication.",
    tags: ["2FA", "Multi-sig", "Biometric"],
    color: "purple",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Tracking",
    description: "Real-time portfolio monitoring with price alerts, performance analytics, and tax reporting tools.",
    tags: ["Analytics", "Alerts", "Reports"],
    color: "pink",
  },
  {
    icon: ImageIcon,
    title: "NFT Support",
    description: "Store, view, and manage your NFT collection with support for multiple marketplaces and chains.",
    tags: ["Gallery", "Trading", "Tracking"],
    color: "purple",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Access your wallet seamlessly across desktop, mobile, and browser extension platforms.",
    tags: ["Desktop", "Mobile", "Extension"],
    color: "pink",
  },
]

export const securityFeatures = [
  {
    icon: Lock,
    title: "Military-Grade Encryption",
    description:
      "Your private keys are encrypted using AES-256 encryption, the same standard used by military and financial institutions.",
  },
  {
    icon: CheckCircle2,
    title: "Multi-Factor Authentication",
    description:
      "Enhanced security with optional biometric authentication, hardware key support, and time-based OTP.",
  },
  {
    icon: Send,
    title: "Smart Contract Auditing",
    description:
      "Automatic scanning and verification of smart contracts before interaction to prevent malicious transactions.",
  },
]

export enum NotificationCategory {
  SWAP = "swap",
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BUY = "buy",
  RECEIVE = "recieve",
  KYC_UPDATE = "kyc_update",
  WALLET_CONNECT = "wallet_connect"
}

export const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "#", icon: ArrowDown, label: "Deposit", clickable: true },
  { href: "/swap", icon: ArrowLeftRight, label: "Swap" },
  { href: "/settings", icon: User, label: "Me" }
];
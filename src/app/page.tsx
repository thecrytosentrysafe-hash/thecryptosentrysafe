'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Shield, Globe, Zap, RefreshCw, Wallet, Fingerprint, Sparkles, ArrowRight, Menu, X, Sun, Moon, Twitter, Facebook, Instagram, Github, Send, ArrowUpRight, CreditCard, TrendingUp, ArrowDownLeft, Activity, Plus, PieChart, Landmark } from 'lucide-react'
import { cn } from '@/lib/utils'

function Home() {
    const [darkMode, setDarkMode] = useState(false)
    const [activeTab, setActiveTab] = useState('assets')
    const [walletTab, setWalletTab] = useState('portfolio')
    const [activeFaq, setActiveFaq] = useState<number | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem('darkMode')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const isDark = saved === 'true' || (saved === null && prefersDark)
        setDarkMode(isDark)
        document.documentElement.classList.toggle('dark', isDark)
    }, [])

    const toggleDarkMode = () => {
        const newDark = !darkMode
        setDarkMode(newDark)
        document.documentElement.classList.toggle('dark', newDark)
        localStorage.setItem('darkMode', newDark.toString())
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .dark ::-webkit-scrollbar-track {
            background: #1e293b;
          }
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          ::-webkit-scrollbar-thumb {
            background: #94a3b8;
            border-radius: 3px;
          }
          .dark ::-webkit-scrollbar-thumb {
            background: #475569;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
          .dark ::-webkit-scrollbar-thumb:hover {
            background: #334155;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          .dark .glass {
            background: rgba(15, 23, 42, 0.7);
          }
          .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-image: linear-gradient(to right, #0ea5e9, #0284c7);
          }
          .dark .text-gradient {
            background-image: linear-gradient(to right, #38bdf8, #0ea5e9);
          }
          * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          }
        `
            }} />
            <div className="antialiased bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-gray-100 font-sans">
                {/* Dark Mode Toggle Button */}
                <button
                    onClick={toggleDarkMode}
                    className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    title="Toggle Dark Mode"
                >
                    {darkMode ? (
                        <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <Moon className="w-5 h-5 text-blue-600" />
                    )}
                </button>

                {/* Navbar */}
                <nav className="sticky top-0 z-40 glass border-b border-slate-200 dark:border-gray-700 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center">
                                    <img src="/images/logo.png" alt="TheCryptoSentrySafe" width="400px" />
                                </div>
                            </div>

                            <div className="hidden md:flex items-center space-x-4">
                                <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors">
                                    Features
                                </a>
                                <a href="#wallet" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors">
                                    Wallet
                                </a>
                                <a href="#faq" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors">
                                    FAQ
                                </a>
                                <Link href="/login" className="text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Login
                                </Link>
                                <Link href="/register" className="ml-4 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-all">
                                    Register
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <MobileMenu />
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden bg-linear-to-b from-primary-50 dark:from-gray-800 to-white dark:to-gray-900">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-200 dark:bg-sky-800 rounded-full opacity-50 blur-3xl"></div>
                        <div className="absolute left-1/4 top-1/4 w-60 h-60 bg-sky-300 dark:bg-sky-700 rounded-full opacity-30 blur-3xl"></div>
                        <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-sky-100 dark:bg-sky-900 rounded-full opacity-40 blur-3xl"></div>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27%23E2E8F0%27%3E%3Cpath%20d=%27M0%20.5H31.5V32%27/%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27%23334155%27%3E%3Cpath%20d=%27M0%20.5H31.5V32%27/%3E%3C/svg%3E')] opacity-50"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 relative">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="space-y-6 sm:space-y-8 text-center md:text-left">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 text-sm font-medium">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    <span>Next Generation Crypto Wallet</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                    <span className="block text-slate-900 dark:text-gray-100">Manage Your</span>
                                    <span className="text-gradient text-4xl sm:text-5xl md:text-6xl">Digital Assets</span>
                                    <span className="block text-slate-900 dark:text-gray-100">With Confidence</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
                                    Experience a revolutionary way to manage your cryptocurrencies with unparalleled security, stunning visuals, and intuitive controls.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto md:mx-0">
                                    <Link href="/register" className="w-full sm:flex-1 px-6 py-3 text-center rounded-lg bg-sky-600 text-white font-medium shadow-lg hover:bg-sky-700 transition-all">Create Free Wallet</Link>
                                    <a href="#features" className="w-full sm:flex-1 px-6 py-3 text-center rounded-lg bg-white dark:bg-gray-800 text-sky-700 dark:text-sky-300 font-medium border border-sky-200 dark:border-sky-700 shadow-sm hover:bg-sky-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center">
                                        <span>Explore Features</span> <ArrowRight className="inline-block h-4 w-4 ml-1" />
                                    </a>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-600 dark:text-gray-400 text-sm">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-white">U{i}</div>)}
                                    </div>
                                    <span>Join 1M+ users worldwide</span>
                                </div>
                            </div>
                            {/* Interactive Wallet Preview */}
                            <div className="relative mt-8 md:mt-0">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-300 to-sky-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                                <div className="relative bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-3xl p-4 sm:p-6 shadow-2xl">
                                    {/* Wallet Header */}
                                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white"><Wallet className="h-4 w-4 sm:h-5 sm:w-5" /></div>
                                            <div><div className="font-medium text-sm sm:text-base text-slate-900 dark:text-gray-100">Main Wallet</div><div className="text-xs text-slate-500 dark:text-gray-400">Connected</div></div>
                                        </div>
                                        <div className="flex space-x-2"><div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-50 dark:bg-sky-900 flex items-center justify-center text-sky-500 dark:text-sky-400"><div className="w-2 h-2 rounded-full bg-green-400"></div></div></div>
                                    </div>
                                    {/* Balance */}
                                    <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-white shadow-lg">
                                        <div className="text-xs sm:text-sm text-sky-100 mb-1">Total Balance</div>
                                        <div className="text-2xl sm:text-3xl font-bold mb-1">$27,892.47</div>
                                        <div className="flex items-center text-green-300 text-xs sm:text-sm"><TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> +18.4% this week</div>
                                    </div>
                                    {/* Tabs */}
                                    <div className="mb-4 sm:mb-6 border-b border-slate-200 dark:border-gray-700 flex space-x-4">
                                        <button onClick={() => setActiveTab('assets')} className={`pb-2 px-1 font-medium text-xs sm:text-sm transition-colors flex items-center ${activeTab === 'assets' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-slate-500 dark:text-gray-400'}`}>
                                            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Assets
                                        </button>
                                        <button onClick={() => setActiveTab('activity')} className={`pb-2 px-1 font-medium text-xs sm:text-sm transition-colors flex items-center ${activeTab === 'activity' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-slate-500 dark:text-gray-400'}`}>
                                            <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Activity
                                        </button>
                                    </div>
                                    {/* Tab Content */}
                                    {activeTab === 'assets' && (
                                        <div className="space-y-3 sm:space-y-4">
                                            {[
                                                {
                                                    sym: 'BTC',
                                                    name: 'Bitcoin',
                                                    bal: '0.48 BTC',
                                                    val: '$14,302.40',
                                                    col: 'from-orange-500 to-yellow-500',
                                                    pct: '+2.4%',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,20 L10,18 L20,22 L30,15 L40,17 L50,10 L60,15 L70,8 L80,12 L90,5 L100,7" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,20 L10,18 L20,22 L30,15 L40,17 L50,10 L60,15 L70,8 L80,12 L90,5 L100,7 L100,30 L0,30 Z" fill="url(#btc-gradient-2)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="btc-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                },
                                                {
                                                    sym: 'ETH',
                                                    name: 'Ethereum',
                                                    bal: '3.72 ETH',
                                                    val: '$8,245.30',
                                                    col: 'from-blue-500 to-indigo-500',
                                                    pct: '+5.1%',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,15 L10,20 L20,10 L30,15 L40,12 L50,18 L60,8 L70,12 L80,5 L90,10 L100,3" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,15 L10,20 L20,10 L30,15 L40,12 L50,18 L60,8 L70,12 L80,5 L90,10 L100,3 L100,30 L0,30 Z" fill="url(#eth-gradient-2)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="eth-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                }
                                            ].map((coin, i) => (
                                                <div key={i} className="bg-slate-50 dark:bg-gray-700 rounded-xl p-3 border border-slate-200 dark:border-gray-600 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md transition-all">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${coin.col} flex items-center justify-center text-white text-xs font-bold`}>{coin.sym}</div>
                                                            <div>
                                                                <div className="font-medium text-sm text-slate-900 dark:text-gray-100">{coin.name}</div>
                                                                <div className="text-xs text-slate-500 dark:text-gray-400">{coin.bal}</div>
                                                            </div>
                                                        </div>
                                                        <button className="text-slate-400 dark:text-gray-500 hover:text-sky-500 dark:hover:text-sky-400">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    {/* Mini Chart */}
                                                    <div className="h-8 sm:h-12 mb-2 w-full">
                                                        {coin.chart}
                                                    </div>

                                                    <div className="flex justify-between items-end">
                                                        <div className="font-bold text-sm text-slate-900 dark:text-gray-100">{coin.val}</div>
                                                        <div className="text-xs text-green-500">{coin.pct}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {activeTab === 'activity' && (
                                        <div className="space-y-3">
                                            {/* Received Bitcoin */}
                                            <div className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-gray-600 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ArrowDownLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-gray-100">Received Bitcoin</div>
                                                        <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">2 hours ago • 0x3F8...9B2a</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-sm sm:text-base text-green-600 dark:text-green-500">+0.05 BTC</div>
                                                    <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">$1,502.25</div>
                                                </div>
                                            </div>

                                            {/* Sent Ethereum */}
                                            <div className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-gray-600 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-gray-100">Sent Ethereum</div>
                                                        <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Yesterday • 0x7A1...4C3d</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-sm sm:text-base text-red-600 dark:text-red-500">-1.2 ETH</div>
                                                    <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">$2,654.40</div>
                                                </div>
                                            </div>

                                            {/* Swapped */}
                                            <div className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-gray-600 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-gray-100">Swapped SOL → ETH</div>
                                                        <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">3 days ago</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-gray-100">-10 SOL</div>
                                                    <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">$950.00</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Actions */}
                                    <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-6">
                                        {['Send', 'Receive', 'Swap'].map(action => (
                                            <button key={action} className={cn("flex-1 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-gray-200 py-2 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center", action === "Send" && "bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700")}>
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="py-8 sm:py-12 border-y border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                            <div className="group">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 group-hover:text-gradient transition-all">1M+</div>
                                <p className="text-slate-600 dark:text-gray-400 mt-1 group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors text-sm sm:text-base">Active Users</p>
                            </div>
                            <div className="group">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 group-hover:text-gradient transition-all">50+</div>
                                <p className="text-slate-600 dark:text-gray-400 mt-1 group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors text-sm sm:text-base">Cryptocurrencies</p>
                            </div>
                            <div className="group">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 group-hover:text-gradient transition-all">$0</div>
                                <p className="text-slate-600 dark:text-gray-400 mt-1 group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors text-sm sm:text-base">Transaction Fees</p>
                            </div>
                            <div className="group">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 group-hover:text-gradient transition-all">100%</div>
                                <p className="text-slate-600 dark:text-gray-400 mt-1 group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors text-sm sm:text-base">Secure</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section id="features" className="py-16 sm:py-24 bg-slate-50 dark:bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full opacity-50 blur-3xl -z-10"></div>
                        <div className="absolute -left-20 bottom-0 w-80 h-80 bg-primary-200 dark:bg-primary-800 rounded-full opacity-30 blur-3xl -z-10"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-slate-900 dark:text-gray-100">Why Choose Our </span>
                                <span className="text-gradient">Wallet</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Experience the benefits of our secure and user-friendly cryptocurrency wallet.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            <FeatureCard icon={<Shield className="h-6 w-6 sm:h-7 sm:w-7" />} title="Quantum-Resistant Security" description="Our wallet uses post-quantum cryptography to ensure your assets remain secure even against future quantum computing threats." />
                            <FeatureCard icon={<Globe className="h-6 w-6 sm:h-7 sm:w-7" />} title="Multi-Chain Support" description="Seamlessly manage assets across 50+ blockchains in one unified interface with real-time cross-chain analytics." />
                            <FeatureCard icon={<Zap className="h-6 w-6 sm:h-7 sm:w-7" />} title="Lightning-Fast Transactions" description="Experience near-instant transactions with our optimized Layer-2 integration and advanced routing algorithms." />
                            <FeatureCard icon={<RefreshCw className="h-6 w-6 sm:h-7 sm:w-7" />} title="Automated DeFi Strategies" description="Set up custom yield farming strategies that automatically rebalance your portfolio for maximum returns." />
                            <FeatureCard icon={<Wallet className="h-6 w-6 sm:h-7 sm:w-7" />} title="Self-Custody Solution" description="Maintain complete control of your private keys with our advanced multi-signature and social recovery options." />
                            <FeatureCard icon={<Fingerprint className="h-6 w-6 sm:h-7 sm:w-7" />} title="Biometric Authentication" description="Secure your wallet with advanced biometric authentication including facial recognition and fingerprint scanning." />
                        </div>
                    </div>
                </section>

                {/* Advanced Wallet Interface Section */}
                <section id="wallet" className="py-16 sm:py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute left-0 top-1/3 w-96 h-96 bg-sky-50 dark:bg-sky-900 rounded-full opacity-70 blur-3xl -z-10"></div>
                        <div className="absolute right-0 bottom-0 w-80 h-80 bg-sky-100 dark:bg-sky-800 rounded-full opacity-50 blur-3xl -z-10"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-gradient">Advanced Wallet</span> <span className="text-slate-900 dark:text-gray-100"> Interface</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">Manage all your crypto assets in one place with our intuitive and secure wallet interface.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-gray-700 overflow-hidden">
                            <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Wallet className="h-5 w-5 sm:h-6 sm:w-6" /></div>
                                    <div><div className="text-xs sm:text-sm text-sky-100">Main Wallet</div><div className="text-xl sm:text-2xl font-bold">$27,892.47</div></div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm flex items-center"><Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Add Funds</button>
                                    <button className="bg-white text-sky-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-sky-50 flex items-center"><Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Send</button>
                                </div>
                            </div>
                            {/* Wallet Interface Tabs */}
                            <div className="border-b border-slate-200 dark:border-gray-700 flex overflow-x-auto">
                                <button onClick={() => setWalletTab('portfolio')} className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center ${walletTab === 'portfolio' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-slate-500 dark:text-gray-400'}`}><PieChart className="mr-1 h-3 w-3" /> Portfolio</button>
                                <button onClick={() => setWalletTab('assets')} className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center ${walletTab === 'assets' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-slate-500 dark:text-gray-400'}`}><CreditCard className="mr-1 h-3 w-3" /> Assets</button>
                                <button onClick={() => setWalletTab('activity')} className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center ${walletTab === 'activity' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-slate-500 dark:text-gray-400'}`}><Activity className="mr-1 h-3 w-3" /> Activity</button>
                            </div>
                            <div className="p-4 sm:p-6 min-h-[300px]">
                                {walletTab === 'portfolio' && (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Portfolio Value Chart */}
                                        <div className="lg:col-span-2 bg-slate-50 dark:bg-gray-700 rounded-xl p-4 border border-slate-200 dark:border-gray-600">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                                                <h3 className="font-medium text-slate-900 dark:text-gray-100 mb-2 sm:mb-0">Portfolio Value</h3>
                                                <div className="flex space-x-2">
                                                    <button className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">1D</button>
                                                    {['1W', '1M', '1Y'].map(t => (
                                                        <button key={t} className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors">{t}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-48 sm:h-64 mb-2">
                                                <svg viewBox="0 0 100 40" className="w-full h-full">
                                                    <path d="M0,30 L5,28 L10,29 L15,26 L20,27 L25,25 L30,24 L35,22 L40,23 L45,20 L50,18 L55,16 L60,17 L65,15 L70,13 L75,14 L80,12 L85,10 L90,11 L95,8 L100,5" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                    <path d="M0,30 L5,28 L10,29 L15,26 L20,27 L25,25 L30,24 L35,22 L40,23 L45,20 L50,18 L55,16 L60,17 L65,15 L70,13 L75,14 L80,12 L85,10 L90,11 L95,8 L100,5 L100,40 L0,40 Z" fill="url(#portfolio-gradient)" stroke="none"></path>
                                                    <defs>
                                                        <linearGradient id="portfolio-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="flex justify-between text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-2">
                                                <span>Apr 10</span>
                                                <span className="hidden sm:inline">Apr 15</span>
                                                <span>Apr 20</span>
                                                <span className="hidden sm:inline">Apr 25</span>
                                                <span>Apr 30</span>
                                                <span className="hidden sm:inline">May 5</span>
                                                <span>May 10</span>
                                            </div>
                                        </div>

                                        {/* Asset Allocation */}
                                        <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 border border-slate-200 dark:border-gray-600">
                                            <h3 className="font-medium text-slate-900 dark:text-gray-100 mb-4">Asset Allocation</h3>
                                            <div className="relative h-36 sm:h-48 mb-4">
                                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e2e8f0" strokeWidth="10" className="stroke-slate-200 dark:stroke-gray-600"></circle>
                                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#0ea5e9" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="141.4"></circle>
                                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#3b82f6" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="226.2" transform="rotate(90, 50, 50)"></circle>
                                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f59e0b" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="254.4" transform="rotate(180, 50, 50)"></circle>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-gray-100">$27,892</div>
                                                        <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Total Value</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {[
                                                    { label: "Bitcoin (50%)", val: "$14,302.40", color: "bg-sky-500" },
                                                    { label: "Ethereum (30%)", val: "$8,245.30", color: "bg-blue-500" },
                                                    { label: "Others (20%)", val: "$5,344.77", color: "bg-amber-500" },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                                                            <span className="text-xs sm:text-sm text-slate-700 dark:text-gray-300">{item.label}</span>
                                                        </div>
                                                        <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-gray-100">{item.val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {walletTab === 'assets' && (
                                    <div className="p-4 sm:p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                {
                                                    sym: 'BTC', name: 'Bitcoin', bal: '0.48 BTC', val: '$14,302.40', col: 'from-orange-500 to-yellow-500', pct: '+2.4%', pctColor: 'text-green-500',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,20 L10,18 L20,22 L30,15 L40,17 L50,10 L60,15 L70,8 L80,12 L90,5 L100,7" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,20 L10,18 L20,22 L30,15 L40,17 L50,10 L60,15 L70,8 L80,12 L90,5 L100,7 L100,30 L0,30 Z" fill="url(#btc-gradient-land)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="btc-gradient-land" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                },
                                                {
                                                    sym: 'ETH', name: 'Ethereum', bal: '3.72 ETH', val: '$8,245.30', col: 'from-blue-500 to-indigo-500', pct: '+5.1%', pctColor: 'text-green-500',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,15 L10,20 L20,10 L30,15 L40,12 L50,18 L60,8 L70,12 L80,5 L90,10 L100,3" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,15 L10,20 L20,10 L30,15 L40,12 L50,18 L60,8 L70,12 L80,5 L90,10 L100,3 L100,30 L0,30 Z" fill="url(#eth-gradient-land)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="eth-gradient-land" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                },
                                                {
                                                    sym: 'SOL', name: 'Solana', bal: '42.5 SOL', val: '$3,825.00', col: 'from-purple-500 to-pink-500', pct: '+12.3%', pctColor: 'text-green-500',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,25 L10,20 L20,22 L30,18 L40,15 L50,10 L60,12 L70,8 L80,10 L90,5 L100,7" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,25 L10,20 L20,22 L30,18 L40,15 L50,10 L60,12 L70,8 L80,10 L90,5 L100,7 L100,30 L0,30 Z" fill="url(#sol-gradient-land)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="sol-gradient-land" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                },
                                                {
                                                    sym: 'ADA', name: 'Cardano', bal: '520 ADA', val: '$624.00', col: 'from-blue-400 to-cyan-400', pct: '-1.2%', pctColor: 'text-red-500',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,15 L10,18 L20,14 L30,20 L40,16 L50,18 L60,15 L70,20 L80,16 L90,18 L100,14" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,15 L10,18 L20,14 L30,20 L40,16 L50,18 L60,15 L70,20 L80,16 L90,18 L100,14 L100,30 L0,30 Z" fill="url(#ada-gradient-land)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="ada-gradient-land" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                },
                                                {
                                                    sym: 'DOT', name: 'Polkadot', bal: '85 DOT', val: '$510.00', col: 'from-pink-400 to-red-400', pct: '+0.8%', pctColor: 'text-green-500',
                                                    chart: (
                                                        <svg viewBox="0 0 100 30" className="w-full h-full">
                                                            <path d="M0,20 L10,18 L20,22 L30,20 L40,24 L50,18 L60,22 L70,18 L80,20 L90,16 L100,18" fill="none" stroke="#0ea5e9" strokeWidth="2"></path>
                                                            <path d="M0,20 L10,18 L20,22 L30,20 L40,24 L50,18 L60,22 L70,18 L80,20 L90,16 L100,18 L100,30 L0,30 Z" fill="url(#dot-gradient-land)" stroke="none"></path>
                                                            <defs>
                                                                <linearGradient id="dot-gradient-land" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"></stop>
                                                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    )
                                                },
                                            ].map((coin, i) => (
                                                <div key={i} className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-4 border border-slate-200 dark:border-gray-600 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md transition-all">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${coin.col} flex items-center justify-center text-white text-xs font-bold`}>{coin.sym}</div>
                                                            <div>
                                                                <div className="font-medium text-sm text-slate-900 dark:text-gray-100">{coin.name}</div>
                                                                <div className="text-xs text-slate-500 dark:text-gray-400">{coin.bal}</div>
                                                            </div>
                                                        </div>
                                                        <button className="text-slate-400 dark:text-gray-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="h-12 sm:h-16 mb-2 w-full">
                                                        {coin.chart}
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-gray-100">{coin.val}</div>
                                                        <div className={`text-xs ${coin.pctColor}`}>{coin.pct}</div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Add New Asset Card */}
                                            <div className="bg-slate-50 dark:bg-gray-700/30 rounded-xl p-4 border-2 border-dashed border-slate-200 dark:border-gray-600 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-slate-100 dark:hover:bg-gray-700 transition-all flex flex-col items-center justify-center text-center h-full min-h-[160px]">
                                                <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                                                    <Plus className="h-6 w-6" />
                                                </div>
                                                <h4 className="font-medium text-slate-900 dark:text-gray-100 mb-1">Add New Asset</h4>
                                                <p className="text-xs text-slate-500 dark:text-gray-400 mb-3">Connect a new cryptocurrency to your wallet</p>
                                                <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-lg transition-colors">
                                                    Connect Asset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {walletTab === 'activity' && (
                                    <div className="space-y-3">
                                        {/* Received Bitcoin */}
                                        <div className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-4 border border-slate-200 dark:border-gray-600 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <ArrowDownLeft className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-gray-100">Received Bitcoin</div>
                                                    <div className="text-sm text-slate-500 dark:text-gray-400">2 hours ago • 0x3F8...9B2a</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900 dark:text-gray-100">-10 SOL</div>
                                                <div className="text-sm text-slate-500 dark:text-gray-400">$950.00</div>
                                            </div>
                                        </div>

                                        {/* Staked Cardano */}
                                        <div className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-4 border border-slate-200 dark:border-gray-600 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Landmark className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-gray-100">Staked Cardano</div>
                                                    <div className="text-sm text-slate-500 dark:text-gray-400">1 week ago</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900 dark:text-gray-100">-200 ADA</div>
                                                <div className="text-sm text-slate-500 dark:text-gray-400">$240.00</div>
                                            </div>
                                        </div>

                                        {/* Received Polkadot */}
                                        <div className="bg-slate-50 dark:bg-gray-700/50 rounded-xl p-4 border border-slate-200 dark:border-gray-600 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <ArrowDownLeft className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-gray-100">Received Polkadot</div>
                                                    <div className="text-sm text-slate-500 dark:text-gray-400">2 weeks ago • 0x9E2...7F1b</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600 dark:text-green-500">+25 DOT</div>
                                                <div className="text-sm text-slate-500 dark:text-gray-400">$150.00</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-primary-100 max-w-3xl mx-auto">ISO 20022 is a global financial messaging standard powering the future of cross-border payments and the Quantum Financial System (QFS). Key compliant assets like XRP, XDC, XLM, ALGO, and IOTA are set to play major roles in this transition. These aren't just cryptocurrencies they're the backbone of the new digital financial era. Register on the quantum system and store your assets in the QFS ledger wallet</p>
                        <Link href="/register" className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-primary-700 font-medium text-base sm:text-lg shadow-lg hover:bg-primary-50 transition-colors">
                            Create Your Wallet Now
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                <section id="faq" className="py-16 sm:py-24 bg-slate-50 dark:bg-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-gradient">Frequently Asked</span>
                                <span className="text-slate-900 dark:text-gray-100"> Questions</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Find answers to common questions about our wallet services.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <FaqItem
                                question="How secure is my wallet?"
                                answer="Our wallet uses quantum-resistant encryption and security measures. You retain full control of your private keys, and we implement multi-signature technology for enhanced protection. We also offer two-factor authentication, biometric security options, and hardware wallet integration."
                                isOpen={activeFaq === 1}
                                onToggle={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                            />
                            <FaqItem
                                question="What cryptocurrencies are supported?"
                                answer="We support over 50 cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), Solana (SOL), Cardano (ADA), and many more. We regularly add support for new currencies based on user demand and market trends."
                                isOpen={activeFaq === 2}
                                onToggle={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                            />
                            <FaqItem
                                question="Are there any fees for using the wallet?"
                                answer="Creating and maintaining a wallet is completely free. There are no fees for sending or receiving crypto within our wallet network. For transactions on blockchain networks, standard network fees apply, which go to miners/validators of those networks, not to us."
                                isOpen={activeFaq === 3}
                                onToggle={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                            />
                            <FaqItem
                                question="How do I recover my wallet if I lose my device?"
                                answer="During wallet setup, you'll receive a unique recovery phrase (seed phrase) that you should store securely offline. If you lose access to your device, you can use this recovery phrase to restore your wallet and all associated assets on a new device."
                                isOpen={activeFaq === 4}
                                onToggle={() => setActiveFaq(activeFaq === 4 ? null : 4)}
                            />
                            <FaqItem
                                question="Can I earn interest on my crypto holdings?"
                                answer="Yes, we offer various staking and yield farming options that allow you to earn interest on your crypto holdings. Rates vary by cryptocurrency and market conditions, with some assets earning up to 12% APY."
                                isOpen={activeFaq === 5}
                                onToggle={() => setActiveFaq(activeFaq === 5 ? null : 5)}
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 dark:bg-gray-800 text-white py-8 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">About Us</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Careers</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Blog</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Press</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Help Center</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Contact Us</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Community</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Status</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Privacy Policy</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Terms of Service</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Cookie Policy</a></li>
                                    <li><a href="#" className="text-slate-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-sm sm:text-base">Compliance</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Stay Updated</h3>
                                <p className="text-slate-300 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Subscribe to our newsletter for the latest updates.</p>
                                <form className="flex flex-col sm:flex-row gap-2">
                                    <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-slate-800 dark:bg-gray-700 text-white rounded-md border border-slate-700 dark:border-gray-600 focus:outline-none focus:border-primary-500 text-sm sm:text-base" />
                                    <button type="submit" className="bg-primary-600 px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <img src="/images/logo.png" alt="TheCryptoSentrySafe" className="filter brightness-0 invert" width="200px" />
                            </div>
                            <div className="mb-4 sm:mb-0">
                                <p className="text-slate-400 text-sm sm:text-base">&copy; 2026 TheCryptoSentrySafe. All rights reserved.</p>
                            </div>
                            <div className="flex space-x-4">
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

function MobileMenu() {
    const [open, setOpen] = useState(false)
    return (
        <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                <span className="sr-only">Open main menu</span>
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {open && (
                <div className="absolute top-16 right-0 left-0 glass border-b border-slate-200 dark:border-gray-700 shadow-lg z-50">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800">
                            Features
                        </a>
                        <a href="#wallet" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800">
                            Wallet
                        </a>
                        <a href="#faq" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800">
                            FAQ
                        </a>
                        <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800">
                            Login
                        </Link>
                        <Link href="/register" className="block mx-2 mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700 text-center">
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

// @ts-ignore
function FeatureCard({ icon, title, description }: any) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-primary-100/50 dark:hover:shadow-primary-900/30 transition-all group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-slate-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
            <p className="text-slate-600 dark:text-gray-400 mb-4 text-sm sm:text-base">{description}</p>
            <a href="#" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm sm:text-base">
                Learn more
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
    )
}

// @ts-ignore
function FaqItem({ question, answer, isOpen, onToggle }: any) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <button onClick={onToggle} className="flex justify-between w-full px-4 sm:px-6 py-3 sm:py-4 text-left">
                <span className="font-medium text-base sm:text-lg text-slate-900 dark:text-gray-100 pr-4">{question}</span>
                <ChevronDown className={`h-5 w-5 text-slate-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-slate-600 dark:text-gray-400 text-sm sm:text-base">
                    {answer}
                </div>
            )}
        </div>
    )
}

export default Home;
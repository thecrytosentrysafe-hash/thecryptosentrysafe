import SettingsClient from '@/components/clients/settings-client'
import { CRYPTO_ITEMS } from '@/constants'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

function Settings() {
  return (
    <div className="w-full min-h-screen p-4 transition-all duration-300 pb-24 md:pb-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-center flex-1">Settings</h1>
          <div className="w-6"></div>
        </div>

        {/* Main Settings Section */}
        <div className="space-y-0 bg-transparent rounded-lg transition-colors shadow-sm border border-gray-200">
          {CRYPTO_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 transition-colors"
              >
                <div
                  className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  <Icon color="blue" className="mr-3 text-gray-600 dark:text-gray-400 w-5" />
                  <span>{item.label}</span>
                </div>

                <ChevronRight color="gray" />
              </Link>
            )
          })}
        </div>

        <SettingsClient />
      </div>
    </div>
  )
}

export default Settings
'use client';

import { User } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

function ReferralClient({ user }: { user: User }) {
  const referral = user.UUID;
  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?referral_code=${referral}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join with my referral link',
          text: 'Use my referral link to join:',
          url: referralLink,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <main className="w-full max-w-5xl mx-auto p-4 pb-24 bg-white text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => history.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Referrals</h1>
        <div className="w-6" />
      </div>

      {/* Referral Stats */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Referrals" value={0} icon="👥" />
          <StatCard label="This Month" value={0} icon="📅" />
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Your Referral Link</h2>

        <div className="relative">
          <input
            readOnly
            value={referralLink}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center"
          >
            {copied ? '✓' : '⧉'}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Share this link with friends to earn rewards
        </p>
      </div>

      {/* Share Button */}
      <button
        onClick={shareReferralLink}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl mb-6"
      >
        Share Your Referral Link
      </button>

      {/* Recent Referrals */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Recent Referrals</h2>

        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-400">
            👥
          </div>
          <p className="font-medium text-gray-600">No referrals yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Share your referral link to get started
          </p>
        </div>
      </div>
    </main>
  );
}

export default ReferralClient

/* Small stat component */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center text-xl">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, Instagram, ExternalLink, Users, TrendingUp } from 'lucide-react';

interface SocialChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  description: string;
  color: string;
  hoverColor: string;
  comingSoon?: boolean;
}

const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Channel',
    icon: <MessageCircle size={20} />,
    url: 'https://whatsapp.com/channel/0029VaesYjiHgZWZT1NwWo1z',
    description: 'Join 500+ IMSC Students',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram size={20} />,
    url: 'https://www.instagram.com/sfi_imsc_subcommittee_cusat',
    description: '@sfi_imsc_subcommittee_cusat',
    color: 'bg-pink-600',
    hoverColor: 'hover:bg-pink-700',
  },
  {
    id: 'email',
    name: 'Email Us',
    icon: <Mail size={20} />,
    url: 'mailto:sfiimscsubcommittee25@gmail.com',
    description: 'sfiimscsubcommittee25@gmail.com',
    color: 'bg-crimson',
    hoverColor: 'hover:bg-red-700',
  },
];

interface SocialHubProps {
  variant?: 'vertical' | 'horizontal' | 'floating';
  showCounter?: boolean;
}

export default function SocialHub({ variant = 'vertical', showCounter = true }: SocialHubProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [memberCount, setMemberCount] = useState(500);

  // Simulate growing member count every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount(prev => prev + Math.floor(Math.random() * 5));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenChannel = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Floating variant (side-mounted)
  if (variant === 'floating') {
    return (
      <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-3">
        {/* Community Badge */}
        {showCounter && (
          <div className="bg-white rounded-lg shadow-lg p-3 border-2 border-crimson min-w-max">
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-crimson" />
              <span className="font-bold text-slate-navy">{memberCount}+ Students</span>
              <span className="text-xs text-slate-500">on WhatsApp</span>
            </div>
          </div>
        )}

        {/* Social Buttons */}
        {SOCIAL_CHANNELS.map(channel => (
          <button
            key={channel.id}
            onClick={() => handleOpenChannel(channel.url)}
            onMouseEnter={() => setActiveTooltip(channel.id)}
            onMouseLeave={() => setActiveTooltip(null)}
            className={`${channel.color} ${channel.hoverColor} text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 relative group`}
            title={channel.name}
          >
            {channel.icon}
            
            {/* Tooltip */}
            {activeTooltip === channel.id && (
              <div className="absolute right-full mr-3 bg-slate-navy text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-50">
                <div className="font-semibold">{channel.name}</div>
                <div className="text-xs text-slate-300">{channel.description}</div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-slate-navy"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Horizontal variant (footer-style)
  if (variant === 'horizontal') {
    return (
      <div className="border-t border-slate-200 py-6 mt-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-navy mb-2">
              🚀 Connect with the Collective
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              For live updates on campus politics, academic announcements, and student welfare initiatives
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {SOCIAL_CHANNELS.map(channel => (
              <button
                key={channel.id}
                onClick={() => handleOpenChannel(channel.url)}
                className={`${channel.color} ${channel.hoverColor} text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
              >
                {channel.icon}
                {channel.name}
                <ExternalLink size={16} />
              </button>
            ))}
          </div>

          {showCounter && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-300 rounded-lg px-4 py-2">
                <Users size={18} className="text-green-600" />
                <span className="text-sm font-semibold text-green-800">
                  {memberCount}+ IMSC Students on WhatsApp Channel
                </span>
                <TrendingUp size={16} className="text-green-600 animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default vertical variant
  return (
    <div className="space-y-3">
      {SOCIAL_CHANNELS.map(channel => (
        <button
          key={channel.id}
          onClick={() => handleOpenChannel(channel.url)}
          onMouseEnter={() => setActiveTooltip(channel.id)}
          onMouseLeave={() => setActiveTooltip(null)}
          className={`w-full ${channel.color} ${channel.hoverColor} text-white px-4 py-3 rounded-lg font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-lg relative group`}
        >
          {channel.icon}
          <div className="flex-1 text-left">
            <div className="font-semibold">{channel.name}</div>
            <div className="text-xs opacity-90">{channel.description}</div>
          </div>
          <ExternalLink size={16} className="opacity-75" />
        </button>
      ))}
    </div>
  );
}

'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  badge,
}: FeatureCardProps) {
  return (
    <div className="group relative p-6 rounded-none bg-white dark:bg-black border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-none bg-black text-white dark:bg-white dark:text-black flex items-center justify-center border border-black dark:border-white transition-transform duration-200 group-hover:scale-105">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border border-black/30 dark:border-white/30 text-black dark:text-white">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold uppercase tracking-wider text-black dark:text-white mb-2 font-teko text-2xl leading-none">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
        {description}
      </p>
    </div>
  );
}

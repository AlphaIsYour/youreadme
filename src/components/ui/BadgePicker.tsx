'use client';

import { useState, useMemo } from 'react';
import {
  badges,
  generateBadgeMarkdown,
  getBadgeCategories,
} from '@/data/badges';
import { Search, Copy, Check, X } from 'lucide-react';

interface BadgePickerProps {
  onInsert: (markdown: string) => void;
  onClose: () => void;
}

export default function BadgePicker({ onInsert, onClose }: BadgePickerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const categories = useMemo(() => ['All', ...getBadgeCategories()], []);

  const filtered = useMemo(() => {
    return badges.filter((b) => {
      const matchesSearch =
        !search ||
        b.label.toLowerCase().includes(search.toLowerCase()) ||
        b.message.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleInsert = (badge: (typeof badges)[0]) => {
    const md = generateBadgeMarkdown(badge);
    onInsert(md);
    setCopiedId(badge.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border-2 border-black dark:border-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              // CATALOG
            </span>
            <h2 className="font-teko text-3xl uppercase tracking-wider text-black dark:text-white leading-none">
              SHIELDS.IO BADGE HELPER
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-none border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-black/20 dark:border-white/20 bg-white dark:bg-black">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search badges (build, typescript, license...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-black/30 dark:border-white/30 rounded-none text-xs font-mono focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-none text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((badge) => {
              return (
                <button
                  key={badge.id}
                  onClick={() => handleInsert(badge)}
                  className="flex items-center gap-3 p-3 rounded-none border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white bg-white dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-left group"
                >
                  <img
                    src={`https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}${badge.logo ? `?logo=${badge.logo}` : ''}`}
                    alt={badge.label}
                    className="h-5 flex-shrink-0"
                  />
                  <span className="text-[10px] font-mono uppercase text-zinc-500 truncate flex-1">
                    {badge.category}
                  </span>
                  {copiedId === badge.id ? (
                    <Check className="w-4 h-4 text-black dark:text-white flex-shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-xs font-mono uppercase text-zinc-500">
              [ NO BADGES FOUND MATCHING QUERY ]
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Click any badge to inject markdown</span>
          <a
            href="https://shields.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white underline uppercase"
          >
            [ Shields.io Docs ]
          </a>
        </div>
      </div>
    </div>
  );
}

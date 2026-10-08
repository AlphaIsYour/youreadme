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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Badge Helper
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click a badge to insert it into your README
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search badges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((badge) => {
              return (
                <button
                  key={badge.id}
                  onClick={() => handleInsert(badge)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-left group"
                >
                  <img
                    src={`https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}${badge.logo ? `?logo=${badge.logo}` : ''}`}
                    alt={badge.label}
                    className="h-5 flex-shrink-0"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">
                    {badge.category}
                  </span>
                  {copiedId === badge.id ? (
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No badges found matching your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Badges powered by shields.io. You can also create custom badges at{' '}
            <a
              href="https://shields.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              shields.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

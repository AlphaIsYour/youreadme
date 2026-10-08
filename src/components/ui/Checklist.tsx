'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/types';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

interface ChecklistProps {
  items: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
}

export default function Checklist({ items, onChange }: ChecklistProps) {
  const [expanded, setExpanded] = useState(true);

  const toggle = (id: string) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const essential = items.filter((i) => i.category === 'essential');
  const recommended = items.filter((i) => i.category === 'recommended');
  const optional = items.filter((i) => i.category === 'optional');

  const checkedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;
  const percentage = Math.round((checkedCount / totalCount) * 100);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'essential':
        return 'text-red-600 dark:text-red-400';
      case 'recommended':
        return 'text-amber-600 dark:text-amber-400';
      case 'optional':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600';
    }
  };

  const renderCategory = (
    label: string,
    catItems: ChecklistItem[],
    category: string
  ) => (
    <div className="mb-4">
      <h4
        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${getCategoryColor(category)}`}
      >
        {label}
      </h4>
      <div className="space-y-1.5">
        {catItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className="flex items-start gap-2.5 w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            {item.checked ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors" />
            )}
            <div className="flex-1 min-w-0">
              <span
                className={`text-sm font-medium ${
                  item.checked
                    ? 'text-gray-400 dark:text-gray-500 line-through'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
                className="dark:stroke-gray-700"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  percentage >= 80
                    ? '#10b981'
                    : percentage >= 50
                      ? '#f59e0b'
                      : '#ef4444'
                }
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
              {percentage}%
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Best Practices
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {checkedCount}/{totalCount} completed
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800">
          <div className="pt-3">
            {renderCategory('Essential', essential, 'essential')}
            {renderCategory('Recommended', recommended, 'recommended')}
            {renderCategory('Optional', optional, 'optional')}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/types';
import { CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';

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

  const renderCategory = (label: string, catItems: ChecklistItem[]) => (
    <div className="mb-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 border-b border-black/10 dark:border-white/10 pb-1">
        // {label}
      </div>
      <div className="space-y-1">
        {catItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className="flex items-start gap-2.5 w-full text-left p-2 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
          >
            {item.checked ? (
              <CheckSquare className="w-4 h-4 text-black dark:text-white flex-shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-zinc-400 dark:text-zinc-600 flex-shrink-0 mt-0.5 group-hover:text-black dark:group-hover:text-white transition-colors" />
            )}
            <div className="flex-1 min-w-0">
              <span
                className={`text-xs font-mono ${
                  item.checked
                    ? 'text-zinc-400 dark:text-zinc-600 line-through'
                    : 'text-zinc-900 dark:text-zinc-100 font-medium'
                }`}
              >
                {item.label}
              </span>
              <p className="text-[11px] font-sans text-zinc-500 mt-0.5">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-black rounded-none border border-black dark:border-white/30 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-mono font-bold text-xs text-black dark:text-white">
            {percentage}%
          </div>
          <div className="text-left">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
              BEST PRACTICES AUDIT
            </h3>
            <p className="text-[11px] font-mono text-zinc-500">
              {checkedCount}/{totalCount} COMPLETED
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-black/20 dark:border-white/20 pt-3">
          {renderCategory('ESSENTIAL REQUIREMENTS', essential)}
          {renderCategory('RECOMMENDED ADDITIONS', recommended)}
          {renderCategory('OPTIONAL SECTIONS', optional)}
        </div>
      )}
    </div>
  );
}

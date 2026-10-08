'use client';

import { Template } from '@/types';
import { templates } from '@/data/templates';
import { X } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
  onClose: () => void;
}

export default function TemplateSelector({
  onSelect,
  onClose,
}: TemplateSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Choose a Template
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Start with a pre-built structure for your README
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className="flex items-start gap-4 w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-left group"
            >
              <span className="text-3xl flex-shrink-0">{template.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {template.sections.slice(0, 5).map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                      {s.title}
                    </span>
                  ))}
                  {template.sections.length > 5 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      +{template.sections.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={onClose}
            className="w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Start from scratch instead
          </button>
        </div>
      </div>
    </div>
  );
}

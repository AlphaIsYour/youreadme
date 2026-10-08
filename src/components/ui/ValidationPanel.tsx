'use client';

import { ValidationResult } from '@/types';
import {
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';

interface ValidationPanelProps {
  validation: ValidationResult;
}

export default function ValidationPanel({ validation }: ValidationPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const total = validation.errors.length + validation.warnings.length;

  if (total === 0) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Structure looks great!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Structure Issues ({total})
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 space-y-2 pt-3">
          {validation.errors.map((error, i) => (
            <div
              key={`e-${i}`}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30"
            >
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-700 dark:text-red-300">
                {error}
              </span>
            </div>
          ))}
          {validation.warnings.map((warning, i) => (
            <div
              key={`w-${i}`}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30"
            >
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-amber-700 dark:text-amber-300">
                {warning}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

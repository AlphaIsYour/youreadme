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
      <div className="bg-white dark:bg-black rounded-none border border-black dark:border-white/30 p-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-black dark:text-white" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-black dark:text-white">
            AST VALIDATION: 100% CLEAN
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black rounded-none border border-black dark:border-white/30 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-black dark:text-white" />
          <span className="text-xs font-mono uppercase font-bold tracking-wider text-black dark:text-white">
            STRUCTURE ISSUES ({total})
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-black/20 dark:border-white/20 space-y-2 pt-3">
          {validation.errors.map((error, i) => (
            <div
              key={`e-${i}`}
              className="flex items-start gap-2.5 p-2.5 rounded-none border border-black dark:border-white bg-zinc-50 dark:bg-zinc-900"
            >
              <XCircle className="w-4 h-4 text-black dark:text-white flex-shrink-0 mt-0.5" />
              <span className="text-xs font-mono text-black dark:text-white">
                [ERROR] {error}
              </span>
            </div>
          ))}
          {validation.warnings.map((warning, i) => (
            <div
              key={`w-${i}`}
              className="flex items-start gap-2.5 p-2.5 rounded-none border border-black/40 dark:border-white/40 bg-white dark:bg-black"
            >
              <AlertTriangle className="w-4 h-4 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                [WARN] {warning}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

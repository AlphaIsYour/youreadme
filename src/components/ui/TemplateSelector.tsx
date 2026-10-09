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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full max-w-xl overflow-hidden border-2 border-black dark:border-white">
        <div className="flex items-center justify-between p-5 border-b-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              // ARCHETYPES
            </span>
            <h2 className="font-teko text-3xl uppercase tracking-wider text-black dark:text-white leading-none">
              CHOOSE A TEMPLATE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-none border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className="flex items-start gap-4 w-full p-4 rounded-none border border-black/30 dark:border-white/30 hover:border-black dark:hover:border-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-left group"
            >
              <span className="text-3xl flex-shrink-0">{template.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-teko text-2xl uppercase tracking-wider text-black dark:text-white leading-none">
                  {template.name}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {template.sections.slice(0, 5).map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 text-[10px] font-mono uppercase rounded-none border border-black/20 dark:border-white/20 text-zinc-700 dark:text-zinc-300"
                    >
                      {s.title}
                    </span>
                  ))}
                  {template.sections.length > 5 && (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded-none border border-black/20 dark:border-white/20 text-zinc-500">
                      +{template.sections.length - 5} MORE
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900">
          <button
            onClick={onClose}
            className="w-full text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-black dark:hover:text-white transition-colors text-center"
          >
            [ Cancel & Return to Editor ]
          </button>
        </div>
      </div>
    </div>
  );
}

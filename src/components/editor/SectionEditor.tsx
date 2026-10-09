'use client';

import { Section } from '@/types';
import {
  GripVertical,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  FileText,
  Hash,
  Image,
  Download,
  Code,
  Layers,
  Map,
  HelpCircle,
  Scale,
  Heart,
  Puzzle,
  Award,
} from 'lucide-react';
import { useState } from 'react';

interface SectionEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  dragHandleProps?: Record<string, unknown>;
}

const sectionIcons: Record<string, React.ElementType> = {
  header: Hash,
  badges: Award,
  description: FileText,
  features: Puzzle,
  screenshots: Image,
  installation: Download,
  usage: Code,
  'tech-stack': Layers,
  roadmap: Map,
  contributing: Heart,
  faq: HelpCircle,
  license: Scale,
  acknowledgements: Heart,
  custom: FileText,
};

const sectionPlaceholders: Record<string, string> = {
  header: '',
  badges: '![Build](https://img.shields.io/badge/build-passing-black)',
  description: 'Describe what your project does and why it matters...',
  features: '- Feature one\n- Feature two\n- Feature three',
  screenshots: '![Screenshot](./screenshots/app.png)',
  installation: '```bash\nnpm install my-project\n```',
  usage: '```bash\nnpm start\n```',
  'tech-stack': '- **Frontend:** React\n- **Backend:** Node.js',
  roadmap: '- [x] Completed feature\n- [ ] Planned feature',
  contributing: '1. Fork the repo\n2. Create a branch\n3. Submit a PR',
  faq: '**Q: How do I install?**\nA: Run `npm install`',
  license: '',
  acknowledgements: '- [Library Name](url)',
  custom: 'Enter your custom content here...',
};

export default function SectionEditor({
  section,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  dragHandleProps,
}: SectionEditorProps) {
  const [collapsed, setCollapsed] = useState(false);
  const Icon = sectionIcons[section.type] || FileText;

  const handleChange = (field: keyof Section, value: string | boolean) => {
    onUpdate({ ...section, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-black rounded-none border border-black/25 dark:border-white/25 overflow-hidden transition-all duration-150 hover:border-black dark:hover:border-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border-b border-black/15 dark:border-white/15">
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-none transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-3.5 h-3.5 text-zinc-400" />
        </div>

        <Icon className="w-3.5 h-3.5 text-black dark:text-white flex-shrink-0" />

        <input
          type="text"
          value={section.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none"
          placeholder="SECTION TITLE..."
        />

        <div className="flex items-center gap-0.5 sm:gap-1">
          {onMoveUp && (
            <button
              onClick={onMoveUp}
              className="p-1 rounded-none hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Move Up"
            >
              <ArrowUp className="w-3.5 h-3.5 text-zinc-400 hover:text-black dark:hover:text-white" />
            </button>
          )}

          {onMoveDown && (
            <button
              onClick={onMoveDown}
              className="p-1 rounded-none hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Move Down"
            >
              <ArrowDown className="w-3.5 h-3.5 text-zinc-400 hover:text-black dark:hover:text-white" />
            </button>
          )}

          <button
            onClick={() => handleChange('enabled', !section.enabled)}
            className="p-1 rounded-none hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title={section.enabled ? 'Disable section' : 'Enable section'}
          >
            {section.enabled ? (
              <Eye className="w-3.5 h-3.5 text-black dark:text-white" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-none hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title={collapsed ? 'Expand section' : 'Collapse section'}
          >
            {collapsed ? (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          {section.type !== 'header' && section.type !== 'license' && (
            <button
              onClick={onDelete}
              className="p-1 rounded-none hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Delete section"
            >
              <Trash2 className="w-3.5 h-3.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!collapsed && section.enabled && (
        <div className="p-3 sm:p-4 bg-white dark:bg-black">
          {section.type === 'header' ? (
            <p className="text-xs font-mono text-zinc-500 uppercase">
              HEADER AUTO-COMPILED FROM PROJECT DETAILS
            </p>
          ) : section.type === 'license' ? (
            <p className="text-xs font-mono text-zinc-500 uppercase">
              LICENSE AUTO-COMPILED FROM PROJECT LICENSE
            </p>
          ) : (
            <textarea
              value={section.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder={
                sectionPlaceholders[section.type] || 'Enter content...'
              }
              rows={5}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-black/20 dark:border-white/20 rounded-none p-3 text-xs text-black dark:text-white font-mono leading-relaxed resize-y focus:outline-none focus:border-black dark:focus:border-white placeholder:text-zinc-500"
            />
          )}
          {section.type !== 'header' && section.type !== 'license' && (
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2">
              <span>MARKDOWN SUPPORTED (```, **, #)</span>
              <span>{section.content.length} CHARS</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

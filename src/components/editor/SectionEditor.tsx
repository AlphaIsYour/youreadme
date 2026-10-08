'use client';

import { Section } from '@/types';
import {
  GripVertical,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
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
  badges: '![Build](https://img.shields.io/badge/build-passing-brightgreen)',
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
  dragHandleProps,
}: SectionEditorProps) {
  const [collapsed, setCollapsed] = useState(false);
  const Icon = sectionIcons[section.type] || FileText;

  const handleChange = (field: keyof Section, value: string | boolean) => {
    onUpdate({ ...section, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />

        <input
          type="text"
          value={section.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none"
          placeholder="Section title..."
        />

        <div className="flex items-center gap-1">
          <button
            onClick={() => handleChange('enabled', !section.enabled)}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={section.enabled ? 'Disable section' : 'Enable section'}
          >
            {section.enabled ? (
              <Eye className="w-4 h-4 text-emerald-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {collapsed ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {section.type !== 'header' && section.type !== 'license' && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              title="Delete section"
            >
              <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!collapsed && section.enabled && (
        <div className="p-4">
          {section.type === 'header' ? (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Header is auto-generated from your project name and description
              above.
            </p>
          ) : section.type === 'license' ? (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              License section is auto-generated from the license field above.
            </p>
          ) : (
            <textarea
              value={section.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder={
                sectionPlaceholders[section.type] || 'Enter content...'
              }
              rows={6}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          )}
          {section.type !== 'header' && section.type !== 'license' && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Supports Markdown syntax. Use ``` for code blocks, **bold**,
              *italic*, etc.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Link from 'next/link';
import { Section, ProjectData, ChecklistItem, Template } from '@/types';
import { generateId } from '@/lib/utils';
import {
  generateMarkdown,
  validateHeadingStructure,
  getDefaultChecklist,
} from '@/lib/markdown';
import { templates } from '@/data/templates';
import SortableSection from '@/components/editor/SortableSection';
import MarkdownPreview from '@/components/preview/MarkdownPreview';
import BadgePicker from '@/components/ui/BadgePicker';
import TemplateSelector from '@/components/ui/TemplateSelector';
import ChecklistComponent from '@/components/ui/Checklist';
import ValidationPanel from '@/components/ui/ValidationPanel';
import Button from '@/components/ui/Button';
import {
  FileText,
  Download,
  Copy,
  Check,
  LayoutTemplate,
  Award,
  Settings,
  ChevronLeft,
  RotateCcw,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

export default function EditorPage() {
  const [project, setProject] = useState<ProjectData>({
    name: 'My Project',
    description:
      'A brief description of what this project does and why it matters.',
    version: '1.0.0',
    author: '',
    license: 'MIT',
    repository: '',
    homepage: '',
    keywords: [],
    sections: templates[0].sections,
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    getDefaultChecklist()
  );
  const [showBadgePicker, setShowBadgePicker] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showSidebar, setShowSidebar] = useState(true);
  const mountedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      if (mountedRef.current) {
        setMounted(true);
      }
    });
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const markdown = useMemo(() => generateMarkdown(project), [project]);
  const validation = useMemo(
    () => validateHeadingStructure(markdown),
    [markdown]
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProject((prev) => {
        const oldIndex = prev.sections.findIndex((s) => s.id === active.id);
        const newIndex = prev.sections.findIndex((s) => s.id === over.id);
        const reordered = arrayMove(prev.sections, oldIndex, newIndex).map(
          (s, i) => ({
            ...s,
            order: i,
          })
        );
        return { ...prev, sections: reordered };
      });
    }
  }, []);

  const updateSection = useCallback((updated: Section) => {
    setProject((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === updated.id ? updated : s)),
    }));
  }, []);

  const deleteSection = useCallback((id: string) => {
    setProject((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }));
  }, []);

  const addSection = useCallback(
    (type: Section['type']) => {
      const titles: Record<string, string> = {
        description: 'Description',
        features: 'Features',
        screenshots: 'Screenshots',
        installation: 'Installation',
        usage: 'Usage',
        'tech-stack': 'Tech Stack',
        roadmap: 'Roadmap',
        contributing: 'Contributing',
        faq: 'FAQ',
        acknowledgements: 'Acknowledgements',
        custom: 'Custom Section',
      };
      const newSection: Section = {
        id: generateId(),
        type,
        title: titles[type] || 'New Section',
        content: '',
        enabled: true,
        order: project.sections.length,
      };
      setProject((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
      }));
    },
    [project.sections.length]
  );

  const applyTemplate = useCallback((template: Template) => {
    setProject((prev) => ({
      ...prev,
      ...template.defaultProject,
      sections: template.sections.map((s) => ({ ...s, id: generateId() })),
    }));
    setShowTemplateSelector(false);
  }, []);

  const handleBadgeInsert = useCallback((markdown: string) => {
    setProject((prev) => {
      const badgeSection = prev.sections.find((s) => s.type === 'badges');
      if (badgeSection) {
        const newContent = badgeSection.content
          ? `${badgeSection.content}\n${markdown}`
          : markdown;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === badgeSection.id ? { ...s, content: newContent } : s
          ),
        };
      }
      // Add a badge section if none exists
      const newSection: Section = {
        id: generateId(),
        type: 'badges',
        title: 'Badges',
        content: markdown,
        enabled: true,
        order: 1,
      };
      return {
        ...prev,
        sections: [...prev.sections, newSection],
      };
    });
    setShowBadgePicker(false);
  }, []);

  const handleExport = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdown]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [markdown]);

  const handleReset = useCallback(() => {
    setProject({
      name: 'My Project',
      description:
        'A brief description of what this project does and why it matters.',
      version: '1.0.0',
      author: '',
      license: 'MIT',
      repository: '',
      homepage: '',
      keywords: [],
      sections: templates[0].sections.map((s) => ({ ...s, id: generateId() })),
    });
    setChecklist(getDefaultChecklist());
  }, []);

  const sectionIds = useMemo(
    () => project.sections.map((s) => s.id),
    [project.sections]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Home</span>
            </Link>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white hidden sm:inline">
                Eno README Lab
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplateSelector(true)}
              title="Templates"
            >
              <LayoutTemplate className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBadgePicker(true)}
              title="Badge Helper"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Badges</span>
            </Button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="hidden sm:inline text-emerald-500">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>
            <Button variant="primary" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export .md</span>
            </Button>
          </div>
        </div>

        {/* Mobile tab switcher */}
        <div className="flex md:hidden border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === 'editor'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === 'preview'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Preview
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`${
            activeTab === 'editor' ? 'flex' : 'hidden'
          } md:flex flex-col w-full md:w-1/2 lg:w-[55%] border-r border-gray-200 dark:border-gray-800`}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-4">
              {/* Project Info */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Project Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="My Project"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Version
                    </label>
                    <input
                      type="text"
                      value={project.version}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, version: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="1.0.0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      setProject((p) => ({ ...p, description: e.target.value }))
                    }
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white resize-none"
                    placeholder="A brief description of what this project does..."
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Author
                    </label>
                    <input
                      type="text"
                      value={project.author}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, author: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      License
                    </label>
                    <select
                      value={project.license}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, license: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    >
                      <option value="MIT">MIT</option>
                      <option value="Apache--2.0">Apache 2.0</option>
                      <option value="GPL--3.0">GPL 3.0</option>
                      <option value="BSD--3--Clause">BSD 3-Clause</option>
                      <option value="MPL--2.0">MPL 2.0</option>
                      <option value="Unlicense">Unlicense</option>
                      <option value="ISC">ISC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Repository URL
                    </label>
                    <input
                      type="text"
                      value={project.repository}
                      onChange={(e) =>
                        setProject((p) => ({
                          ...p,
                          repository: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Sections
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addSection(e.target.value as Section['type']);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  >
                    <option value="" disabled>
                      + Add Section
                    </option>
                    <option value="description">Description</option>
                    <option value="features">Features</option>
                    <option value="screenshots">Screenshots</option>
                    <option value="installation">Installation</option>
                    <option value="usage">Usage</option>
                    <option value="tech-stack">Tech Stack</option>
                    <option value="roadmap">Roadmap</option>
                    <option value="contributing">Contributing</option>
                    <option value="faq">FAQ</option>
                    <option value="acknowledgements">Acknowledgements</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sectionIds}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {project.sections
                      .sort((a, b) => a.order - b.order)
                      .map((section) => (
                        <SortableSection
                          key={section.id}
                          section={section}
                          onUpdate={updateSection}
                          onDelete={() => deleteSection(section.id)}
                        />
                      ))}
                  </div>
                </SortableContext>
              </DndContext>

              {project.sections.length === 0 && (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    No sections yet. Add a section or apply a template to get
                    started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className={`${
            activeTab === 'preview' ? 'flex' : 'hidden'
          } md:flex flex-col w-full md:w-1/2 lg:w-[45%] bg-white dark:bg-gray-900`}
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Preview
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              {markdown.length} chars
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <MarkdownPreview markdown={markdown} />
          </div>
        </div>

        {/* Right Sidebar */}
        {showSidebar && (
          <div className="hidden lg:block w-72 border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tools
                </span>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <PanelLeftClose className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <ValidationPanel validation={validation} />
              <ChecklistComponent items={checklist} onChange={setChecklist} />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="w-full justify-center text-gray-500"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </Button>
            </div>
          </div>
        )}

        {/* Sidebar toggle when hidden */}
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="hidden lg:flex fixed right-4 bottom-4 z-30 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
            title="Show tools panel"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Modals */}
      {showBadgePicker && (
        <BadgePicker
          onInsert={handleBadgeInsert}
          onClose={() => setShowBadgePicker(false)}
        />
      )}
      {showTemplateSelector && (
        <TemplateSelector
          onSelect={applyTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
    </div>
  );
}

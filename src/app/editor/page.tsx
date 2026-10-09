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
import Image from 'next/image';
import logoImg from '../../../public/reavas.png';
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
  Download,
  Copy,
  Check,
  LayoutTemplate,
  Award,
  ChevronLeft,
  RotateCcw,
  PanelLeftClose,
  PanelLeft,
  Sliders,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Columns2,
  FileCode,
  Eye,
  ChevronsUpDown,
} from 'lucide-react';

const STORAGE_KEY = 'reavas_draft_v1';

export default function EditorPage() {
  const [project, setProject] = useState<ProjectData>(() => {
    return {
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
    };
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    getDefaultChecklist()
  );
  const [showBadgePicker, setShowBadgePicker] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [previewTab, setPreviewTab] = useState<'rendered' | 'raw'>('rendered');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  // View Layout Modes: 'split' (50/50), 'wide-preview' (35/65), 'preview-full' (100% preview), 'editor-full' (100% editor)
  const [viewMode, setViewMode] = useState<
    'split' | 'wide-preview' | 'preview-full' | 'editor-full'
  >('split');

  const mountedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  // Load draft from localStorage on client mount
  useEffect(() => {
    mountedRef.current = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && Array.isArray(parsed?.sections)) {
          setProject(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
    setMounted(true);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      } catch {
        // Ignore storage errors
      }
    }
  }, [project, mounted]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const markdown = useMemo(() => generateMarkdown(project), [project]);
  const validation = useMemo(
    () => validateHeadingStructure(markdown),
    [markdown]
  );

  const stats = useMemo(() => {
    const chars = markdown.length;
    const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
    const lines = markdown.split('\n').length;
    const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
    return { chars, words, lines, readTimeMinutes };
  }, [markdown]);

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

  const moveSection = useCallback((id: string, direction: 'up' | 'down') => {
    setProject((prev) => {
      const sorted = [...prev.sections].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((s) => s.id === id);
      if (index < 0) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;
      const reordered = arrayMove(sorted, index, targetIndex).map((s, i) => ({
        ...s,
        order: i,
      }));
      return { ...prev, sections: reordered };
    });
  }, []);

  const toggleAllSections = useCallback((expand: boolean) => {
    setProject((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => ({ ...s, enabled: expand })),
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

  const handleBadgeInsert = useCallback((markdownBadge: string) => {
    setProject((prev) => {
      const badgeSection = prev.sections.find((s) => s.type === 'badges');
      if (badgeSection) {
        const newContent = badgeSection.content
          ? `${badgeSection.content}\n${markdownBadge}`
          : markdownBadge;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === badgeSection.id ? { ...s, content: newContent } : s
          ),
        };
      }
      const newSection: Section = {
        id: generateId(),
        type: 'badges',
        title: 'Badges',
        content: markdownBadge,
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
    if (window.confirm('Reset README draft to default starter template?')) {
      const defaultState: ProjectData = {
        name: 'My Project',
        description:
          'A brief description of what this project does and why it matters.',
        version: '1.0.0',
        author: '',
        license: 'MIT',
        repository: '',
        homepage: '',
        keywords: [],
        sections: templates[0].sections.map((s) => ({
          ...s,
          id: generateId(),
        })),
      };
      setProject(defaultState);
      localStorage.removeItem(STORAGE_KEY);
      setChecklist(getDefaultChecklist());
    }
  }, []);

  const sectionIds = useMemo(
    () => project.sections.map((s) => s.id),
    [project.sections]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center font-mono text-xs uppercase text-zinc-500">
        <div className="animate-pulse">Loading Reavas Studio...</div>
      </div>
    );
  }

  // Calculate layout column widths based on viewMode
  const getEditorColClass = () => {
    if (viewMode === 'preview-full') return 'hidden';
    if (viewMode === 'editor-full') return 'w-full';
    if (viewMode === 'wide-preview') return 'w-full md:w-[35%] lg:w-[35%]';
    return 'w-full md:w-1/2 lg:w-1/2'; // split
  };

  const getPreviewColClass = () => {
    if (viewMode === 'editor-full') return 'hidden';
    if (viewMode === 'preview-full') return 'w-full';
    if (viewMode === 'wide-preview') return 'w-full md:w-[65%] lg:w-[65%]';
    return 'w-full md:w-1/2 lg:w-1/2'; // split
  };

  return (
    <div className="h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col font-sans overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Navbar */}
      <header className="flex-none bg-white dark:bg-black border-b border-black/20 dark:border-white/20 z-30">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          {/* Logo & Back */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
            <Link
              href="/"
              className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 hover:text-black dark:hover:text-white transition-colors shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">[ Home ]</span>
            </Link>
            <div className="w-px h-3.5 bg-black/20 dark:bg-white/20 shrink-0" />
            <Link
              href="/"
              className="flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              <Image
                src={logoImg}
                alt="Reavas Logo"
                width={20}
                height={20}
                className="w-5 h-5 object-contain invert dark:invert-0 shrink-0"
              />
              <span className="font-teko text-xl sm:text-2xl uppercase tracking-wider text-black dark:text-white leading-none whitespace-nowrap">
                REAVAS STUDIO
              </span>
            </Link>
          </div>

          {/* Center: Desktop Layout Switcher Presets */}
          <div className="hidden md:flex items-center border border-black/20 dark:border-white/20 p-0.5 bg-zinc-50 dark:bg-zinc-900 text-[10px] font-mono shrink-0">
            <button
              onClick={() => setViewMode('editor-full')}
              className={`px-2 py-0.5 uppercase transition-colors whitespace-nowrap ${
                viewMode === 'editor-full'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
              title="Editor Only"
            >
              Editor
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-0.5 uppercase transition-colors whitespace-nowrap ${
                viewMode === 'split'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
              title="Split 50 / 50"
            >
              Split 50:50
            </button>
            <button
              onClick={() => setViewMode('wide-preview')}
              className={`px-2 py-0.5 uppercase transition-colors whitespace-nowrap ${
                viewMode === 'wide-preview'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
              title="Wide Preview (35% / 65%)"
            >
              Wide (65%)
            </button>
            <button
              onClick={() => setViewMode('preview-full')}
              className={`px-2 py-0.5 uppercase transition-colors whitespace-nowrap ${
                viewMode === 'preview-full'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
              title="Full Preview Only"
            >
              Preview
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateSelector(true)}
              title="Templates"
              className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBadgePicker(true)}
              title="Badge Helper"
              className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Badges</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExport}
              className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export .md</span>
            </Button>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden border-t border-black/20 dark:border-white/20 font-mono text-xs uppercase">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2 text-center transition-colors ${
              mobileTab === 'editor'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            [ Editor Form ]
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 text-center transition-colors ${
              mobileTab === 'preview'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            [ Live Preview ]
          </button>
        </div>
      </header>

      {/* Main Split Workspace */}
      <div className="max-w-[1200px] mx-auto w-full flex-1 flex overflow-hidden border-x border-black/20 dark:border-white/20 bg-white dark:bg-black">
        {/* Editor Column */}
        <div
          className={`${
            mobileTab === 'editor' ? 'flex' : 'hidden'
          } md:flex flex-col ${getEditorColClass()} border-r border-black/20 dark:border-white/20 h-full overflow-hidden`}
        >
          {/* Editor Header Bar */}
          <div className="flex-none flex items-center justify-between px-4 py-2 border-b border-black/15 dark:border-white/15 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-black dark:text-white">
                DOCUMENT BUILDER
              </span>
              <span className="text-[10px] text-zinc-500">
                ({project.sections.length} SECTIONS)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDetailsExpanded(!detailsExpanded)}
                className="text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1"
                title="Toggle Project Details"
              >
                <span>Details</span>
                {detailsExpanded ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Collapsible Project Metadata Card */}
            {detailsExpanded && (
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-black/20 dark:border-white/20 p-4 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-1.5">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-black dark:text-white" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      PROJECT SPECIFICATION
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    CORE META
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase mb-1">
                      PROJECT NAME *
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-xs focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white"
                      placeholder="My Project"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase mb-1">
                      VERSION
                    </label>
                    <input
                      type="text"
                      value={project.version}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, version: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-xs focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white"
                      placeholder="1.0.0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">
                    SHORT DESCRIPTION
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      setProject((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    rows={2}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-xs font-mono focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white resize-none"
                    placeholder="Brief description of project utility..."
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-2.5 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase mb-1">
                      AUTHOR
                    </label>
                    <input
                      type="text"
                      value={project.author}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, author: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-xs focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white"
                      placeholder="Organization"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase mb-1">
                      LICENSE
                    </label>
                    <select
                      value={project.license}
                      onChange={(e) =>
                        setProject((p) => ({ ...p, license: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-xs focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white"
                    >
                      <option value="MIT">MIT License</option>
                      <option value="Apache--2.0">Apache 2.0</option>
                      <option value="GPL--3.0">GPL 3.0</option>
                      <option value="BSD--3--Clause">BSD 3-Clause</option>
                      <option value="MPL--2.0">MPL 2.0</option>
                      <option value="Unlicense">Unlicense</option>
                      <option value="ISC">ISC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase mb-1">
                      REPO URL
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
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-xs focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sections Header Bar & Add Dropdown */}
            <div className="flex items-center justify-between border-b border-black/20 dark:border-white/20 pb-2 pt-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                DOCUMENT SECTIONS
              </span>

              <div className="flex items-center gap-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addSection(e.target.value as Section['type']);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white rounded-none text-xs font-mono uppercase font-bold tracking-wider focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>
                    + ADD SECTION
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
                  <option value="custom">Custom Section</option>
                </select>
              </div>
            </div>

            {/* Drag & Drop Reorderable List */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sectionIds}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 pb-8">
                  {project.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <SortableSection
                        key={section.id}
                        section={section}
                        onUpdate={updateSection}
                        onDelete={() => deleteSection(section.id)}
                        onMoveUp={() => moveSection(section.id, 'up')}
                        onMoveDown={() => moveSection(section.id, 'down')}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>

            {project.sections.length === 0 && (
              <div className="text-center py-12 border border-dashed border-black/20 dark:border-white/20 font-mono text-xs uppercase text-zinc-500">
                <p>[ NO SECTIONS ACTIVE ]</p>
                <p className="mt-1 text-[11px]">
                  Add a section above or load a template
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Live Markdown Preview Column */}
        <div
          className={`${
            mobileTab === 'preview' ? 'flex' : 'hidden'
          } md:flex flex-col ${getPreviewColClass()} bg-white dark:bg-black h-full overflow-hidden transition-all duration-200`}
        >
          {/* Preview Toolbar with Resize & Format Controls */}
          <div className="flex-none flex items-center justify-between px-3 sm:px-4 py-2 border-b border-black/15 dark:border-white/15 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs">
            {/* Left: Tab Switcher (Rendered vs Raw Markdown) */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewTab('rendered')}
                className={`flex items-center gap-1.5 px-2.5 py-1 uppercase text-[11px] transition-colors ${
                  previewTab === 'rendered'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Rendered</span>
              </button>
              <button
                onClick={() => setPreviewTab('raw')}
                className={`flex items-center gap-1.5 px-2.5 py-1 uppercase text-[11px] transition-colors ${
                  previewTab === 'raw'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <FileCode className="w-3 h-3" />
                <span>Raw .md</span>
              </button>
            </div>

            {/* Right: Stats & Column Maximize Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] text-zinc-500">
              <span className="hidden sm:inline">{stats.words} words</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{stats.chars} chars</span>

              {/* Instant Maximize / Expand Live Preview Column */}
              <div className="flex items-center border border-black/20 dark:border-white/20 p-0.5 ml-1">
                {viewMode === 'wide-preview' || viewMode === 'preview-full' ? (
                  <button
                    onClick={() => setViewMode('split')}
                    className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white flex items-center gap-1 text-[10px] uppercase font-bold"
                    title="Reset to Split 50:50"
                  >
                    <Minimize2 className="w-3 h-3" />
                    <span className="hidden lg:inline">Reset Size</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setViewMode('wide-preview')}
                    className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white flex items-center gap-1 text-[10px] uppercase font-bold"
                    title="Enlarge Live Markdown Column"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span className="hidden lg:inline">Enlarge Preview</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            {previewTab === 'rendered' ? (
              <MarkdownPreview markdown={markdown} />
            ) : (
              <div className="p-4 sm:p-6 font-mono text-xs leading-relaxed">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/10 text-[11px] text-zinc-500 uppercase">
                  <span>RAW MARKDOWN AST STRING</span>
                  <button
                    onClick={handleCopy}
                    className="text-black dark:text-white hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy All</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap break-words text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 p-4 border border-black/15 dark:border-white/15">
                  {markdown}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Audit Sidebar (Collapsible) */}
        {showSidebar && (
          <div className="hidden xl:block w-72 border-l border-black/20 dark:border-white/20 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
                  DIAGNOSTICS & AUDIT
                </span>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-1 rounded-none border border-transparent hover:border-black dark:hover:border-white transition-colors"
                >
                  <PanelLeftClose className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </div>

              <ValidationPanel validation={validation} />
              <ChecklistComponent items={checklist} onChange={setChecklist} />

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full justify-center text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <footer className="flex-none border-t border-black/20 dark:border-white/20 py-2 bg-zinc-50 dark:bg-zinc-950 font-mono text-[11px] text-zinc-500 uppercase z-20">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-black dark:text-white">
              <span className="w-1.5 h-1.5 bg-black dark:bg-white inline-block" />
              STATUS: SYNCED
            </span>
            <span>•</span>
            <span>{stats.lines} LINES</span>
            <span>•</span>
            <span>~{stats.readTimeMinutes}M READ TIME</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <PanelLeft className="w-3 h-3" />
              <span>{showSidebar ? 'Hide Audit' : 'Show Audit'}</span>
            </button>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={handleReset}
              className="hover:text-black dark:hover:text-white transition-colors hidden sm:inline"
            >
              [ Reset ]
            </button>
          </div>
        </div>
      </footer>

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

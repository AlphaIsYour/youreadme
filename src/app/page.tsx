'use client';

import Link from 'next/link';
import FeatureCard from '@/components/landing/FeatureCard';
import {
  FileText,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
  Download,
  GripVertical,
  Eye,
  Award,
  LayoutTemplate,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Eno{' '}
              <span className="text-emerald-600 dark:text-emerald-400">
                README Lab
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
            >
              Open Editor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Browser-based • No signup required
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
              Build{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                beautiful READMEs
              </span>{' '}
              in minutes
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              A polished README builder for open-source maintainers. Templates,
              live preview, drag-and-drop sections, badge helper, and best
              practices checklist — all in your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                Start Building
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-4 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-base hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                See Features
              </a>
            </div>
          </div>

          {/* Preview Mock */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">
                  README.md — Eno README Lab
                </span>
              </div>
              <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/20">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                    <div className="flex gap-2 mt-4">
                      <div className="h-5 bg-emerald-200 dark:bg-emerald-800 rounded-full w-20" />
                      <div className="h-5 bg-blue-200 dark:bg-blue-800 rounded-full w-16" />
                      <div className="h-5 bg-amber-200 dark:bg-amber-800 rounded-full w-24" />
                    </div>
                    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mt-4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="prose prose-sm dark:prose-invert">
                    <div className="text-center mb-4">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        My Awesome Project
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        A brief description of what this project does
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div>✓ Feature one</div>
                      <div>✓ Feature two</div>
                      <div>✓ Feature three</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24 bg-gray-50/50 dark:bg-gray-900/50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need for a great README
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for open-source maintainers who want professional
              documentation without the hassle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={
                <LayoutTemplate className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Smart Templates"
              description="Pre-built templates for web apps, libraries, CLI tools, and starter repos. Start with the right structure instantly."
            />
            <FeatureCard
              icon={
                <Eye className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Live Preview"
              description="See your README rendered in real-time as you type. No more guessing how your markdown will look."
            />
            <FeatureCard
              icon={
                <GripVertical className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Drag & Drop"
              description="Reorder sections with drag-and-drop. Organize your README exactly how you want it."
            />
            <FeatureCard
              icon={
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Badge Helper"
              description="Browse and insert badges for build status, version, license, and more. Powered by shields.io."
            />
            <FeatureCard
              icon={
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Best Practices"
              description="Built-in checklist ensures your README covers all essentials: description, install steps, license, and more."
            />
            <FeatureCard
              icon={
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Structure Validator"
              description="Heading structure validation catches common mistakes like skipped heading levels and missing H1 tags."
            />
            <FeatureCard
              icon={
                <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="One-Click Export"
              description="Download your finished README as a .md file or copy to clipboard. Ready to paste into your repo."
            />
            <FeatureCard
              icon={
                <Palette className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Dark Mode"
              description="Work comfortably in any lighting. Full dark mode support throughout the editor."
            />
            <FeatureCard
              icon={
                <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              }
              title="Section Blocks"
              description="Modular section system. Add, remove, enable, or disable any section. Full control over your README."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to a professional README.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose a template',
                description:
                  'Pick from web app, library, CLI tool, or starter template. Each comes with the right sections pre-configured.',
              },
              {
                step: '2',
                title: 'Fill in your content',
                description:
                  'Add your project details, features, installation steps, and more. The live preview shows exactly what you get.',
              },
              {
                step: '3',
                title: 'Export & publish',
                description:
                  'Download your README.md, copy to clipboard, or paste directly into your repository. Done!',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to build your README?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                No signup, no installation. Open the editor and start building a
                professional README for your project right now.
              </p>
              <Link
                href="/editor"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold text-base hover:bg-emerald-50 transition-all shadow-lg hover:-translate-y-0.5"
              >
                Open Editor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Eno README Lab
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built for open-source maintainers. 100% client-side. Your data
              never leaves your browser.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

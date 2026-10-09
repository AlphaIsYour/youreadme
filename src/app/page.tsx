'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../public/reavas.png';
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
  Lock,
} from 'lucide-react';

export default function LandingPage() {
  const marqueeItems = [
    'ZERO SIGNUP REQUIRED',
    '100% LOCAL-FIRST',
    'AST MARKDOWN COMPLIANT',
    'INSTANT TURBO EXPORT',
    'SHIELDS.IO CATALOG',
    'DRAG & DROP REORDERING',
    'HEADING STRUCTURE LINTING',
    'NO TRACKING COOKIES',
  ];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Banner / Ticker */}
      <div className="border-b border-black dark:border-white/20 bg-black text-white dark:bg-white dark:text-black py-1 px-3 sm:px-4 overflow-hidden text-[11px] sm:text-xs font-mono uppercase tracking-widest">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-1.5 h-1.5 bg-white dark:bg-black" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header / Navbar (max-w-[1200px]) */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-black dark:border-white/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <Image
              src={logoImg}
              alt="Reavas Logo"
              width={28}
              height={28}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain invert dark:invert-0"
              priority
            />
            <div className="flex flex-col">
              <span className="font-teko text-2xl sm:text-3xl uppercase tracking-wider leading-none text-black dark:text-white">
                REAVAS
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase leading-none">
                README STUDIO • v0.1
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-wider">
            <a
              href="#features"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              [ Features ]
            </a>
            <a
              href="#workflow"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              [ Workflow ]
            </a>
            <a
              href="#specs"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              [ Specs ]
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-none bg-black text-white dark:bg-white dark:text-black text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider border border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              Launch Studio
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content (max-w-[1200px]) */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-black dark:border-white/20 bg-grid-monochrome py-14 sm:py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 sm:mb-8 border border-black dark:border-white/30 bg-white dark:bg-zinc-950 text-[11px] sm:text-xs font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-black dark:bg-white animate-pulse-subtle" />
                <span>Zero Cloud Overhead • 100% Local-First Engine</span>
              </div>

              {/* Teko Headline - Proportionate & Elegant */}
              <h1 className="font-teko text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight text-black dark:text-white leading-[1.05] sm:leading-[1] mb-5 sm:mb-6">
                BUILD PRODUCTION-GRADE READMES IN SECONDS.
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed mb-8 sm:mb-10 px-2">
                A minimalist, developer-focused documentation workspace for
                open-source maintainers. Includes interactive templates, live
                markdown AST compilation, drag-and-drop hierarchy, and strict
                heading linting.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
                <Link
                  href="/editor"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-none bg-black text-white dark:bg-white dark:text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                >
                  START BUILDING FREE
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-none bg-white text-black dark:bg-black dark:text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  SYSTEM SPECS
                </a>
              </div>
            </div>

            {/* Metrics Ribbon (Proportionate, rounded: 0) */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 border border-black dark:border-white/20 divide-x divide-y lg:divide-y-0 divide-black dark:divide-white/20 bg-white dark:bg-black">
              {[
                {
                  val: '0.0s',
                  label: 'CLOUD LATENCY',
                  sub: 'Runs inside browser',
                },
                {
                  val: '100%',
                  label: 'PRIVATE DATA',
                  sub: 'Zero transmission',
                },
                {
                  val: '12+',
                  label: 'SECTION PRESETS',
                  sub: 'Pre-configured layouts',
                },
                {
                  val: '40+',
                  label: 'SHIELDS.IO BADGES',
                  sub: 'Instant markdown inject',
                },
              ].map((stat, i) => (
                <div key={i} className="p-4 sm:p-5 text-center">
                  <div className="font-teko text-3xl sm:text-4xl text-black dark:text-white leading-none font-bold">
                    {stat.val}
                  </div>
                  <div className="text-[11px] font-mono font-bold tracking-wider uppercase mt-1 text-black dark:text-white">
                    {stat.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-sans text-zinc-500 mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Workspace Mockup */}
            <div className="mt-10 sm:mt-12 border-2 border-black dark:border-white/30 bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              {/* Window Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b-2 border-black dark:border-white/30 bg-zinc-100 dark:bg-zinc-900 font-mono text-[11px] sm:text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-black dark:bg-white inline-block" />
                  <span className="w-2.5 h-2.5 border border-black dark:border-white inline-block" />
                  <span className="ml-1 font-bold tracking-wider uppercase text-black dark:text-white truncate">
                    WORKSPACE: README-COMPILER.MD
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:block">
                  LIVE AST ENGINE
                </div>
              </div>

              {/* Split Body */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-black dark:divide-white/30 font-mono text-xs">
                <div className="p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-950/80 space-y-3 sm:space-y-4 overflow-x-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-[10px] text-zinc-500 uppercase">
                    <span>STRUCTURED INPUT</span>
                    <span>TYPE: GFM_SPEC</span>
                  </div>
                  <div className="space-y-2 text-zinc-800 dark:text-zinc-300 text-[11px] sm:text-xs">
                    <p className="text-zinc-400"># Section 01: Hero</p>
                    <p className="p-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black">
                      &lt;div align=&quot;center&quot;&gt;
                      <br />
                      # HyperDrive Engine
                      <br />
                      **Next-generation distributed compute pipeline**
                    </p>
                    <p className="text-zinc-400"># Section 02: Badges</p>
                    <p className="p-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black">
                      ![Build](https://img.shields.io/badge/build-passing-black)
                      ![License](https://img.shields.io/badge/license-MIT-black)
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-white dark:bg-black space-y-3 sm:space-y-4 overflow-x-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-[10px] text-zinc-500 uppercase">
                    <span>RENDERED PREVIEW</span>
                    <span className="text-black dark:text-white font-bold">
                      ● VALIDATED H1-H3
                    </span>
                  </div>
                  <div className="text-center py-3 sm:py-4 border border-black/10 dark:border-white/10">
                    <h2 className="font-teko text-2xl sm:text-3xl uppercase tracking-wider text-black dark:text-white font-bold leading-none">
                      HYPERDRIVE ENGINE
                    </h2>
                    <p className="text-[11px] text-zinc-500 mt-1 font-sans">
                      Next-generation distributed compute pipeline
                    </p>
                    <div className="flex justify-center gap-2 mt-2.5">
                      <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-mono">
                        BUILD: PASSING
                      </span>
                      <span className="px-2 py-0.5 border border-black dark:border-white text-[10px] uppercase font-mono text-black dark:text-white">
                        LICENSE: MIT
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1 text-xs font-sans">
                    <div className="font-mono text-[11px] font-bold uppercase text-black dark:text-white">
                      ## ARCHITECTURE SPEC
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 text-xs">
                      <li>Zero runtime configuration</li>
                      <li>Automated AST tree validation</li>
                      <li>Strict semantic hierarchy enforcement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section (max-w-[1200px]) */}
        <section
          id="features"
          className="py-16 sm:py-20 border-b border-black dark:border-white/20 bg-white dark:bg-black"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-5 border-b border-black dark:border-white/20 gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  CAPABILITIES
                </span>
                <h2 className="font-teko text-3xl sm:text-4xl uppercase font-bold tracking-tight text-black dark:text-white mt-1 leading-none">
                  ENGINEERED FOR SPEED & RIGOR
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 max-w-md">
                Every tool needed to generate clean, standard-compliant READMEs
                without writing repetitive boilerplate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <FeatureCard
                badge="PRESET"
                icon={<LayoutTemplate className="w-5 h-5" />}
                title="Smart Archetypes"
                description="Pre-configured section blueprints for Web Apps, CLI tools, libraries, and microservices."
              />
              <FeatureCard
                badge="LIVE AST"
                icon={<Eye className="w-5 h-5" />}
                title="Real-Time Render"
                description="Instant synchronization between markdown form inputs and the GitHub Flavored Markdown preview."
              />
              <FeatureCard
                badge="DND-KIT"
                icon={<GripVertical className="w-5 h-5" />}
                title="Modular Hierarchy"
                description="Seamlessly reorder, enable, or disable README sections with accessible drag-and-drop interactions."
              />
              <FeatureCard
                badge="CATALOG"
                icon={<Award className="w-5 h-5" />}
                title="Badge Engine"
                description="Browse shields.io badges for build status, language tags, license, and coverage with automatic URL encoding."
              />
              <FeatureCard
                badge="LINTING"
                icon={<Zap className="w-5 h-5" />}
                title="Heading Structure Linter"
                description="Detects missing H1 tags, skipped heading levels (H1 to H3), and duplicate titles instantly."
              />
              <FeatureCard
                badge="STANDARDS"
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Best Practice Audit"
                description="Interactive checklist verifying essential sections: install commands, usage, and licenses."
              />
              <FeatureCard
                badge="1-CLICK"
                icon={<Download className="w-5 h-5" />}
                title="Deterministic Export"
                description="Download formatted README.md or copy raw markdown to clipboard with clean unix line endings."
              />
              <FeatureCard
                badge="DESIGN"
                icon={<Palette className="w-5 h-5" />}
                title="Monochrome Aesthetic"
                description="High-contrast, zero-distraction black and white workspace optimized for prolonged focus."
              />
              <FeatureCard
                badge="PRIVACY"
                icon={<Lock className="w-5 h-5" />}
                title="100% Client-Side"
                description="Zero server calls, zero database storage. All document data lives exclusively in your browser memory."
              />
            </div>
          </div>
        </section>

        {/* Workflow / How It Works (max-w-[1200px]) */}
        <section
          id="workflow"
          className="py-16 sm:py-20 border-b border-black dark:border-white/20 bg-zinc-50 dark:bg-zinc-950"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-14">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                SYSTEM PIPELINE
              </span>
              <h2 className="font-teko text-3xl sm:text-4xl uppercase font-bold tracking-tight text-black dark:text-white mt-1 leading-none">
                THREE STEPS TO PUBLISH
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: '01',
                  title: 'CHOOSE ARCHETYPE',
                  desc: 'Select from Web App, CLI, Library, or Minimalist archetypes with optimal section hierarchy.',
                },
                {
                  step: '02',
                  title: 'INPUT SPECIFICATIONS',
                  desc: 'Fill project meta, inject shields.io badges, and describe install/usage with markdown support.',
                },
                {
                  step: '03',
                  title: 'VERIFY & EXPORT',
                  desc: 'Run heading validator check, download README.md, and push directly to your Git repository.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 sm:p-8 border border-black dark:border-white/20 bg-white dark:bg-black rounded-none relative group hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all"
                >
                  <div className="font-teko text-3xl sm:text-4xl font-bold text-zinc-300 dark:text-zinc-700 leading-none mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {item.step}
                  </div>
                  <h3 className="font-teko text-2xl uppercase tracking-wider font-bold text-black dark:text-white mb-2 leading-none">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SaaS Callout / CTA (max-w-[1200px]) */}
        <section id="specs" className="py-16 sm:py-20 bg-white dark:bg-black">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-12 md:p-14 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              <div className="max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-widest opacity-80">
                  READY TO SHIP?
                </span>
                <h2 className="font-teko text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight leading-none mt-2 mb-3">
                  STOP WRITING READMES FROM SCRATCH.
                </h2>
                <p className="text-xs sm:text-sm font-sans opacity-80 leading-relaxed mb-6 sm:mb-8">
                  Get clean, compliant, and captivating documentation for your
                  repository right now. No dependencies to install, no accounts
                  to create.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/editor"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-none bg-white text-black dark:bg-black dark:text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-white dark:border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                  >
                    LAUNCH EDITOR STUDIO
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (max-w-[1200px]) */}
      <footer className="border-t border-black dark:border-white/20 py-8 sm:py-10 bg-white dark:bg-black">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <Image
                src="/reavas.png"
                alt="Reavas Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain invert dark:invert-0"
              />
              <span className="font-teko text-2xl uppercase tracking-wider text-black dark:text-white">
                REAVAS
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              100% CLIENT-SIDE • OPEN SOURCE • ZERO TELEMETRY
            </p>
            <div className="flex items-center gap-4 text-xs font-mono uppercase">
              <Link
                href="/editor"
                className="hover:underline text-black dark:text-white"
              >
                [ Editor ]
              </Link>
              <a
                href="https://github.com/AlphaIsYour/youralpha-08-eno-readme-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-black dark:text-white"
              >
                [ GitHub ]
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Badge } from '@/types';

export const badges: Badge[] = [
  // Build & CI
  {
    id: 'github-actions',
    label: 'Build',
    message: 'passing',
    color: 'brightgreen',
    logo: 'github-actions',
    category: 'Build & CI',
  },
  {
    id: 'travis',
    label: 'Build',
    message: 'passing',
    color: 'brightgreen',
    logo: 'travisci',
    category: 'Build & CI',
  },
  {
    id: 'circleci',
    label: 'Build',
    message: 'passing',
    color: 'brightgreen',
    logo: 'circleci',
    category: 'Build & CI',
  },
  {
    id: 'coverage-90',
    label: 'Coverage',
    message: '90%',
    color: 'brightgreen',
    category: 'Build & CI',
  },
  {
    id: 'coverage-80',
    label: 'Coverage',
    message: '80%',
    color: 'yellowgreen',
    category: 'Build & CI',
  },
  {
    id: 'tests-passing',
    label: 'Tests',
    message: 'passing',
    color: 'brightgreen',
    category: 'Build & CI',
  },

  // Version
  {
    id: 'version-semver',
    label: 'Version',
    message: '1.0.0',
    color: 'blue',
    category: 'Version',
  },
  {
    id: 'npm-version',
    label: 'npm',
    message: 'v1.0.0',
    color: 'cb3837',
    logo: 'npm',
    category: 'Version',
  },
  {
    id: 'pypi-version',
    label: 'PyPI',
    message: '1.0.0',
    color: '3776ab',
    logo: 'python',
    category: 'Version',
  },

  // License
  {
    id: 'license-mit',
    label: 'License',
    message: 'MIT',
    color: 'yellow',
    category: 'License',
  },
  {
    id: 'license-apache',
    label: 'License',
    message: 'Apache--2.0',
    color: 'yellow',
    category: 'License',
  },
  {
    id: 'license-gpl',
    label: 'License',
    message: 'GPL--3.0',
    color: 'yellow',
    category: 'License',
  },
  {
    id: 'license-bsd',
    label: 'License',
    message: 'BSD--3--Clause',
    color: 'yellow',
    category: 'License',
  },
  {
    id: 'license-mpl',
    label: 'License',
    message: 'MPL--2.0',
    color: 'yellow',
    category: 'License',
  },

  // Platform
  {
    id: 'platform-windows',
    label: 'Platform',
    message: 'Windows',
    color: '0078d6',
    logo: 'windows',
    category: 'Platform',
  },
  {
    id: 'platform-macos',
    label: 'Platform',
    message: 'macOS',
    color: '999999',
    logo: 'apple',
    category: 'Platform',
  },
  {
    id: 'platform-linux',
    label: 'Platform',
    message: 'Linux',
    color: 'fcc624',
    logo: 'linux',
    category: 'Platform',
  },
  {
    id: 'platform-cross',
    label: 'Platform',
    message: 'Cross--Platform',
    color: 'informational',
    category: 'Platform',
  },

  // Language
  {
    id: 'lang-js',
    label: 'Language',
    message: 'JavaScript',
    color: 'f7df1e',
    logo: 'javascript',
    logoColor: 'black',
    category: 'Language',
  },
  {
    id: 'lang-ts',
    label: 'Language',
    message: 'TypeScript',
    color: '3178c6',
    logo: 'typescript',
    category: 'Language',
  },
  {
    id: 'lang-python',
    label: 'Language',
    message: 'Python',
    color: '3776ab',
    logo: 'python',
    category: 'Language',
  },
  {
    id: 'lang-go',
    label: 'Language',
    message: 'Go',
    color: '00add8',
    logo: 'go',
    category: 'Language',
  },
  {
    id: 'lang-rust',
    label: 'Language',
    message: 'Rust',
    color: '000000',
    logo: 'rust',
    category: 'Language',
  },
  {
    id: 'lang-java',
    label: 'Language',
    message: 'Java',
    color: 'ed8b00',
    logo: 'openjdk',
    category: 'Language',
  },

  // Framework
  {
    id: 'fw-react',
    label: 'Made with',
    message: 'React',
    color: '61dafb',
    logo: 'react',
    logoColor: 'black',
    category: 'Framework',
  },
  {
    id: 'fw-nextjs',
    label: 'Made with',
    message: 'Next.js',
    color: '000000',
    logo: 'next.js',
    category: 'Framework',
  },
  {
    id: 'fw-vue',
    label: 'Made with',
    message: 'Vue.js',
    color: '4fc08d',
    logo: 'vue.js',
    category: 'Framework',
  },
  {
    id: 'fw-svelte',
    label: 'Made with',
    message: 'Svelte',
    color: 'ff3e00',
    logo: 'svelte',
    category: 'Framework',
  },
  {
    id: 'fw-tailwind',
    label: 'Styled with',
    message: 'Tailwind',
    color: '06b6d4',
    logo: 'tailwindcss',
    category: 'Framework',
  },

  // Social
  {
    id: 'stars',
    label: 'Stars',
    message: '⭐',
    color: 'yellow',
    url: 'https://github.com/user/repo/stargazers',
    category: 'Social',
  },
  {
    id: 'forks',
    label: 'Forks',
    message: '🍴',
    color: 'yellow',
    url: 'https://github.com/user/repo/network/members',
    category: 'Social',
  },
  {
    id: 'issues',
    label: 'Issues',
    message: '0',
    color: 'brightgreen',
    url: 'https://github.com/user/repo/issues',
    category: 'Social',
  },
  {
    id: 'prs',
    label: 'Pull Requests',
    message: '0',
    color: 'brightgreen',
    url: 'https://github.com/user/repo/pulls',
    category: 'Social',
  },
  {
    id: 'twitter',
    label: 'Tweet',
    message: 'Share',
    color: '1da1f2',
    logo: 'twitter',
    category: 'Social',
  },

  // Status
  {
    id: 'maintained',
    label: 'Maintained',
    message: 'yes',
    color: 'brightgreen',
    category: 'Status',
  },
  {
    id: 'deprecated',
    label: 'Status',
    message: 'deprecated',
    color: 'red',
    category: 'Status',
  },
  {
    id: 'beta',
    label: 'Status',
    message: 'beta',
    color: 'orange',
    category: 'Status',
  },
  {
    id: 'stable',
    label: 'Status',
    message: 'stable',
    color: 'brightgreen',
    category: 'Status',
  },
  {
    id: 'wip',
    label: 'Status',
    message: 'work in progress',
    color: 'yellow',
    category: 'Status',
  },

  // Support
  {
    id: 'buy-me-coffee',
    label: 'Buy Me A Coffee',
    message: '☕',
    color: 'FFDD00',
    logo: 'buymeacoffee',
    logoColor: 'black',
    url: 'https://buymeacoffee.com/username',
    category: 'Support',
  },
  {
    id: 'kofi',
    label: 'Support',
    message: 'Ko--fi',
    color: '29abe0',
    logo: 'ko-fi',
    category: 'Support',
  },
  {
    id: 'patreon',
    label: 'Support',
    message: 'Patreon',
    color: 'f96854',
    logo: 'patreon',
    category: 'Support',
  },
];

export function generateBadgeMarkdown(badge: Badge): string {
  // shields.io uses its own encoding: _ = space, -- = literal dash
  // Do NOT use encodeURIComponent — it breaks shields.io's format
  const shieldsUrl = `https://img.shields.io/badge/${badge.label}-${badge.message}-${badge.color}`;
  const params: string[] = [];
  if (badge.logo) params.push(`logo=${badge.logo}`);
  if (badge.logoColor) params.push(`logoColor=${badge.logoColor}`);
  const queryString = params.length > 0 ? `?${params.join('&')}` : '';
  const imgUrl = shieldsUrl + queryString;

  if (badge.url) {
    return `[![${badge.label}](${imgUrl})](${badge.url})`;
  }
  return `![${badge.label}](${imgUrl})`;
}

export function getBadgeCategories(): string[] {
  return [...new Set(badges.map((b) => b.category))];
}

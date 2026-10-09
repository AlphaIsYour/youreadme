import { describe, it, expect } from 'vitest';
import {
  generateMarkdown,
  validateHeadingStructure,
  getDefaultChecklist,
} from '../markdown';
import { ProjectData } from '@/types';

describe('generateMarkdown', () => {
  const baseProject: ProjectData = {
    name: 'Awesome Project',
    description: 'An awesome test project',
    version: '1.0.0',
    author: 'Author Name',
    license: 'MIT',
    repository: 'https://github.com/user/awesome-project',
    homepage: 'https://awesome-project.com',
    keywords: ['typescript', 'readme'],
    sections: [
      {
        id: '1',
        type: 'header',
        title: 'Header',
        content: '',
        enabled: true,
        order: 0,
      },
      {
        id: '2',
        type: 'description',
        title: 'Description',
        content: 'This is an awesome description.',
        enabled: true,
        order: 1,
      },
      {
        id: '3',
        type: 'features',
        title: 'Features',
        content: '- Fast\n- Reliable\n* Modern',
        enabled: true,
        order: 2,
      },
      {
        id: '4',
        type: 'license',
        title: 'License',
        content: '',
        enabled: true,
        order: 3,
      },
    ],
  };

  it('renders enabled sections in proper order', () => {
    const md = generateMarkdown(baseProject);

    expect(md).toContain('<div align="center">');
    expect(md).toContain('# Awesome Project');
    expect(md).toContain('**An awesome test project**');
    expect(md).toContain(
      '![Version](https://img.shields.io/badge/version-1.0.0-blue)'
    );
    expect(md).toContain(
      '![License](https://img.shields.io/badge/license-MIT-green)'
    );
    expect(md).toContain('## About\n\nThis is an awesome description.');
    expect(md).toContain('## Features\n\n- Fast\n- Reliable\n- Modern');
    expect(md).toContain('## License');
    expect(md).toContain('MIT License');
  });

  it('filters out disabled sections', () => {
    const project: ProjectData = {
      ...baseProject,
      sections: baseProject.sections.map((s) =>
        s.type === 'features' ? { ...s, enabled: false } : s
      ),
    };

    const md = generateMarkdown(project);
    expect(md).not.toContain('## Features');
    expect(md).toContain('## About');
  });

  it('sorts sections according to order property', () => {
    const project: ProjectData = {
      ...baseProject,
      sections: [
        {
          id: '2',
          type: 'description',
          title: 'Description',
          content: 'About first.',
          enabled: true,
          order: 2,
        },
        {
          id: '1',
          type: 'installation',
          title: 'Installation',
          content: 'npm install',
          enabled: true,
          order: 1,
        },
      ],
    };

    const md = generateMarkdown(project);
    const installIndex = md.indexOf('## Installation');
    const aboutIndex = md.indexOf('## About');

    expect(installIndex).toBeGreaterThan(-1);
    expect(aboutIndex).toBeGreaterThan(-1);
    expect(installIndex).toBeLessThan(aboutIndex);
  });

  it('handles custom section and tech-stack / usage / faq / contributing sections', () => {
    const project: ProjectData = {
      ...baseProject,
      name: 'Custom Project',
      sections: [
        {
          id: 'c1',
          type: 'tech-stack',
          title: 'Tech Stack',
          content: 'React, TypeScript, Next.js',
          enabled: true,
          order: 0,
        },
        {
          id: 'c2',
          type: 'usage',
          title: 'Usage',
          content: 'Run `npm run start` to begin.',
          enabled: true,
          order: 1,
        },
        {
          id: 'c3',
          type: 'faq',
          title: 'FAQ',
          content: 'Q: How to use?\nA: Just run it.',
          enabled: true,
          order: 2,
        },
        {
          id: 'c4',
          type: 'contributing',
          title: 'Contributing',
          content: 'Please see CONTRIBUTING.md',
          enabled: true,
          order: 3,
        },
        {
          id: 'c5',
          type: 'custom',
          title: 'My Custom Section',
          content: '### Custom Content\nHello world',
          enabled: true,
          order: 4,
        },
      ],
    };

    const md = generateMarkdown(project);
    expect(md).toContain('## Tech Stack\n\nReact, TypeScript, Next.js');
    expect(md).toContain('## Usage\n\nRun `npm run start` to begin.');
    expect(md).toContain('## FAQ\n\nQ: How to use?\nA: Just run it.');
    expect(md).toContain('## Contributing\n\nPlease see CONTRIBUTING.md');
    expect(md).toContain('### Custom Content\nHello world');
  });

  it('omits sections with whitespace-only content', () => {
    const project: ProjectData = {
      ...baseProject,
      name: 'Blank Sections',
      sections: [
        {
          id: 'b1',
          type: 'installation',
          title: 'Installation',
          content: '   \n\t  ',
          enabled: true,
          order: 0,
        },
      ],
    };

    const md = generateMarkdown(project);
    expect(md).toBe('');
  });
});

describe('validateHeadingStructure', () => {
  it('identifies valid markdown with single H1 and sequential headings', () => {
    const md = `# Title\n\n## Section 1\n\n### Subsection\n\n## Section 2`;
    const result = validateHeadingStructure(md);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('returns error when no H1 heading is present', () => {
    const md = `## Section 1\n\n### Subsection`;
    const result = validateHeadingStructure(md);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'No H1 heading found. A README should start with an H1 heading.'
    );
  });

  it('detects multiple H1 headings and adds a warning', () => {
    const md = `# Main Title\n\n## Section\n\n# Another Title`;
    const result = validateHeadingStructure(md);

    expect(result.valid).toBe(true);
    expect(
      result.warnings.some((w) => w.includes('Multiple H1 headings found'))
    ).toBe(true);
  });

  it('detects heading level skip (e.g. H1 to H3) and adds a warning', () => {
    const md = `# Main Title\n\n### Skipped Subsection`;
    const result = validateHeadingStructure(md);

    expect(result.valid).toBe(true);
    expect(
      result.warnings.some((w) => w.includes('Heading level skip detected'))
    ).toBe(true);
  });

  it('ignores headings inside code blocks (backticks or tildes)', () => {
    const md = `# Real Title\n\n\`\`\`markdown\n# Fake Title in Backticks\n### Fake Subtitle\n\`\`\`\n\n~~~bash\n# Fake Title in Tildes\n~~~\n\n## Real Section`;
    const result = validateHeadingStructure(md);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    // Should NOT warn about multiple H1s or heading level skip
    expect(result.warnings).toHaveLength(0);
  });

  it('warns when markdown contains no headings at all', () => {
    const md = `Just plain text without any markdown headers.`;
    const result = validateHeadingStructure(md);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'No H1 heading found. A README should start with an H1 heading.'
    );
    expect(result.warnings).toContain(
      'No headings found. Consider adding section headings for better structure.'
    );
  });
});

describe('getDefaultChecklist', () => {
  it('returns list of checklist items with essential, recommended, and optional categories', () => {
    const checklist = getDefaultChecklist();

    expect(checklist.length).toBeGreaterThan(0);
    expect(checklist.some((item) => item.id === 'name')).toBe(true);
    expect(checklist.some((item) => item.id === 'install')).toBe(true);
    expect(checklist.every((item) => !item.checked)).toBe(true);

    const categories = new Set(checklist.map((item) => item.category));
    expect(categories.has('essential')).toBe(true);
    expect(categories.has('recommended')).toBe(true);
    expect(categories.has('optional')).toBe(true);
  });
});

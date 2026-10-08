import { Section, ProjectData } from '@/types';

export function generateMarkdown(project: ProjectData): string {
  const parts: string[] = [];
  const enabledSections = project.sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  for (const section of enabledSections) {
    const md = renderSection(section, project);
    if (md.trim()) {
      parts.push(md);
    }
  }

  return parts.join('\n\n');
}

function renderSection(section: Section, project: ProjectData): string {
  switch (section.type) {
    case 'header':
      return renderHeader(project);
    case 'badges':
      return renderBadges(section);
    case 'description':
      return renderDescription(section);
    case 'features':
      return renderFeatures(section);
    case 'screenshots':
      return renderScreenshots(section);
    case 'installation':
      return renderInstallation(section);
    case 'usage':
      return renderUsage(section);
    case 'tech-stack':
      return renderTechStack(section);
    case 'roadmap':
      return renderRoadmap(section);
    case 'contributing':
      return renderContributing(section);
    case 'faq':
      return renderFAQ(section);
    case 'license':
      return renderLicense(project);
    case 'acknowledgements':
      return renderAcknowledgements(section);
    case 'custom':
      return section.content;
    default:
      return section.content;
  }
}

function renderHeader(project: ProjectData): string {
  let header = `<div align="center">\n\n`;
  header += `# ${project.name}\n\n`;
  if (project.description) {
    header += `**${project.description}**\n\n`;
  }
  if (project.version) {
    header += `![Version](https://img.shields.io/badge/version-${project.version}-blue) `;
  }
  if (project.license) {
    header += `![License](https://img.shields.io/badge/license-${project.license}-green) `;
  }
  header += `\n\n</div>`;
  return header;
}

function renderBadges(section: Section): string {
  if (!section.content.trim()) return '';
  return section.content;
}

function renderDescription(section: Section): string {
  if (!section.content.trim()) return '';
  return `## About\n\n${section.content}`;
}

function renderFeatures(section: Section): string {
  if (!section.content.trim()) return '';
  const lines = section.content.split('\n').filter((l) => l.trim());
  const items = lines.map((line) => {
    const clean = line.replace(/^[-*]\s*/, '').trim();
    return `- ${clean}`;
  });
  return `## Features\n\n${items.join('\n')}`;
}

function renderScreenshots(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Screenshots\n\n${section.content}`;
}

function renderInstallation(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Installation\n\n${section.content}`;
}

function renderUsage(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Usage\n\n${section.content}`;
}

function renderTechStack(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Tech Stack\n\n${section.content}`;
}

function renderRoadmap(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Roadmap\n\n${section.content}`;
}

function renderContributing(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Contributing\n\n${section.content}`;
}

function renderFAQ(section: Section): string {
  if (!section.content.trim()) return '';
  return `## FAQ\n\n${section.content}`;
}

function renderLicense(project: ProjectData): string {
  const license = project.license || 'MIT';
  return `## License\n\nThis project is licensed under the ${license} License. See the [LICENSE](LICENSE) file for details.`;
}

function renderAcknowledgements(section: Section): string {
  if (!section.content.trim()) return '';
  return `## Acknowledgements\n\n${section.content}`;
}

export function validateHeadingStructure(markdown: string): {
  valid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const lines = markdown.split('\n');
  let hasH1 = false;
  let lastLevel = 0;
  const headings: { level: number; text: string; line: number }[] = [];
  let isInCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('```') || line.startsWith('~~~')) {
      isInCodeBlock = !isInCodeBlock;
      continue;
    }

    if (isInCodeBlock) {
      continue;
    }

    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      headings.push({ level, text, line: i + 1 });

      if (level === 1) {
        if (hasH1) {
          warnings.push(
            `Line ${i + 1}: Multiple H1 headings found. Consider using only one H1.`
          );
        }
        hasH1 = true;
      }

      if (level > lastLevel + 1 && lastLevel > 0) {
        warnings.push(
          `Line ${i + 1}: Heading level skip detected (H${lastLevel} → H${level}). Consider using H${lastLevel + 1}.`
        );
      }

      lastLevel = level;
    }
  }

  if (!hasH1) {
    errors.push(
      'No H1 heading found. A README should start with an H1 heading.'
    );
  }

  if (headings.length === 0) {
    warnings.push(
      'No headings found. Consider adding section headings for better structure.'
    );
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}

export function getDefaultChecklist() {
  return [
    {
      id: 'name',
      label: 'Project name',
      description: 'Clear, memorable project name in the title',
      checked: false,
      category: 'essential' as const,
    },
    {
      id: 'desc',
      label: 'Description',
      description: 'One-paragraph description of what the project does',
      checked: false,
      category: 'essential' as const,
    },
    {
      id: 'badges',
      label: 'Status badges',
      description: 'Build status, version, license badges',
      checked: false,
      category: 'recommended' as const,
    },
    {
      id: 'install',
      label: 'Installation steps',
      description: 'Clear instructions to install and set up',
      checked: false,
      category: 'essential' as const,
    },
    {
      id: 'usage',
      label: 'Usage examples',
      description: 'Code examples or screenshots showing how to use',
      checked: false,
      category: 'essential' as const,
    },
    {
      id: 'license',
      label: 'License',
      description: 'Open source license specified',
      checked: false,
      category: 'essential' as const,
    },
    {
      id: 'contributing',
      label: 'Contributing guide',
      description: 'How others can contribute to the project',
      checked: false,
      category: 'recommended' as const,
    },
    {
      id: 'features',
      label: 'Feature list',
      description: 'Key features clearly listed',
      checked: false,
      category: 'recommended' as const,
    },
    {
      id: 'tech',
      label: 'Tech stack',
      description: 'Technologies and frameworks used',
      checked: false,
      category: 'recommended' as const,
    },
    {
      id: 'screenshots',
      label: 'Screenshots',
      description: 'Visual preview of the project',
      checked: false,
      category: 'recommended' as const,
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      description: 'Future plans and upcoming features',
      checked: false,
      category: 'optional' as const,
    },
    {
      id: 'faq',
      label: 'FAQ section',
      description: 'Answers to common questions',
      checked: false,
      category: 'optional' as const,
    },
    {
      id: 'changelog',
      label: 'Changelog',
      description: 'Version history or link to changelog',
      checked: false,
      category: 'optional' as const,
    },
    {
      id: 'coc',
      label: 'Code of conduct',
      description: 'Community behavior guidelines',
      checked: false,
      category: 'optional' as const,
    },
    {
      id: 'prerequisites',
      label: 'Prerequisites listed',
      description: 'System requirements and dependencies',
      checked: false,
      category: 'recommended' as const,
    },
    {
      id: 'toc',
      label: 'Table of contents',
      description: 'Navigation for longer READMEs',
      checked: false,
      category: 'optional' as const,
    },
  ];
}

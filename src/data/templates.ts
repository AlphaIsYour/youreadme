import { Template, Section } from '@/types';
import { generateId } from '@/lib/utils';

function makeSection(
  type: Section['type'],
  title: string,
  content: string,
  order: number,
  enabled = true
): Section {
  return { id: generateId(), type, title, content, enabled, order };
}

export const templates: Template[] = [
  {
    id: 'app',
    name: 'Web Application',
    description:
      'Full-stack or frontend web application with deployment instructions',
    icon: '🌐',
    sections: [
      makeSection('header', 'Header', '', 0),
      makeSection('badges', 'Badges', '', 1),
      makeSection(
        'description',
        'About',
        'A brief description of what this application does and the problem it solves.',
        2
      ),
      makeSection(
        'features',
        'Features',
        '- Feature one\n- Feature two\n- Feature three\n- Feature four',
        3
      ),
      makeSection(
        'screenshots',
        'Screenshots',
        '![App Screenshot](./screenshots/app.png)',
        4
      ),
      makeSection(
        'tech-stack',
        'Tech Stack',
        '- **Frontend:** React, TypeScript, Tailwind CSS\n- **Backend:** Node.js, Express\n- **Database:** PostgreSQL\n- **Deployment:** Vercel',
        5
      ),
      makeSection(
        'installation',
        'Getting Started',
        '**Prerequisites:**\n- Node.js 18+\n- npm or yarn\n\n**Installation:**\n\n```bash\ngit clone https://github.com/username/project.git\ncd project\nnpm install\nnpm run dev\n```',
        6
      ),
      makeSection(
        'usage',
        'Usage',
        '```bash\n# Example usage\nnpm start\n```\n\nVisit `http://localhost:3000` to view the application.',
        7
      ),
      makeSection(
        'roadmap',
        'Roadmap',
        '- [x] Feature one\n- [ ] Feature two\n- [ ] Feature three\n- [ ] Feature four',
        8
      ),
      makeSection(
        'contributing',
        'Contributing',
        'Contributions are welcome! Please follow these steps:\n\n1. Fork the repository\n2. Create a feature branch (`git checkout -b feature/amazing`)\n3. Commit your changes (`git commit -m "Add amazing feature"`)\n4. Push to the branch (`git push origin feature/amazing`)\n5. Open a Pull Request',
        9
      ),
      makeSection('license', 'License', '', 10, true),
    ],
    defaultProject: {
      name: 'My App',
      description: 'A modern web application',
      license: 'MIT',
    },
  },
  {
    id: 'library',
    name: 'Library / Package',
    description: 'Reusable library or npm/pip package with API documentation',
    icon: '📦',
    sections: [
      makeSection('header', 'Header', '', 0),
      makeSection('badges', 'Badges', '', 1),
      makeSection(
        'description',
        'About',
        'A lightweight, zero-dependency library for [purpose].',
        2
      ),
      makeSection(
        'features',
        'Features',
        '- Zero dependencies\n- TypeScript support\n- Tree-shakeable\n- Well-tested',
        3
      ),
      makeSection(
        'installation',
        'Installation',
        '```bash\nnpm install my-library\n```\n\nor\n\n```bash\nyarn add my-library\n```\n\nor\n\n```bash\npnpm add my-library\n```',
        4
      ),
      makeSection(
        'usage',
        'Quick Start',
        '```typescript\nimport { myFunction } from "my-library";\n\nconst result = myFunction({ /* options */ });\nconsole.log(result);\n```',
        5
      ),
      makeSection(
        'custom',
        'API Reference',
        '### `myFunction(options)`\n\n| Parameter | Type | Default | Description |\n|-----------|------|---------|-------------|\n| `input` | `string` | required | The input string |\n| `options.limit` | `number` | `10` | Max results |\n| `options.strict` | `boolean` | `false` | Enable strict mode |\n\n**Returns:** `Result[]`\n\n---\n\n### `helperUtil(data)`\n\nA helper utility for common operations.',
        6
      ),
      makeSection(
        'tech-stack',
        'Built With',
        '- TypeScript\n- Vitest for testing\n- Rollup for bundling',
        7
      ),
      makeSection(
        'roadmap',
        'Roadmap',
        '- [ ] v1.0 - Core functionality\n- [ ] v1.1 - Additional helpers\n- [ ] v2.0 - Breaking improvements',
        8
      ),
      makeSection(
        'contributing',
        'Contributing',
        'See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.',
        9
      ),
      makeSection('license', 'License', '', 10, true),
    ],
    defaultProject: {
      name: 'my-library',
      description: 'A lightweight utility library',
      license: 'MIT',
    },
  },
  {
    id: 'cli',
    name: 'CLI Tool',
    description: 'Command-line tool with usage examples and configuration',
    icon: '⌨️',
    sections: [
      makeSection('header', 'Header', '', 0),
      makeSection('badges', 'Badges', '', 1),
      makeSection(
        'description',
        'About',
        'A fast, configurable command-line tool for [purpose].',
        2
      ),
      makeSection(
        'screenshots',
        'Demo',
        '```bash\n$ my-cli --help\n\n  Usage: my-cli [options] [command]\n\n  A powerful CLI tool\n\n  Options:\n    -V, --version     output the version number\n    -h, --help        display help\n\n  Commands:\n    init              Initialize a new project\n    build             Build the project\n    deploy            Deploy to production\n```',
        3
      ),
      makeSection(
        'installation',
        'Installation',
        '**Global install:**\n\n```bash\nnpm install -g my-cli\n```\n\n**Or use with npx:**\n\n```bash\nnpx my-cli init\n```',
        4
      ),
      makeSection(
        'usage',
        'Usage',
        '```bash\n# Initialize a new project\nmy-cli init my-project\n\n# Build with options\nmy-cli build --target production --output ./dist\n\n# Deploy\nmy-cli deploy --env staging\n```',
        5
      ),
      makeSection(
        'custom',
        'Configuration',
        'Create a `my-cli.config.js` file:\n\n```javascript\nmodule.exports = {\n  // Configuration options\n  target: "production",\n  output: "./dist",\n  plugins: [],\n};\n```',
        6
      ),
      makeSection(
        'custom',
        'Commands',
        '| Command | Description |\n|---------|-------------|\n| `init` | Initialize a new project |\n| `build` | Build the project |\n| `deploy` | Deploy to production |\n| `config` | Manage configuration |',
        7
      ),
      makeSection(
        'contributing',
        'Contributing',
        'See [CONTRIBUTING.md](CONTRIBUTING.md).',
        8
      ),
      makeSection('license', 'License', '', 9, true),
    ],
    defaultProject: {
      name: 'my-cli',
      description: 'A powerful command-line tool',
      license: 'MIT',
    },
  },
  {
    id: 'template',
    name: 'Template / Starter',
    description: 'Boilerplate or starter template for quick project setup',
    icon: '📋',
    sections: [
      makeSection('header', 'Header', '', 0),
      makeSection('badges', 'Badges', '', 1),
      makeSection(
        'description',
        'About',
        'A production-ready starter template for [technology/framework]. Batteries included.',
        2
      ),
      makeSection(
        'features',
        "What's Included",
        '- Framework setup with TypeScript\n- ESLint + Prettier configured\n- Testing setup with Vitest\n- CI/CD pipeline ready\n- Docker support\n- Environment variables template',
        3
      ),
      makeSection(
        'installation',
        'Quick Start',
        '```bash\n# Clone the template\ngit clone https://github.com/username/template.git my-project\ncd my-project\n\n# Remove git history\nrm -rf .git && git init\n\n# Install dependencies\nnpm install\n\n# Start development\nnpm run dev\n```',
        4
      ),
      makeSection(
        'custom',
        'Project Structure',
        '```\nmy-project/\n├── src/\n│   ├── components/\n│   ├── pages/\n│   ├── utils/\n│   └── index.ts\n├── tests/\n├── public/\n├── .env.example\n├── .eslintrc.js\n├── tsconfig.json\n└── package.json\n```',
        5
      ),
      makeSection(
        'custom',
        'Available Scripts',
        '| Script | Description |\n|--------|-------------|\n| `npm run dev` | Start development server |\n| `npm run build` | Build for production |\n| `npm run test` | Run tests |\n| `npm run lint` | Lint code |\n| `npm run format` | Format code |',
        6
      ),
      makeSection(
        'tech-stack',
        'Tech Stack',
        '- **Runtime:** Node.js 18+\n- **Language:** TypeScript 5\n- **Testing:** Vitest\n- **Linting:** ESLint + Prettier',
        7
      ),
      makeSection(
        'contributing',
        'Contributing',
        'Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).',
        8
      ),
      makeSection('license', 'License', '', 9, true),
    ],
    defaultProject: {
      name: 'my-starter',
      description: 'A production-ready starter template',
      license: 'MIT',
    },
  },
];

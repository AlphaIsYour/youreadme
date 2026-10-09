import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'youralpha-08-eno-readme-lab';
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repoName}` : '');

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
};

export default nextConfig;

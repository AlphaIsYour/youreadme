import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
// Otomatis deteksi nama repo dari GitHub Actions (misal "AlphaIsYour/youreadme" -> "/youreadme")
const repoName = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : '';

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? repoName : '');

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
};

export default nextConfig;

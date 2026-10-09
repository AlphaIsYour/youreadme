'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  if (!markdown.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-400 font-mono text-xs uppercase">
        <div className="text-center">
          <p className="tracking-widest">[ AWAITING CONTENT INPUT ]</p>
          <p className="text-[10px] text-zinc-500 mt-1">
            Populate sections to initiate AST preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none p-6 overflow-y-auto h-full font-sans
      prose-headings:scroll-mt-4 prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:font-teko prose-h1:text-4xl prose-h1:uppercase prose-h1:tracking-wider prose-h1:border-b-2 prose-h1:pb-2 prose-h1:border-black dark:prose-h1:border-white
      prose-h2:font-teko prose-h2:text-3xl prose-h2:uppercase prose-h2:tracking-wider prose-h2:mt-8 prose-h2:border-b prose-h2:border-black/20 dark:prose-h2:border-white/20 prose-h2:pb-1
      prose-h3:font-teko prose-h3:text-2xl prose-h3:uppercase prose-h3:tracking-wider
      prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-p:leading-relaxed
      prose-a:text-black dark:prose-a:text-white prose-a:underline prose-a:font-medium
      prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:border prose-code:border-black/20 dark:prose-code:border-white/20 prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-pre:rounded-none prose-pre:border prose-pre:border-black dark:prose-pre:border-white/30
      prose-img:rounded-none prose-img:border prose-img:border-black/30 dark:prose-img:border-white/30
      prose-blockquote:border-l-2 prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-950 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-none prose-blockquote:italic
      prose-table:rounded-none prose-table:overflow-hidden prose-table:border prose-table:border-black dark:prose-table:border-white/30
      prose-th:bg-zinc-100 dark:prose-th:bg-zinc-900 prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:border prose-th:border-black/30 dark:prose-th:border-white/30
      prose-td:border prose-td:border-black/20 dark:prose-td:border-white/20 prose-td:text-xs
      prose-li:text-zinc-800 dark:prose-li:text-zinc-200
      prose-input:accent-black dark:prose-input:accent-white"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              className="font-teko text-4xl uppercase tracking-wider text-black dark:text-white mb-4 border-b-2 border-black dark:border-white pb-2 leading-none"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="font-teko text-3xl uppercase tracking-wider text-black dark:text-white mt-8 mb-3 border-b border-black/20 dark:border-white/20 pb-1 leading-none"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="font-teko text-2xl uppercase tracking-wider text-black dark:text-white mt-6 mb-2 leading-none"
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p
              className="text-zinc-800 dark:text-zinc-200 leading-relaxed mb-4 text-sm font-sans"
              {...props}
            >
              {children}
            </p>
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              className="text-black dark:text-white underline font-semibold hover:opacity-75 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded-none border border-black/20 dark:border-white/20 text-xs font-mono text-black dark:text-white"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="bg-zinc-950 text-zinc-100 rounded-none p-4 overflow-x-auto border border-black dark:border-white/30 my-4 text-xs font-mono"
              {...props}
            >
              {children}
            </pre>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className="list-disc list-inside space-y-1.5 mb-4 text-sm text-zinc-800 dark:text-zinc-200"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-1.5 mb-4 text-sm text-zinc-800 dark:text-zinc-200"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed text-sm" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-950 py-2 px-4 rounded-none my-4 text-zinc-700 dark:text-zinc-300 text-sm italic"
              {...props}
            >
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="w-full border-collapse rounded-none border border-black dark:border-white/30 text-xs"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 text-left font-mono font-bold uppercase text-black dark:text-white border border-black/20 dark:border-white/20"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-4 py-2 text-zinc-700 dark:text-zinc-300 border border-black/20 dark:border-white/20"
              {...props}
            >
              {children}
            </td>
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-none border border-black/20 dark:border-white/20 max-w-full h-auto my-2"
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr
              className="my-8 border-black/20 dark:border-white/20"
              {...props}
            />
          ),
          input: ({ ...props }) => (
            <input
              {...props}
              className="mr-2 accent-black dark:accent-white"
              disabled={false}
              readOnly
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

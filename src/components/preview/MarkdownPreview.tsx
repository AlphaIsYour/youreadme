'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  if (!markdown.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-sm">Start editing to see your README preview</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none p-6 overflow-y-auto h-full
      prose-headings:scroll-mt-4
      prose-h1:text-2xl prose-h1:font-bold prose-h1:border-b prose-h1:pb-2 prose-h1:border-gray-200 dark:prose-h1:border-gray-700
      prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8
      prose-h3:text-lg prose-h3:font-semibold
      prose-p:text-gray-700 dark:prose-p:text-gray-300
      prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
      prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
      prose-img:rounded-xl prose-img:shadow-md prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700
      prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-950/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
      prose-table:rounded-lg prose-table:overflow-hidden
      prose-th:bg-gray-50 dark:prose-th:bg-gray-800
      prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700
      prose-li:text-gray-700 dark:prose-li:text-gray-300
      prose-input:accent-emerald-500"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2"
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
              {...props}
            >
              {children}
            </p>
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
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
                  className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
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
              className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 overflow-x-auto border border-gray-200 dark:border-gray-700 my-4"
              {...props}
            >
              {children}
            </pre>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className="list-disc list-inside space-y-1.5 mb-4 text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-1.5 mb-4 text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 py-1 px-4 rounded-r-lg my-4 text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="w-full border-collapse rounded-lg overflow-hidden"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-left text-sm font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              {...props}
            >
              {children}
            </td>
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-xl shadow-md max-w-full h-auto border border-gray-200 dark:border-gray-700"
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr
              className="my-8 border-gray-200 dark:border-gray-700"
              {...props}
            />
          ),
          input: ({ ...props }) => (
            <input
              {...props}
              className="mr-2 accent-emerald-500"
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

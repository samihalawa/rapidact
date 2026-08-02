import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router";
import { useI18n } from "@/lib/i18n";

/** Renders content markdown with site-consistent styling + internal Link routing. */
export default function MarkdownRenderer({ body }: { body: string }) {
  const { path } = useI18n();

  return (
    <div className="content-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-2 mb-5 text-3xl font-bold tracking-tight text-[#16181d] sm:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 mb-3 text-xl font-bold text-[#16181d]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-7 mb-2 text-lg font-bold text-[#16181d]">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-3 text-[15px] leading-relaxed text-[#5c6370]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5c6370]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f3a5f]" />
              <span>{children}</span>
            </li>
          ),
          a: ({ href, children }) => {
            const internal = href?.startsWith("/");
            return internal ? (
              <Link
                to={path(href!)}
                className="font-medium text-[#1f3a5f] underline decoration-[#b9c2ce] hover:decoration-[#1f3a5f]"
              >
                {children}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1f3a5f] underline decoration-[#b9c2ce] hover:decoration-[#1f3a5f]"
              >
                {children}
              </a>
            );
          },
          strong: ({ children }) => (
            <strong className="font-bold text-[#16181d]">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-[#8a6d1f] bg-[#fdfaf1] px-5 py-4 text-[#5c6370]">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto border border-[#e2e2dd]">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-[#e2e2dd] bg-[#f7f7f5] px-4 py-2.5 text-left font-bold text-[#16181d]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-[#e2e2dd] px-4 py-2.5 align-top text-[#5c6370]">
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-[#f7f7f5] px-1.5 py-0.5 text-[13px] text-[#16181d]">
              {children}
            </code>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

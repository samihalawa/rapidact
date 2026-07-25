import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router";

/** Renders content markdown with site-consistent styling + internal Link routing. */
export default function MarkdownRenderer({ body }: { body: string }) {
  return (
    <div className="content-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-2 mb-5 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 mb-3 text-xl font-extrabold text-[#141b2e]">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-7 mb-2 text-lg font-bold text-[#141b2e]">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="my-3 text-[15px] leading-relaxed text-[#3d445c]">{children}</p>
          ),
          ul: ({ children }) => <ul className="my-4 space-y-2 pl-1">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>,
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-[15px] leading-relaxed text-[#3d445c]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6d5df6]" />
              <span>{children}</span>
            </li>
          ),
          a: ({ href, children }) => {
            const internal = href?.startsWith("/");
            return internal ? (
              <Link to={href!} className="font-medium text-[#6d5df6] underline decoration-[#c9c2f5] hover:decoration-[#6d5df6]">
                {children}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#6d5df6] underline decoration-[#c9c2f5] hover:decoration-[#6d5df6]"
              >
                {children}
              </a>
            );
          },
          strong: ({ children }) => <strong className="font-bold text-[#141b2e]">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 rounded-r-xl border-l-4 border-[#ffd617] bg-[#fffbeb] px-5 py-3 text-[#92400e]">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-xl border border-[#e7e9f2]">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-[#e7e9f2] bg-[#f8f9fc] px-4 py-2.5 text-left font-bold text-[#141b2e]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-[#eef0f6] px-4 py-2.5 align-top text-[#3d445c]">{children}</td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-[#f1f2f8] px-1.5 py-0.5 text-[13px] text-[#141b2e]">{children}</code>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

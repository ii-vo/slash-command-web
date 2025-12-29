"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

export function Install() {
  const commands = [
    { label: "1. Add the marketplace", cmd: "/plugin marketplace add ii-vo/claude-meta" },
    { label: "2. Install the plugin", cmd: "/plugin install claude-meta:slash-command" },
  ];

  return (
    <section className="px-6 py-16">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-6">
          Install
        </h2>

        <div className="space-y-3">
          {commands.map(({ label, cmd }, i) => (
            <div key={i}>
              <p className="text-xs text-zinc-500 mb-1 text-left">{label}</p>
              <div className="relative group">
                <code className="block bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 pr-12 font-mono text-xs md:text-sm text-left">
                  {cmd}
                </code>
                <CopyButton text={cmd} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

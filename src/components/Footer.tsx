export function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-500">
        <p>Built for Claude Code</p>
        <a
          href="https://github.com/ii-vo/claude-meta"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

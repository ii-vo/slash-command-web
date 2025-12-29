"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <main className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Error</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Something went wrong
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}

import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-semibold text-indigo-300">Diverse</Link>
            <div className="flex gap-4 text-sm text-slate-300">
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup" className="rounded bg-indigo-600 px-3 py-1">Start free trial</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}

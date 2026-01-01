import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Link from 'next/link';
import { ThemeToggle } from './components/theme-toggle';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://adityarao.dev'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Aditya Rao',
    template: '%s | Aditya Rao'
  },
  description: 'My portfolio, blog, and personal website.'
};

const navLinks = [
  { name: 'home', href: '/' },
  { name: 'blog', href: '/blog' },
  { name: 'projects', href: '/projects' },
  { name: 'about', href: '/about' }
];

const socialLinks = [
  { name: 'linkedin', url: 'https://www.linkedin.com/in/aditya-k-rao/' },
  { name: 'github', url: 'https://github.com/theadityarao' }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.className}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <div className="flex flex-col md:flex-row max-w-5xl mx-auto">
            <Sidebar />
            <main className="flex-1 p-8 md:p-12">
              <div className="max-w-[60ch] space-y-4">
                {children}
              </div>
            </main>
          </div>
          <Analytics />
          
          {/* Theme Toggle - Fixed bottom right */}
          <div className="fixed bottom-6 right-6">
            <ThemeToggle />
          </div>
        </div>
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <aside className="md:w-48 md:min-h-screen md:sticky md:top-0 p-8 md:py-12 md:border-r border-gray-100 dark:border-zinc-800">
      <div className="flex flex-row md:flex-col gap-6 md:gap-8">
        {/* Name/Logo */}
        <Link href="/" className="font-semibold text-lg hover:text-blue-500 transition-colors">
          AR
        </Link>
        
        {/* Navigation */}
        <nav className="flex flex-row md:flex-col gap-4 md:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors text-sm"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Social Links */}
        <div className="flex flex-row md:flex-col gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-zinc-500 hover:text-blue-500 transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

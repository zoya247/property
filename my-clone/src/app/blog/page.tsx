import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "London Bridge Blog | SE1 Area Guide & London Travel Tips",
  description:
    "Discover the best of London Bridge and SE1. Local guides to Borough Market, The Shard, top restaurants, transport tips, and why SE1 is perfect for extended stays and professional relocations.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "London Bridge Blog | SE1 Area Guide & Travel Tips",
    description:
      "Local guides, travel tips, and insider knowledge about London Bridge and SE1 — from Borough Market to The Shard.",
    url: "https://www.londonbridgestays.co.uk/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.99_0.002_90)]">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[oklch(0.28_0.08_245)] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[oklch(0.28_0.08_245)] text-sm">
              LB
            </div>
            <span className="font-semibold text-lg tracking-tight">London Bridge Stays</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/#property" className="hover:text-amber-400 transition-colors">Property</Link>
            <Link href="/#amenities" className="hover:text-amber-400 transition-colors">Amenities</Link>
            <Link href="/#reviews" className="hover:text-amber-400 transition-colors">Reviews</Link>
            <Link href="/blog" className="text-amber-400">Blog</Link>
          </nav>
          <a
            href="https://www.airbnb.co.uk/rooms/1502751749003658542"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-[oklch(0.28_0.08_245)] font-semibold px-4 py-2 rounded-md text-sm transition-colors"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[oklch(0.28_0.08_245)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">London Bridge Blog</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            Your SE1 Local Guide
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Insider tips on Borough Market, The Shard, transport, restaurants, and why London Bridge
            is one of the best places to stay in the capital.
          </p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(({ slug, title, excerpt, date, readTime, emoji }) => (
              <article
                key={slug}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-[oklch(0.28_0.08_245)] flex items-center justify-center">
                  <span className="text-6xl" role="img" aria-label={title}>{emoji}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{date}</span>
                    <span>·</span>
                    <span>{readTime}</span>
                  </div>
                  <h2 className="font-heading text-lg font-bold text-gray-900 mb-3 leading-snug">
                    <Link href={`/blog/${slug}`} className="hover:text-[oklch(0.28_0.08_245)] transition-colors">
                      {title}
                    </Link>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{excerpt}</p>
                  <Link
                    href={`/blog/${slug}`}
                    className="text-amber-600 font-semibold text-sm hover:text-[oklch(0.28_0.08_245)] transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[oklch(0.28_0.08_245)] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
            Staying Near London Bridge?
          </h2>
          <p className="text-white/80 mb-8">
            Book our spacious 2-bed, 2-bath apartment — right next to The Shard and Borough Market.
          </p>
          <Link
            href="/"
            className="bg-amber-400 hover:bg-amber-300 text-[oklch(0.28_0.08_245)] font-bold px-8 py-3 rounded-md transition-colors"
          >
            View the Apartment
          </Link>
        </div>
      </section>

      <footer className="bg-[oklch(0.18_0.06_245)] text-white/60 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} London Bridge Stays · SE1 4LB, London</p>
      </footer>
    </div>
  );
}

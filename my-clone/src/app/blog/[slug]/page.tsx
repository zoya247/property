import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | London Bridge Stays Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://www.londonbridgestays.co.uk/blog/${slug}`,
      images: [
        {
          url: "https://assets.hospitable.com/property_images/2139192/irwB519DGNp8qUuMxtgpvX8hmTYsgEEAITB5Bwo4.jpg",
          width: 1200,
          height: 800,
          alt: "London Bridge Stays",
        },
      ],
    },
  };
}

function renderMarkdown(content: string): string {
  return content
    .trim()
    .replace(/^# (.+)$/gm, '<h1 class="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)] mb-6 mt-10">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="font-heading text-2xl font-bold text-[oklch(0.28_0.08_245)] mb-4 mt-10">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="font-heading text-xl font-bold text-gray-800 mb-3 mt-6">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-amber-600 font-semibold hover:text-[oklch(0.28_0.08_245)] underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^---$/gm, '<hr class="my-10 border-gray-200" />')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-amber-400 pl-6 py-2 my-6 italic text-gray-600 bg-amber-50 rounded-r-xl">$1</blockquote>')
    .replace(/^\| (.+) \|$/gm, (match: string) => {
      const cells = match.slice(1, -1).split(" | ").map((c: string) => `<td class="px-4 py-2 border border-gray-200 text-sm">${c.trim()}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .replace(/^- (.+)$/gm, '<li class="text-gray-600 leading-relaxed">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-2 my-4 pl-2">$&</ul>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-600 leading-relaxed">$2</li>')
    .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed my-4">');
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "London Bridge Stays",
      url: "https://www.londonbridgestays.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "London Bridge Stays",
      url: "https://www.londonbridgestays.co.uk",
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.londonbridgestays.co.uk/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.002_90)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

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

      {/* BREADCRUMB */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[oklch(0.28_0.08_245)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[oklch(0.28_0.08_245)] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-48">{post.title}</span>
        </nav>
      </div>

      {/* ARTICLE */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="text-6xl mb-6" role="img" aria-label={post.title}>{post.emoji}</div>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>London Bridge Stays Blog</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[oklch(0.28_0.08_245)] leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">{post.excerpt}</p>
        </div>

        <div
          className="prose max-w-none text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* AUTHOR BOX */}
        <div className="mt-16 bg-[oklch(0.96_0.005_90)] rounded-2xl p-8 flex items-start gap-6">
          <div className="w-14 h-14 rounded-full bg-[oklch(0.28_0.08_245)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            LB
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">London Bridge Stays</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your hosts in SE1. We run a spacious 2-bed, 2-bath apartment right next to The Shard
              and Borough Market. Our blog covers everything you need to know about London Bridge and SE1.
            </p>
            <Link
              href="/"
              className="inline-block mt-3 text-sm font-semibold text-amber-600 hover:text-[oklch(0.28_0.08_245)] transition-colors"
            >
              View the apartment →
            </Link>
          </div>
        </div>
      </article>

      {/* MORE POSTS */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-[oklch(0.28_0.08_245)] mb-8">More from the Blog</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <article key={p.slug} className="group">
                  <div className="h-32 bg-[oklch(0.28_0.08_245)] rounded-xl flex items-center justify-center mb-4 text-4xl">
                    {p.emoji}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{p.date} · {p.readTime}</p>
                  <h3 className="font-heading font-bold text-gray-900 leading-snug mb-2 group-hover:text-[oklch(0.28_0.08_245)] transition-colors">
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-amber-600 text-sm font-semibold hover:text-[oklch(0.28_0.08_245)] transition-colors"
                  >
                    Read more →
                  </Link>
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
            Our spacious 2-bed, 2-bath apartment is next to The Shard, steps from Borough Market.
            Ideal for professionals, families, and extended stays.
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

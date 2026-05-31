import Link from "next/link";
import Image from "next/image";

const IMAGES = [
  "https://assets.hospitable.com/property_images/2139192/irwB519DGNp8qUuMxtgpvX8hmTYsgEEAITB5Bwo4.jpg",
  "https://assets.hospitable.com/property_images/2139192/cPezr8sZ2Wia2vB0zmlEH3Ys5ekxTsxGcYdbgE2f.jpg",
  "https://assets.hospitable.com/property_images/2139192/dUA40SFNsYcrGTdBFfSRhXZ7B9qW9YZVXnP5AZmu.jpg",
  "https://assets.hospitable.com/property_images/2139192/UvkaF5uXshknR6F4AyVGvXyhjJL43thdV64NQHA8.jpg",
  "https://assets.hospitable.com/property_images/2139192/yabgMnn2ihzQgSLHmA2TyjGcPpNvNmx4SDWuW9rl.jpg",
  "https://assets.hospitable.com/property_images/2139192/yOtVH4bDSR9snlVl4eKasgTa7H78TPZm8WYhzrty.jpg",
];

const AMENITIES = [
  { icon: "📶", label: "Fast & Reliable Wi-Fi" },
  { icon: "📺", label: "Smart TV with Netflix" },
  { icon: "🍳", label: "Fully Equipped Kitchen" },
  { icon: "🧺", label: "Washer / Dryer" },
  { icon: "🏗️", label: "Elevator Access" },
  { icon: "🌿", label: "Private Balcony" },
  { icon: "💻", label: "Laptop Workspace" },
  { icon: "🔥", label: "Central Heating" },
  { icon: "🧴", label: "Toiletries & Towels Provided" },
  { icon: "🍽️", label: "Dishwasher" },
  { icon: "👶", label: "Baby Crib Available" },
  { icon: "🚗", label: "Parking (on-site)" },
];

const REVIEWS = [
  {
    name: "Alicia Hall",
    flag: "🇬🇧",
    rating: 5,
    date: "May 2026",
    text: "Zoe was an amazing host, very responsive and accommodating! The property was like a home away from home and the location is great, exactly what you need if you're staying in Central London!",
  },
  {
    name: "Ruben Costache",
    flag: "🇷🇴",
    rating: 5,
    date: "May 2026",
    text: "Excellent stay. The apartment was exactly as described, very clean, comfortable, and well located. Communication from the host was clear and responsive throughout, and check-in was simple. Everything worked properly and the space felt well looked after. Would definitely stay again and highly recommend.",
  },
  {
    name: "Jake Lim",
    flag: "🇸🇬",
    rating: 4,
    date: "December 2025",
    text: "Conveniently located between train stations. Zoe and her partner were very helpful and responsive. Kitchen was well equipped and apartment was spacious, warm and cosy. There is even a gym we could use. Overall, highly recommended.",
  },
  {
    name: "André Bolard",
    flag: "🇫🇷",
    rating: 5,
    date: "January 2026",
    text: "appartement très agréable à 10 mn à pied du pont de Londres où il y a beaucoup d'activités. hôte très réactive. Très bon séjour dans votre bel appartement.",
  },
];

const FAQS = [
  {
    q: "Where exactly is London Bridge Stays located?",
    a: "We are at Longstone Court, 22 Great Dover Street, SE1 4LB — a 3-minute walk from London Bridge Station, right next to The Shard, and a short stroll from Borough Market and the River Thames.",
  },
  {
    q: "How many guests can the apartment accommodate?",
    a: "Up to 6 guests. Bedroom 1 has 2 single beds, Bedroom 2 has a double bed, and the living room has a sofa bed. There are 2 full bathrooms.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 3:00 PM and check-out by 11:00 AM. We personally greet every guest at check-in.",
  },
  {
    q: "Do you offer discounts for long-term or extended stays?",
    a: "Yes! We offer discounts for longer stays and professional relocations. Message us directly to discuss rates — we're very flexible.",
  },
  {
    q: "What transport links are nearby?",
    a: "London Bridge Station (Jubilee Line, Northern Line & National Rail) is a 3-minute walk. You can reach the West End in 5 minutes, Canary Wharf in 10, and the City in 5. Southwark and Borough stations are also close.",
  },
  {
    q: "What amenities are included?",
    a: "Fast Wi-Fi, Smart TV with Netflix, fully equipped kitchen with dishwasher, washer/dryer, balcony, elevator, heating, hair dryer, iron, all linen and towels — everything you need to feel at home.",
  },
  {
    q: "Is the apartment suitable for business travellers and professionals?",
    a: "Absolutely. The apartment has a dedicated laptop workspace, fast Wi-Fi, and easy access to Guy's Hospital, King's College London, the City, Canary Wharf, and all major business districts. Longer stays welcome.",
  },
  {
    q: "Are pets or smoking allowed?",
    a: "No pets and no smoking indoors. These rules are strictly enforced.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.99_0.002_90)]">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[oklch(0.28_0.08_245)] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[oklch(0.28_0.08_245)] text-sm">
              LB
            </div>
            <span className="font-semibold text-lg tracking-tight">London Bridge Stays</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#property" className="hover:text-amber-400 transition-colors">Property</a>
            <a href="#amenities" className="hover:text-amber-400 transition-colors">Amenities</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">Location</a>
            <Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link>
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
      <section
        id="hero"
        className="relative h-[85vh] min-h-[560px] flex items-end"
        aria-label="Hero image of the apartment"
      >
        <Image
          src={IMAGES[0]}
          alt="London Bridge Stays – Spacious 2-bedroom apartment near The Shard, SE1 London"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-amber-400 text-[oklch(0.28_0.08_245)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              SE1 London Bridge
            </span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              ★ 4.8 · 5 reviews
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Your London Home<br />Near The Shard
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
            Spacious 2-bed, 2-bath apartment in SE1 — 3 minutes from London Bridge Station,
            steps from Borough Market and The Shard. Ideal for professionals, relocations &amp; extended stays.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.airbnb.co.uk/rooms/1502751749003658542"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-[oklch(0.28_0.08_245)] font-bold px-8 py-3.5 rounded-md text-base transition-colors shadow-lg"
            >
              Book on Airbnb
            </a>
            <a
              href="https://www.booking.com/hotel/gb/london-bridge-stays.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold px-8 py-3.5 rounded-md text-base transition-colors backdrop-blur-sm"
            >
              Book on Booking.com
            </a>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="bg-[oklch(0.28_0.08_245)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "2", label: "Bedrooms" },
            { value: "2", label: "Bathrooms" },
            { value: "6", label: "Guests Max" },
            { value: "Zone 1", label: "Central London" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-amber-400">{value}</div>
              <div className="text-sm text-white/70 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROPERTY DESCRIPTION */}
      <section id="property" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">About the Space</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)] mb-6 leading-tight">
                Spacious, Fully Furnished &amp; Ready to Live In
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                This bright and spacious 2-bedroom, 2-bathroom apartment is designed for both short and
                longer stays, offering comfort, flexibility, and everything you need to feel at home in
                the heart of London.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Bedroom 1 features 2 single beds, while Bedroom 2 includes a comfortable double bed.
                The living room also has a sofa bed, allowing the property to sleep up to 6 guests — ideal
                for families, groups, or colleagues.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                The apartment is fully equipped with a modern kitchen including all cooking utensils,
                crockery, and cutlery. Fresh linen, towels, ironing facilities, and essential toiletries
                are all provided so you can settle in from day one.
              </p>
              <div className="space-y-3">
                {[
                  "✓ Spacious 2 bedrooms (sleeps up to 6)",
                  "✓ En-suite bathroom plus family bathroom",
                  "✓ Bright open-plan living area with dining space",
                  "✓ Fully equipped modern kitchen",
                  "✓ Fast & reliable Wi-Fi",
                  "✓ Smart TV with Netflix",
                  "✓ Washer/dryer for longer stays",
                  "✓ Balcony access for fresh air & relaxation",
                  "✓ Secure Zone 1 location — walk everywhere",
                ].map((item) => (
                  <p key={item} className="text-gray-700 font-medium">{item}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {IMAGES.slice(1, 5).map((src, i) => (
                <div key={i} className="gallery-item aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={src}
                    alt={`London Bridge Stays interior photo ${i + 2}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="py-20 bg-[oklch(0.96_0.005_90)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">What&apos;s Included</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)]">
              Everything You Need
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {AMENITIES.map(({ icon, label }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-3" aria-hidden="true">{icon}</span>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">Gallery</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)]">
              See Every Room
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "https://assets.hospitable.com/property_images/2139192/irwB519DGNp8qUuMxtgpvX8hmTYsgEEAITB5Bwo4.jpg",
              "https://assets.hospitable.com/property_images/2139192/cPezr8sZ2Wia2vB0zmlEH3Ys5ekxTsxGcYdbgE2f.jpg",
              "https://assets.hospitable.com/property_images/2139192/dUA40SFNsYcrGTdBFfSRhXZ7B9qW9YZVXnP5AZmu.jpg",
              "https://assets.hospitable.com/property_images/2139192/UvkaF5uXshknR6F4AyVGvXyhjJL43thdV64NQHA8.jpg",
              "https://assets.hospitable.com/property_images/2139192/yabgMnn2ihzQgSLHmA2TyjGcPpNvNmx4SDWuW9rl.jpg",
              "https://assets.hospitable.com/property_images/2139192/QQcebxJf4UeBENyx7jzdaexdatGgpYikTTzofazs.jpg",
              "https://assets.hospitable.com/property_images/2139192/DSM4GotYvCxnutgUJIxvYSz2r49O2G17DAYTlZrM.jpg",
              "https://assets.hospitable.com/property_images/2139192/sVgaO01X1R7t7fnYDhhPHgYESvPsqYhJGA1pLSpq.jpg",
              "https://assets.hospitable.com/property_images/2139192/7Bv0zjHHBRxKqwaMliVLGRoa7kDMsQfSPUvWNlgy.jpg",
            ].map((src, i) => (
              <div key={i} className="gallery-item aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={src}
                  alt={`London Bridge Stays – apartment photo ${i + 1}`}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-20 bg-[oklch(0.96_0.005_90)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">Prime SE1</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)] mb-6 leading-tight">
                Everything on Your Doorstep
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Located in the heart of SE1, you&apos;re just a short walk from some of London&apos;s most iconic
                landmarks. The Shard, London Bridge, and the famous Borough Market are all nearby, offering
                great food, views, and atmosphere.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "🚇", label: "3 min walk", detail: "London Bridge Station (Jubilee & Northern Line, National Rail)" },
                  { icon: "🏗️", label: "Next door", detail: "The Shard — London's tallest building" },
                  { icon: "🛒", label: "5 min walk", detail: "Borough Market — London's best food market" },
                  { icon: "🌊", label: "10 min walk", detail: "River Thames & Southbank" },
                  { icon: "🏥", label: "5 min walk", detail: "Guy's Hospital & King's College London" },
                  { icon: "🏦", label: "Easy access", detail: "The City, Canary Wharf & West End" },
                ].map(({ icon, label, detail }) => (
                  <div key={detail} className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5" aria-hidden="true">{icon}</span>
                    <div>
                      <span className="font-semibold text-[oklch(0.28_0.08_245)]">{label}</span>
                      <span className="text-gray-500"> — {detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="London Bridge Stays location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.7!2d-0.0922814!3d51.4997091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI5JzU4LjkiTiAwwrAwNSczMi4yIlc!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">Guest Reviews</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)] mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-3">
              <StarRating rating={5} />
              <span className="font-semibold text-gray-700">4.8 out of 5 · 5 reviews on Airbnb</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map(({ name, flag, rating, date, text }) => (
              <article
                key={name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {flag} {name}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">{date}</p>
                  </div>
                  <StarRating rating={rating} />
                </div>
                <p className="text-gray-600 leading-relaxed italic">&ldquo;{text}&rdquo;</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.airbnb.co.uk/rooms/1502751749003658542#reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[oklch(0.28_0.08_245)] font-semibold hover:text-amber-600 transition-colors"
            >
              Read all reviews on Airbnb →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ — AI SEO SECTION */}
      <section id="faq" className="py-20 bg-[oklch(0.96_0.005_90)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="bg-white rounded-xl shadow-sm border border-gray-100 group"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold text-gray-800 hover:text-[oklch(0.28_0.08_245)]">
                  <span>{q}</span>
                  <span className="ml-4 text-amber-500 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section id="blog" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">London Guide</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[oklch(0.28_0.08_245)] mb-4">
              Explore London Bridge &amp; SE1
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Local tips and guides to make the most of your stay in one of London&apos;s most vibrant neighbourhoods.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                slug: "things-to-do-near-london-bridge",
                title: "15 Best Things To Do Near London Bridge",
                excerpt: "From Borough Market to The Shard, here's your insider guide to SE1's unmissable experiences.",
                date: "May 2026",
                readTime: "6 min read",
              },
              {
                slug: "borough-market-complete-guide",
                title: "Borough Market: The Complete Visitor's Guide",
                excerpt: "One of London's oldest food markets is just minutes away. Here's everything you need to know before you go.",
                date: "May 2026",
                readTime: "5 min read",
              },
              {
                slug: "london-bridge-extended-stay-guide",
                title: "Why SE1 Is Perfect for Extended Stays & Relocations",
                excerpt: "Professional relocation to London? Here's why London Bridge SE1 is the smart base for long-term guests.",
                date: "April 2026",
                readTime: "4 min read",
              },
            ].map(({ slug, title, excerpt, date, readTime }) => (
              <article key={slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-[oklch(0.28_0.08_245)] flex items-center justify-center">
                  <span className="text-5xl">🏙️</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{date}</span>
                    <span>·</span>
                    <span>{readTime}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2 leading-snug">
                    <Link href={`/blog/${slug}`} className="hover:text-[oklch(0.28_0.08_245)] transition-colors">
                      {title}
                    </Link>
                  </h3>
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
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[oklch(0.28_0.08_245)] text-white font-semibold px-8 py-3 rounded-md hover:bg-[oklch(0.38_0.07_245)] transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-24 bg-[oklch(0.28_0.08_245)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-white/80 text-lg mb-4 max-w-2xl mx-auto">
            Steps from London Bridge, Borough Market &amp; The Shard.
            Discounts available for long-term stays — message us directly to discuss rates.
          </p>
          <p className="text-white/60 text-sm mb-10">
            Check-in: 3:00 PM · Check-out: 11:00 AM · Personal greeting at check-in
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.airbnb.co.uk/rooms/1502751749003658542"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-[oklch(0.28_0.08_245)] font-bold px-10 py-4 rounded-md text-lg transition-colors shadow-xl"
            >
              Book on Airbnb
            </a>
            <a
              href="https://www.booking.com/hotel/gb/london-bridge-stays.html"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/40 hover:border-white text-white font-bold px-10 py-4 rounded-md text-lg transition-colors"
            >
              Book on Booking.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[oklch(0.18_0.06_245)] text-white/70 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[oklch(0.28_0.08_245)] text-xs">
                  LB
                </div>
                <span className="text-white font-semibold">London Bridge Stays</span>
              </div>
              <p className="text-sm leading-relaxed">
                Longstone Court, 22 Great Dover Street<br />
                London, SE1 4LB<br />
                United Kingdom
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#property" className="hover:text-amber-400 transition-colors">About the Property</a></li>
                <li><a href="#amenities" className="hover:text-amber-400 transition-colors">Amenities</a></li>
                <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a></li>
                <li><a href="#location" className="hover:text-amber-400 transition-colors">Location</a></li>
                <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Book Direct</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.airbnb.co.uk/rooms/1502751749003658542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Airbnb Listing →
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.booking.com/hotel/gb/london-bridge-stays.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Booking.com →
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-sm font-medium text-white mb-1">Extended Stay Enquiries</p>
                <p className="text-sm">Discounts available — contact us directly</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} London Bridge Stays. All rights reserved.</p>
            <p>Longstone Court, SE1 4LB · London, United Kingdom</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

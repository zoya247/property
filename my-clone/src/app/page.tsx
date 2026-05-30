import Image from "next/image";
import {
  Wifi,
  Car,
  Bath,
  BedDouble,
  Users,
  MapPin,
  ChefHat,
  Tv,
  WashingMachine,
  Coffee,
  Briefcase,
  Home as HomeIcon,
  Plane,
  CheckCircle,
  Star,
  Calendar,
  Waves,
  Shield,
  Utensils,
} from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";

const BOOKING_URL =
  "https://direct.hospitable.com/property/8b880443-2d40-5f0d-bbb4-56741c9eab4f";

const HERO_IMG =
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1502751749003658542/original/7dfe7ace-156a-4a19-a842-49f1431bf687.jpeg";

const faqs = [
  {
    q: "Is this apartment suitable for business travellers?",
    a: "Yes. The apartment is 3 minutes from London Bridge Station with direct access to the Northern and Jubilee lines — connecting you to the City, Canary Wharf, and West End in minutes. It has a dedicated laptop workspace, fast fibre WiFi, two full bathrooms, and self check-in. Weekly and monthly corporate rates available on request.",
  },
  {
    q: "How far is the apartment from Guy's Hospital?",
    a: "Guy's Hospital is a 5-minute walk. The apartment is one of the closest privately managed short-term rentals to Guy's and St Thomas' NHS Foundation Trust — ideal for visiting consultants, locum doctors, clinical researchers, and King's College London medical students on placement needing flexible, comfortable accommodation.",
  },
  {
    q: "Is there free parking at the SE1 apartment?",
    a: "Yes. Free on-site parking is included — rare in SE1 where nearby parking typically costs £20–£40 per day. This makes the flat especially practical for guests driving to London for work, relocation viewings, or leisure trips around the city.",
  },
  {
    q: "Can I book directly without using Airbnb?",
    a: "Yes. Booking directly through londonbridgeflat.co.uk avoids Airbnb service fees and allows more flexible terms for longer stays. Direct bookings are managed securely with instant confirmation and the same quality guarantee.",
  },
  {
    q: "How close is the flat to Borough Market and The Shard?",
    a: "Borough Market is a 5-minute walk and The Shard is right next to London Bridge Station — 3 minutes from the apartment. Tower Bridge, Tate Modern, Southwark Cathedral, and the Thames riverside walk are all within 15 minutes on foot.",
  },
  {
    q: "Is this flat suitable for people relocating to London?",
    a: "Specifically designed for it. The apartment has a washer/dryer, fully equipped kitchen with dishwasher, dining area, and a spacious living room — everything needed to live comfortably while house-hunting. Monthly discounts available on request. Complimentary cleaning included for extended stays.",
  },
];

const amenities = [
  { icon: Wifi, label: "Fast Fibre WiFi" },
  { icon: Car, label: "Free On-Site Parking" },
  { icon: Briefcase, label: "Laptop Workspace" },
  { icon: ChefHat, label: "Fully Equipped Kitchen" },
  { icon: WashingMachine, label: "Washer / Dryer" },
  { icon: Tv, label: "Smart TV & Netflix" },
  { icon: Bath, label: "2 Full Bathrooms" },
  { icon: Coffee, label: "Coffee Maker" },
  { icon: Waves, label: "Balcony / Patio" },
  { icon: Shield, label: "Secure Building + Lift" },
  { icon: Utensils, label: "Dishwasher" },
  { icon: BedDouble, label: "Fresh Linen & Towels" },
];

const landmarks = [
  { name: "London Bridge Station", time: "3 min walk", icon: "🚇" },
  { name: "Borough Market", time: "5 min walk", icon: "🛒" },
  { name: "The Shard", time: "5 min walk", icon: "🏙️" },
  { name: "Guy's Hospital", time: "5 min walk", icon: "🏥" },
  { name: "Tower Bridge", time: "15 min walk", icon: "🌉" },
  { name: "Tate Modern", time: "15 min walk", icon: "🎨" },
  { name: "Canary Wharf", time: "20 min by Tube", icon: "🏢" },
  { name: "West End", time: "20 min by Tube", icon: "🎭" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#e8e4df]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="text-lg font-semibold text-[#0d1b2a] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            London Bridge Flat
          </span>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0d1b2a] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1a2f4a] transition-colors"
          >
            Book Directly
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Modern 2-bedroom apartment living room in SE1 London Bridge"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/90 via-[#0d1b2a]/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <div className="flex items-center gap-2 text-[#c9993d] text-sm font-medium mb-5">
            <Star className="w-4 h-4 fill-[#c9993d]" />
            <span>4.8 Rated · SE1, London · Hosted by Zoe</span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Your London Home.
            <br />
            <span className="text-[#c9993d]">No Airbnb Fees.</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Modern 2-bedroom apartment in SE1 — 3 minutes from London Bridge
            Station, steps from Borough Market and The Shard.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9993d] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#b8870c] transition-colors text-base"
            >
              <Calendar className="w-5 h-5" />
              Check Availability
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-colors text-base"
            >
              Send Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#0d1b2a] text-white py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { icon: BedDouble, label: "2 Bedrooms" },
              { icon: Bath, label: "2 Bathrooms" },
              { icon: Users, label: "Sleeps Up to 6" },
              { icon: Car, label: "Free Parking" },
              { icon: MapPin, label: "SE1 Zone 1" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-[#c9993d]" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO STAYS HERE */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-[#0d1b2a] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Perfect For
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Whether you're here for work, a fresh start, or exploring the
              city — this apartment is designed around your stay.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Business Travel",
                description:
                  "3 minutes from London Bridge Station with direct lines to the City, Canary Wharf, and the West End. Laptop workspace, fast WiFi, free parking, and two bathrooms for professional stays.",
                tags: ["City", "Canary Wharf", "South Bank", "Monthly Rates"],
              },
              {
                icon: HomeIcon,
                title: "Relocating to London",
                description:
                  "A proper home base while you flat-hunt. Full kitchen, washer/dryer, dining area, and long-stay discounts on request. Complimentary cleaning included for extended stays.",
                tags: ["Monthly Stays", "Long-Stay Discount", "Full Kitchen", "Flexible"],
              },
              {
                icon: Plane,
                title: "Exploring London",
                description:
                  "Walk to Borough Market, The Shard, Tower Bridge, and the Thames. Zone 1 with exceptional transport links to every corner of London. More space than any hotel room.",
                tags: ["Borough Market", "The Shard", "Tower Bridge", "Zone 1"],
              },
            ].map(({ icon: Icon, title, description, tags }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e4df] hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#0d1b2a]/5 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#0d1b2a]" />
                </div>
                <h3
                  className="text-xl font-semibold text-[#0d1b2a] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {title}
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed mb-6 text-sm">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium bg-[#faf8f5] text-[#0d1b2a] border border-[#e8e4df] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-4xl font-bold text-[#0d1b2a] mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              About the Apartment
            </h2>
            <div className="space-y-4 text-[#4a4a4a] leading-relaxed">
              <p>
                Located at Longstone Court in the heart of SE1, this bright and
                spacious 2-bedroom, 2-bathroom apartment is designed for
                comfortable stays of any length.
              </p>
              <p>
                Bedroom 1 has a king bed with an en-suite bathroom. Bedroom 2
                has two singles. The open-plan living room includes a sofa bed
                — the apartment comfortably sleeps up to 6, ideal for
                colleagues, families, or groups.
              </p>
              <p>
                The kitchen is fully equipped with a dishwasher, oven,
                microwave, and everything you need to cook. Fresh linen, towels,
                toiletries, and ironing facilities are all provided.
              </p>
              <p>
                Free on-site parking included — one of the very few private
                rentals in SE1 to offer this.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "King bed (Bedroom 1)",
                "2 singles (Bedroom 2)",
                "Sofa bed in living room",
                "En-suite + family bathroom",
                "Balcony access",
                "Lift in building",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-[#4a4a4a]"
                >
                  <CheckCircle className="w-4 h-4 text-[#c9993d] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 md:h-[560px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={HERO_IMG}
              alt="Spacious living room — London Bridge Flat SE1"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24 bg-[#0d1b2a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              What&apos;s Included
            </h2>
            <p className="text-white/60 text-lg">
              Everything you need to live and work comfortably.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <Icon className="w-6 h-6 text-[#c9993d]" />
                <span className="text-white text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-[#0d1b2a] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Prime Location
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Longstone Court, 22 Great Dover Street, SE1 4LB — in the heart of
              one of London&apos;s most vibrant neighbourhoods.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {landmarks.map(({ name, time, icon }) => (
              <div
                key={name}
                className="bg-white rounded-xl p-5 border border-[#e8e4df] flex items-start gap-4 hover:border-[#c9993d]/40 transition-colors"
              >
                <span className="text-2xl leading-none mt-0.5">{icon}</span>
                <div>
                  <p className="font-semibold text-[#0d1b2a] text-sm leading-tight">
                    {name}
                  </p>
                  <p className="text-[#c9993d] text-sm font-medium mt-1">
                    {time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#0d1b2a] rounded-2xl p-6 text-white text-center">
            <p className="text-white/60 text-sm mb-1">From London Bridge Station</p>
            <p className="font-medium">
              Northern & Jubilee Lines · Thameslink · South Eastern Railway · Thames Clipper River Bus
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-[#0d1b2a] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[#6b6b6b] text-lg">
              Everything you need to know before booking.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="border border-[#e8e4df] rounded-xl p-7 hover:border-[#c9993d]/50 transition-colors"
              >
                <h3
                  className="font-semibold text-[#0d1b2a] text-lg mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {q}
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="enquire" className="py-24 bg-[#faf8f5]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-[#0d1b2a] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Send an Enquiry
            </h2>
            <p className="text-[#6b6b6b] text-lg">
              Ask a question, request custom dates, or get a quote for long stays.
            </p>
          </div>
          <EnquiryForm bookingUrl={BOOKING_URL} />
        </div>
      </section>

      {/* BOOK CTA */}
      <section className="py-24 bg-[#0d1b2a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ready to Book?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Book directly and skip the platform fee. Instant confirmation.
            Flexible terms for longer stays.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9993d] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#b8870c] transition-colors text-lg"
          >
            <Calendar className="w-5 h-5" />
            Check Availability &amp; Book
          </a>
          <p className="text-white/40 text-sm mt-8">
            Secure payments · Instant confirmation · No hidden fees
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#07111c] text-white/60 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3
                className="font-semibold text-white text-xl mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                London Bridge Flat
              </h3>
              <p className="text-sm leading-relaxed">
                Longstone Court
                <br />
                22 Great Dover Street
                <br />
                London, SE1 4LB
                <br />
                United Kingdom
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                The Property
              </h3>
              <ul className="space-y-2 text-sm">
                <li>2 Bedrooms · 2 Bathrooms</li>
                <li>Sleeps up to 6 guests</li>
                <li>Free on-site parking</li>
                <li>Check-in: 3:00 PM</li>
                <li>Check-out: 11:00 AM</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Book Direct
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Check Availability →
                  </a>
                </li>
                <li>
                  <a href="#enquire" className="hover:text-white transition-colors">
                    Send Enquiry →
                  </a>
                </li>
                <li>No Airbnb fees</li>
                <li>Monthly discounts available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-xs text-center">
            © {new Date().getFullYear()} London Bridge Flat · londonbridgeflat.co.uk · All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

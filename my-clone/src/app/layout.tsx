import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "London Bridge Stays | Luxury 2-Bed Apartment Near The Shard, SE1",
  description:
    "Stay in a spacious 2-bed, 2-bath apartment in SE1, steps from London Bridge, Borough Market, and The Shard. Sleeps up to 6. Ideal for professionals, relocations & extended stays. Book direct.",
  keywords:
    "London Bridge apartment rental, short term rental SE1, serviced apartment London Bridge, The Shard apartment, Borough Market accommodation, extended stay London, professional relocation London, Zone 1 apartment, SE1 holiday let",
  authors: [{ name: "London Bridge Stays" }],
  creator: "London Bridge Stays",
  publisher: "London Bridge Stays",
  metadataBase: new URL("https://www.londonbridgestays.co.uk"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.londonbridgestays.co.uk",
    siteName: "London Bridge Stays",
    title: "London Bridge Stays | Luxury 2-Bed Apartment Near The Shard, SE1",
    description:
      "Spacious 2-bed, 2-bath apartment in SE1. Steps from London Bridge Station, Borough Market & The Shard. Sleeps up to 6. Perfect for professionals, extended stays & relocation.",
    images: [
      {
        url: "https://assets.hospitable.com/property_images/2139192/irwB519DGNp8qUuMxtgpvX8hmTYsgEEAITB5Bwo4.jpg",
        width: 1200,
        height: 800,
        alt: "London Bridge Stays – Spacious 2-bed apartment near The Shard, SE1 London",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "London Bridge Stays | Luxury 2-Bed Apartment Near The Shard, SE1",
    description:
      "Spacious 2-bed, 2-bath apartment in SE1. Steps from London Bridge, Borough Market & The Shard. Sleeps up to 6.",
    images: [
      "https://assets.hospitable.com/property_images/2139192/irwB519DGNp8qUuMxtgpvX8hmTYsgEEAITB5Bwo4.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LodgingBusiness", "Accommodation"],
      "@id": "https://www.londonbridgestays.co.uk/#property",
      name: "London Bridge Stays",
      url: "https://www.londonbridgestays.co.uk",
      description:
        "Spacious 2-bedroom, 2-bathroom luxury apartment in SE1, steps from London Bridge Station, Borough Market, and The Shard. Fully furnished with balcony, fast Wi-Fi, Smart TV, and modern kitchen. Ideal for professionals, extended stays, and relocations.",
      image: [
        "https://assets.hospitable.com/property_images/2139192/irwB519DGNp8qUuMxtgpvX8hmTYsgEEAITB5Bwo4.jpg",
        "https://assets.hospitable.com/property_images/2139192/cPezr8sZ2Wia2vB0zmlEH3Ys5ekxTsxGcYdbgE2f.jpg",
        "https://assets.hospitable.com/property_images/2139192/dUA40SFNsYcrGTdBFfSRhXZ7B9qW9YZVXnP5AZmu.jpg",
        "https://assets.hospitable.com/property_images/2139192/UvkaF5uXshknR6F4AyVGvXyhjJL43thdV64NQHA8.jpg",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Longstone Court, 22 Great Dover Street",
        addressLocality: "London",
        addressRegion: "Greater London",
        postalCode: "SE1 4LB",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.4997091,
        longitude: -0.0922814,
      },
      hasMap: "https://maps.google.com/?q=51.4997091,-0.0922814",
      checkinTime: "15:00",
      checkoutTime: "11:00",
      numberOfRooms: 2,
      petsAllowed: false,
      smokingAllowed: false,
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Smart TV with Netflix", value: true },
        { "@type": "LocationFeatureSpecification", name: "Washer/Dryer", value: true },
        { "@type": "LocationFeatureSpecification", name: "Dishwasher", value: true },
        { "@type": "LocationFeatureSpecification", name: "Fully Equipped Kitchen", value: true },
        { "@type": "LocationFeatureSpecification", name: "Balcony", value: true },
        { "@type": "LocationFeatureSpecification", name: "Elevator", value: true },
        { "@type": "LocationFeatureSpecification", name: "Laptop-Friendly Workspace", value: true },
        { "@type": "LocationFeatureSpecification", name: "Heating", value: true },
        { "@type": "LocationFeatureSpecification", name: "Hair Dryer", value: true },
        { "@type": "LocationFeatureSpecification", name: "Iron", value: true },
        { "@type": "LocationFeatureSpecification", name: "Crib Available", value: true },
        { "@type": "LocationFeatureSpecification", name: "Long-Term Stays Allowed", value: true },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "5",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Alicia Hall" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "Zoe was an amazing host, very responsive and accommodating! The property was like a home away from home and the location is great, exactly what you need if you're staying in Central London!",
          datePublished: "2026-05-20",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Ruben Costache" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "Excellent stay. The apartment was exactly as described, very clean, comfortable, and well located. Communication from the host was clear and responsive throughout, and check-in was simple. Would definitely stay again.",
          datePublished: "2026-05-19",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Jake Lim" },
          reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
          reviewBody:
            "Conveniently located between train stations. Zoe and her partner were very helpful and responsive. Kitchen was well equipped and apartment was spacious, warm and cosy. There is even a gym we could use. Overall, highly recommended.",
          datePublished: "2025-12-13",
        },
      ],
      sameAs: [
        "https://www.airbnb.co.uk/rooms/1502751749003658542",
        "https://www.booking.com/hotel/gb/london-bridge-stays.html",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.londonbridgestays.co.uk/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where is London Bridge Stays located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "London Bridge Stays is located at Longstone Court, 22 Great Dover Street, SE1 4LB. The apartment is 3 minutes walk from London Bridge Station, next door to The Shard, and a short walk from Borough Market and the River Thames.",
          },
        },
        {
          "@type": "Question",
          name: "How many guests can the London Bridge Stays apartment sleep?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The apartment sleeps up to 6 guests. It has 2 bedrooms — Bedroom 1 with 2 single beds and Bedroom 2 with a comfortable double bed — plus a sofa bed in the living room.",
          },
        },
        {
          "@type": "Question",
          name: "What is the check-in and check-out time at London Bridge Stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Check-in is from 3:00 PM (15:00) and check-out is by 11:00 AM. Guests are personally greeted for check-in.",
          },
        },
        {
          "@type": "Question",
          name: "Is London Bridge Stays suitable for long-term or extended stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — London Bridge Stays is ideal for extended stays, professional relocations, and business trips. Discounts are available for long-term stays. The apartment includes a washer/dryer, fully equipped kitchen, and complimentary cleaning and linen changes for longer stays. Message directly to enquire about discounted rates.",
          },
        },
        {
          "@type": "Question",
          name: "What amenities are included at London Bridge Stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All amenities included: fast & reliable Wi-Fi, Smart TV with Netflix, fully equipped modern kitchen with dishwasher, washer/dryer, balcony access, elevator, laptop-friendly workspace, heating, hair dryer, iron, fresh linen and towels, baby crib, and smoke/CO2 detectors.",
          },
        },
        {
          "@type": "Question",
          name: "How far is London Bridge Stays from public transport?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "London Bridge Station (Jubilee Line, Northern Line, National Rail) is a 3-minute walk. From London Bridge you can reach the West End in 5 minutes, Canary Wharf in 10 minutes, and the City of London in 5 minutes. Southwark and Borough tube stations are also nearby.",
          },
        },
        {
          "@type": "Question",
          name: "Are pets allowed at London Bridge Stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, pets are not permitted at London Bridge Stays.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I book London Bridge Stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book London Bridge Stays on Airbnb (listing ID: 1502751749003658542) and Booking.com. Contact us directly for extended stays and to enquire about long-term discount rates.",
          },
        },
        {
          "@type": "Question",
          name: "What is near London Bridge Stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "London Bridge Stays is next door to The Shard, walking distance from Borough Market, London Bridge, Southwark Cathedral, Tate Modern, and the River Thames. Guy's Hospital and King's College London are also nearby, making it ideal for medical and academic professionals.",
          },
        },
        {
          "@type": "Question",
          name: "Is smoking allowed at London Bridge Stays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, smoking is strictly not permitted inside the apartment. This is enforced and guests will be charged if this rule is violated.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "London Bridge Stays",
          item: "https://www.londonbridgestays.co.uk",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://assets.hospitable.com" />
        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London Bridge, SE1" />
        <meta name="geo.position" content="51.4997091;-0.0922814" />
        <meta name="ICBM" content="51.4997091, -0.0922814" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

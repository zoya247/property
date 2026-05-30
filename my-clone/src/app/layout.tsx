import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "London Bridge Flat | Modern 2-Bed SE1 Apartment – Book Direct",
  description:
    "Book directly: Modern 2-bedroom, 2-bathroom apartment in SE1 London. 3 mins from London Bridge Station. Free parking, fast WiFi. Ideal for business travel, relocation & tourism. Hosted by Zoe.",
  keywords:
    "London Bridge apartment, SE1 short term rental, corporate apartment London Bridge, serviced apartment Borough Market, apartment near Guy's Hospital, direct booking London flat",
  metadataBase: new URL("https://londonbridgeflat.co.uk"),
  openGraph: {
    title: "London Bridge Flat | Modern 2-Bed SE1 – Book Direct & Save",
    description:
      "Spacious 2-bed, 2-bath apartment in SE1. 3 mins from London Bridge Station, free parking, steps from Borough Market & The Shard.",
    url: "https://londonbridgeflat.co.uk",
    siteName: "London Bridge Flat",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Bridge Flat | Direct Booking SE1",
    description:
      "Book directly: Modern 2-bed apartment near London Bridge, Borough Market & The Shard. No Airbnb fees.",
  },
};

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "London Bridge Flat",
  description:
    "Modern 2-bedroom, 2-bathroom apartment in SE1 London, 3 minutes from London Bridge Station. Free parking, fast WiFi, fully equipped kitchen.",
  url: "https://londonbridgeflat.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Longstone Court, 22 Great Dover Street",
    addressLocality: "London",
    postalCode: "SE1 4LB",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.4997091",
    longitude: "-0.0922814",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
    { "@type": "LocationFeatureSpecification", name: "Washer", value: true },
    { "@type": "LocationFeatureSpecification", name: "Laptop Workspace", value: true },
  ],
  numberOfRooms: 2,
  petsAllowed: false,
  checkinTime: "15:00",
  checkoutTime: "11:00",
  starRating: { "@type": "Rating", ratingValue: "4.8", bestRating: "5" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zoe",
  jobTitle: "Property Host",
  description:
    "Experienced host managing a modern 2-bedroom apartment in SE1 London Bridge with a 4.8-star rating, specialising in business travel, relocation, and tourism stays.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the London Bridge flat suitable for business travellers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The apartment is 3 minutes from London Bridge Station with direct access to the Northern and Jubilee lines. It has a dedicated laptop workspace, fast fibre WiFi, two full bathrooms, self check-in, and free parking. Weekly and monthly rates available.",
      },
    },
    {
      "@type": "Question",
      name: "How far is the apartment from Guy's Hospital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Guy's Hospital is a 5-minute walk — ideal for visiting consultants, locum doctors, clinical researchers, and King's College London medical students on placement needing flexible short-term accommodation.",
      },
    },
    {
      "@type": "Question",
      name: "Is there free parking at the SE1 apartment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Free on-site parking is included — rare in SE1 where nearby parking typically costs £20–£40 per day.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book the London Bridge flat without using Airbnb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Booking directly through londonbridgeflat.co.uk avoids Airbnb service fees. Direct bookings are managed securely with instant confirmation and flexible long-stay terms.",
      },
    },
    {
      "@type": "Question",
      name: "How close is the flat to Borough Market and The Shard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Borough Market is 5 minutes walk and The Shard is right next to London Bridge Station — 3 minutes from the apartment. Tower Bridge and Tate Modern are within 15 minutes on foot.",
      },
    },
    {
      "@type": "Question",
      name: "Is this flat good for relocation to London?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full kitchen, washer/dryer, dining area, and spacious living room make it comfortable for longer stays. Monthly discounts available on request. Complimentary cleaning included for extended stays.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${geist.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

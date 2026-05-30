import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json() as { name?: string; email?: string };
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://londonbridgeflat.co.uk";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Booking Deposit — London Bridge Flat SE1",
              description:
                "Refundable deposit to secure your booking dates. Remaining balance due on check-in.",
            },
            unit_amount: 20000, // £200.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#enquire`,
      metadata: { guest_name: body.name ?? "" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

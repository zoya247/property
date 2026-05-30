import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-[#0d1b2a]/5 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#c9993d]" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#0d1b2a] mb-4">
          Deposit Paid — You're Confirmed!
        </h1>
        <p className="text-[#6b6b6b] mb-8 leading-relaxed">
          Your £200 deposit has been received. Zoe will be in touch within 24 hours
          with your booking confirmation and check-in details.
        </p>
        <div className="bg-white rounded-2xl p-6 border border-[#e8e4df] text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-[#6b6b6b]">Property</span>
            <span className="font-medium text-[#0d1b2a]">London Bridge Flat, SE1</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6b6b6b]">Deposit</span>
            <span className="font-medium text-[#0d1b2a]">£200 (refundable)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6b6b6b]">Check-in time</span>
            <span className="font-medium text-[#0d1b2a]">From 3:00 PM</span>
          </div>
        </div>
        <Link
          href="/"
          className="inline-block bg-[#0d1b2a] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1a2f4a] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { CheckCircle, Loader2 } from "lucide-react";

interface Props {
  bookingUrl: string;
}

type Status = "idle" | "loading" | "success" | "error" | "paying";

export default function EnquiryForm({ bookingUrl }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    check_in: "",
    check_out: "",
    guests: "2",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("enquiries").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        check_in: form.check_in || null,
        check_out: form.check_out || null,
        guests: parseInt(form.guests),
        message: form.message || null,
      });
      if (error) throw error;
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const handleDeposit = async () => {
    setStatus("paying");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error ?? "Checkout failed");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Payment error.");
      setStatus("success");
    }
  };

  if (status === "success" || status === "paying") {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-[#e8e4df]">
        <div className="w-14 h-14 rounded-full bg-[#0d1b2a]/5 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-[#c9993d]" />
        </div>
        <h3 className="text-2xl font-serif font-semibold text-[#0d1b2a] mb-2">
          Enquiry Received
        </h3>
        <p className="text-[#6b6b6b] mb-8">
          Thank you, {form.name}. We'll reply within 24 hours. To secure your
          dates now, pay a £200 refundable deposit.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDeposit}
            disabled={status === "paying"}
            className="w-full flex items-center justify-center gap-2 bg-[#c9993d] text-white font-semibold py-4 rounded-xl hover:bg-[#b8870c] transition-colors disabled:opacity-60"
          >
            {status === "paying" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
            ) : (
              "Pay £200 Deposit to Confirm Dates"
            )}
          </button>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-[#0d1b2a] text-white font-medium py-4 rounded-xl hover:bg-[#1a2f4a] transition-colors"
          >
            Or Check Availability Online
          </a>
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-4">{errorMsg}</p>}
      </div>
    );
  }

  const inputCls =
    "w-full border border-[#e8e4df] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0d1b2a] transition-colors bg-white placeholder:text-[#aaa]";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 border border-[#e8e4df] space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">
            Name <span className="text-[#c9993d]">*</span>
          </label>
          <input required type="text" value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">
            Email <span className="text-[#c9993d]">*</span>
          </label>
          <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">Phone</label>
          <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+44 ..." />
        </div>
        <div>
          <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">Guests</label>
          <select value={form.guests} onChange={set("guests")} className={inputCls}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">Check-in</label>
          <input type="date" value={form.check_in} onChange={set("check_in")} className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">Check-out</label>
          <input type="date" value={form.check_out} onChange={set("check_out")} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-[#0d1b2a] block mb-1.5">Message</label>
        <textarea value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} rows={4} placeholder="Any questions or requirements..." />
      </div>
      {status === "error" && (
        <p className="text-red-500 text-sm">{errorMsg || "Something went wrong. Please try again."}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-[#0d1b2a] text-white font-medium py-4 rounded-xl hover:bg-[#1a2f4a] transition-colors disabled:opacity-60"
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          "Send Enquiry"
        )}
      </button>
      <p className="text-center text-sm text-[#6b6b6b]">
        Want instant confirmation?{" "}
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-[#0d1b2a] font-semibold underline underline-offset-2">
          Book online directly
        </a>
      </p>
    </form>
  );
}

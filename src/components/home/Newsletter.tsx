"use client";

import { type FormEvent, useState } from "react";
import { Check, Mail, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage(`Thanks! ${cleanEmail} is now on the GearUp update list.`);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white px-5 pb-24 pt-14 text-center dark:border-white/10 dark:bg-[#091431] sm:px-10 sm:pb-32 sm:pt-20">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-8 size-64 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 size-72 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15"
      />

      <div className="relative mx-auto max-w-2xl">
        <p className="text-xs font-bold tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          THE GEARUP FIELD NOTES
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          Plan your next
          <span className="block bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            great escape.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          Get outdoor ideas, useful rental tips, and new GearUp updates. No
          spam—just better adventures.
        </p>

        <form
          onSubmit={handleNewsletterSubmit}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label className="relative flex h-12 flex-1 items-center">
            <Mail className="absolute left-4 size-5 text-slate-400" />

            <input
              type="email"
              required
              autoComplete="email"
              aria-label="Email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              placeholder="Enter your email address"
              className="h-full w-full rounded-xl border border-slate-200 bg-white px-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            />
          </label>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-200"
          >
            Get updates
            <Send className="size-4" />
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
            <Check className="size-3.5" />
          </span>
          Adventure updates only.
        </div>

        {message && (
          <p
            role="status"
            className="mt-3 text-sm font-medium text-cyan-700 dark:text-cyan-300"
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
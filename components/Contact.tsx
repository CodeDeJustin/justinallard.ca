"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

type FieldState = { value: string; error: string | null };

export const Contact = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [formState, setFormState] = useState<{
    email: FieldState;
    message: FieldState;
  }>({
    email: { value: "", error: null },
    message: { value: "", error: null },
  });

  const dropIn: Variants = {
    hidden: { y: "4vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 25,
        stiffness: 400,
      },
    },
    exit: { y: "4vh", opacity: 0 },
  };

  function onChangeHandler(field: "email" | "message", value: string) {
    setFormState((prev) => ({
      ...prev,
      [field]: { value, error: null },
    }));
  }

  async function handleSubmit() {
    const { email, message } = formState;

    setSuccess("");
    setError("");

    const updated = { ...formState };

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.value.trim()) {
      updated.email.error = "Oops! Email cannot be empty.";
      setFormState(updated);
      return;
    }

    if (!email.value.toLowerCase().match(regex)) {
      updated.email.error = "Please enter a valid email address";
      setFormState(updated);
      return;
    }

    if (!message.value.trim()) {
      updated.message.error = "Oops! Message cannot be empty.";
      setFormState(updated);
      return;
    }

    // Everything is fine - Proceed with the API call.
    // TODO: brancher ton Server Action (sendContact) ou call vers /contact page.
    setLoading(true);
    try {
      // ...call
      setSuccess("Sent!");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleButtonClick() {
    setOpen((v) => !v);
    setFormState({
      email: { value: "", error: null },
      message: { value: "", error: null },
    });
    setLoading(false);
    setError("");
    setSuccess("");
  }

  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      <div className="fixed bottom-10 right-4 z-[99999] flex flex-col items-end md:right-10">
        {open && (
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-4 mb-4 flex flex-col overflow-hidden rounded-xl bg-zinc-800 shadow-2xl md:mx-0"
          >
            <div className="bg-zinc-700 p-4">
              <h2 className="text-sm font-bold text-zinc-200 md:text-xl">
                Have a question? Drop in your message 👇
              </h2>
              <small className="mb-10 hidden text-xs text-zinc-400 md:block">
                It won't take more than 10 seconds. Shoot your shot. 😉
              </small>
            </div>

            <div className="content flex flex-col bg-zinc-800 p-6">
              <label className="mb-2 text-sm font-normal text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                value={formState.email.value}
                onChange={(e) => onChangeHandler("email", e.target.value)}
                className="mb-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-400 placeholder:text-sm focus:border-gray-400 focus:outline-none"
                placeholder="johndoe@xyz.com"
              />
              <small className="h-4 min-h-4 font-semibold text-red-500">
                {formState.email.error || ""}
              </small>

              <label className="mb-2 text-sm font-normal text-zinc-400">
                Message
              </label>
              <textarea
                rows={3}
                value={formState.message.value}
                onChange={(e) => onChangeHandler("message", e.target.value)}
                className="mb-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-400 placeholder:text-sm focus:border-gray-400 focus:outline-none"
                placeholder="I'd love a compliment from you."
              />
              <small className="mb-4 h-4 min-h-4 font-semibold text-red-500">
                {formState.message.error || ""}
              </small>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mb-4 w-full rounded-md border-2 border-zinc-800 bg-zinc-700 px-4 py-2 text-sm font-normal text-zinc-100 transition duration-200 hover:shadow-none disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <small className="mb-4 h-4 min-h-4">
                {success ? (
                  <p className="text-sm font-semibold text-green-500">
                    {success}
                  </p>
                ) : null}
                {error ? (
                  <p className="text-sm font-semibold text-red-500">{error}</p>
                ) : null}
              </small>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleButtonClick}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-700 shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-zinc-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
      </div>
    </AnimatePresence>
  );
};

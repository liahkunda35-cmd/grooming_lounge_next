"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/** 20 minutes of inactivity before forced admin logout. */
const SESSION_IDLE_TIMEOUT_MS = 20 * 60 * 1000;

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
  "wheel",
];

/**
 * Signs the admin out after inactivity and sends them to the login page.
 */
export default function AdminIdleTimeout() {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loggingOutRef = useRef(false);

  useEffect(() => {
    async function expireSession() {
      if (loggingOutRef.current) return;
      loggingOutRef.current = true;

      try {
        await fetch("/api/admin/logout", { method: "POST" });
      } catch {
        /* still redirect */
      }

      router.replace("/admin/login?reason=inactive");
      router.refresh();
    }

    function resetTimer() {
      if (loggingOutRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        void expireSession();
      }, SESSION_IDLE_TIMEOUT_MS);
    }

    resetTimer();

    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, resetTimer, { passive: true });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      for (const eventName of ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, resetTimer);
      }
    };
  }, [router]);

  return null;
}

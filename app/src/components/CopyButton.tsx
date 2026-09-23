"use client";

import { useState } from "react";

/**
 * `navigator.clipboard` exists only in a secure context, so it is undefined when the app is
 * opened over plain HTTP on a LAN address rather than on localhost — which is how this app is
 * usually reached. The hidden-textarea fallback still works there.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the legacy path
    }
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    setState(await writeToClipboard(text) ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button type="button" className="button primary" onClick={copy} title={`${Math.round(text.length / 1000)}k characters`}>
      {state === "copied" ? "Copied" : state === "failed" ? "Copy failed — select and copy manually" : label}
    </button>
  );
}

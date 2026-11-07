"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Desktop: the normal sidebar. Phones: a top bar, and the menu slides in from the left as a drawer.
export default function PortalSidebar({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const openBtn = useRef(null);
  const closeBtn = useRef(null);
  const wasOpen = useRef(false);

  // close the drawer after moving to another page
  useEffect(() => setOpen(false), [pathname]);

 useEffect(() => {
  if (!open) {
    if (wasOpen.current) openBtn.current?.focus();
    wasOpen.current = false;
    return;
  }
  wasOpen.current = true;
  const onKey = (e) => {
    if (e.key === "Escape") setOpen(false);
  };
  document.addEventListener("keydown", onKey);

  // lock the page behind the drawer (html and body, plus the fixed-body trick for iPhones)
  const mobile = window.matchMedia("(max-width: 820px)").matches;
  const y = window.scrollY;
  const html = document.documentElement;
  const body = document.body;
  const saved = { h: html.style.overflow, b: body.style.cssText };
  if (mobile) {
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
  }
  closeBtn.current?.focus();

  return () => {
    document.removeEventListener("keydown", onKey);
    if (mobile) {
      html.style.overflow = saved.h;
      body.style.cssText = saved.b;
      window.scrollTo({ top: y, behavior: "instant" });
    }
  };
}, [open]);

  return (
    <aside className={`pt-side ${open ? "open" : ""}`}>
      <div className="pt-brand">
        <div>
          <strong>Elaaf School</strong>
          <span>Teacher portal</span>
        </div>
        <button ref={openBtn} type="button" className="pt-menu-btn" aria-expanded={open} aria-controls="pt-menu" onClick={() => setOpen(true)}>
          <span className="pt-burger" aria-hidden="true"><i /><i /><i /></span>
          Menu
        </button>
      </div>

      <div className="pt-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />

      <div id="pt-menu" className="pt-menu">
        <div className="pt-drawer-head">
          <div>
            <strong>Elaaf School</strong>
            <span>Teacher portal</span>
          </div>
          <button ref={closeBtn} type="button" className="pt-close-btn" aria-label="Close menu" onClick={() => setOpen(false)}>&times;</button>
        </div>
        {children}
      </div>
    </aside>
  );
}

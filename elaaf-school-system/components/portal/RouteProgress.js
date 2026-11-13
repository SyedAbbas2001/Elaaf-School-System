"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// A thin bar at the top of the screen. It starts when an internal link is clicked
// and finishes when the new page has opened, so people can see that something is happening.
export default function RouteProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const creep = useRef(null);
  const failsafe = useRef(null);
  const hide = useRef(null);
  const active = useRef(false);
  const startHref = useRef("");

  const finish = () => {
    if (!active.current) return;
    active.current = false;
    clearInterval(creep.current);
    clearTimeout(failsafe.current);
    setWidth(100);
    hide.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 300);
  };

  const start = () => {
    clearInterval(creep.current);
    clearTimeout(failsafe.current);
    clearTimeout(hide.current);
    active.current = true;
    startHref.current = window.location.href;
    setVisible(true);
    setWidth(8);
    // moves forward slowly, never reaching the end until the page is ready
    creep.current = setInterval(() => {
      if (window.location.href !== startHref.current) return finish();
      setWidth((w) => (w < 90 ? w + (90 - w) * 0.12 : w));
    }, 180);
    failsafe.current = setTimeout(finish, 12000);
  };

  // the page changed
  useEffect(() => {
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page or only a #hash
      start();
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearInterval(creep.current);
      clearTimeout(failsafe.current);
      clearTimeout(hide.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="pt-progress" aria-hidden="true" style={{ width: `${width}%`, opacity: visible ? 1 : 0 }} />;
}

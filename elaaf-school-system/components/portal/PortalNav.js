"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortalNav() {
  const p = usePathname();
  const listActive = p === "/portal/dashboard" || (p.startsWith("/portal/dashboard/quizzes/") && !p.endsWith("/new"));
  const newActive = p === "/portal/dashboard/quizzes/new";
  return (
    <nav className="pt-nav" aria-label="Portal">
      <Link href="/portal/dashboard" className={listActive ? "active" : ""}>All quizzes</Link>
      <Link href="/portal/dashboard/quizzes/new" className={newActive ? "active" : ""}>Create quiz</Link>
    </nav>
  );
}

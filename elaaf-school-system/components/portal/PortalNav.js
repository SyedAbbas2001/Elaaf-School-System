"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortalNav({ role }) {
  const p = usePathname();
  const admin = role === "admin";
  const quizzesActive = p === "/portal/dashboard/quizzes" || (p.startsWith("/portal/dashboard/quizzes/") && !p.endsWith("/new"));
  const cls = (on) => (on ? "active" : "");
  return (
    <nav className="pt-nav" aria-label="Portal">
      <Link href="/portal/dashboard" className={cls(p === "/portal/dashboard")}>Home</Link>
      <Link href="/portal/dashboard/quizzes" className={cls(quizzesActive)}>{admin ? "All quizzes" : "My quizzes"}</Link>
      <Link href="/portal/dashboard/quizzes/new" className={cls(p === "/portal/dashboard/quizzes/new")}>Create quiz</Link>
      <Link href="/portal/dashboard/diary" className={cls(p === "/portal/dashboard/diary")}>My daily diary</Link>
      {admin && (
        <>
          <div className="pt-nav-label">Admin</div>
          <Link href="/portal/dashboard/diary/all" className={cls(p === "/portal/dashboard/diary/all")}>All diaries</Link>
          <Link href="/portal/dashboard/diary/checklist" className={cls(p === "/portal/dashboard/diary/checklist")}>Monthly checklist</Link>
          <Link href="/portal/dashboard/teachers" className={cls(p.startsWith("/portal/dashboard/teachers"))}>Teachers</Link>
          <Link href="/portal/dashboard/logins" className={cls(p === "/portal/dashboard/logins")}>Login activity</Link>
        </>
      )}
    </nav>
  );
}

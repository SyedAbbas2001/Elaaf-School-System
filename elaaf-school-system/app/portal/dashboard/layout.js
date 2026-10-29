import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PortalNav from "@/components/portal/PortalNav";
import SignOutButton from "@/components/portal/SignOutButton";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/portal/login");

  return (
    <div className="pt-shell">
      <aside className="pt-side">
        <div className="pt-brand">
          <strong>Elaaf School</strong>
          <span>Teacher portal</span>
        </div>
        <PortalNav />
        <div className="pt-user">
          <b>{session.user.name}</b>
          {session.user.role === "admin" ? "Administrator" : "Teacher"}
        </div>
        <SignOutButton />
      </aside>
      <main className="pt-main">{children}</main>
    </div>
  );
}

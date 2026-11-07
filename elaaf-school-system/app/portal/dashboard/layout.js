import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalNav from "@/components/portal/PortalNav";
import SignOutButton from "@/components/portal/SignOutButton";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/portal/login");

  // A deactivated account is sent back to sign in
  await connectDB();
  const account = await User.findById(session.user.id).select("active").lean();
  if (!account || account.active === false) redirect("/portal/login");

  return (
    <div className="pt-shell">
      <PortalSidebar>
        <PortalNav role={session.user.role} />
        <div className="pt-user">
          <b>{session.user.name}</b>
          {session.user.role === "admin" ? "Administrator" : "Teacher"}
        </div>
        <SignOutButton />
      </PortalSidebar>
      <main className="pt-main">{children}</main>
    </div>
  );
}

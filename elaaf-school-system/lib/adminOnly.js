import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Returns the session only when the signed-in user is an admin, otherwise null
export async function getAdminSession() {
  const s = await getServerSession(authOptions);
  return s && s.user.role === "admin" ? s : null;
}

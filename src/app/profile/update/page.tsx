import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateView from "./update-view";

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?redirect=/profile/update&reason=protected");
  }

  return <UpdateView user={session.user} />;
}

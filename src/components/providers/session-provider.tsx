import { SessionProvider as NextAuthProvider } from "next-auth/react";

import React from "react";

import { auth } from "@/server/auth";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
}

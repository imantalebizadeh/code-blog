import { Metadata } from "next";

import SignInForm from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "ورود",
};

export default function SignInPage() {
  return <SignInForm />;
}

import { Metadata } from "next";

import SignUpForm from "@/components/forms/signup-form";

export const metadata: Metadata = {
  title: "ثبت نام",
};

export default function SignUpPage() {
  return <SignUpForm />;
}

import { notFound } from "next/navigation";

import { auth } from "@/server/auth";
import { getUserByUsername } from "@/server/data/user";

import PasswordEditForm from "@/components/forms/password-form";
import ProfileForm from "@/components/forms/profile-form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) notFound();

  const user = await getUserByUsername(session.user.username);

  if (!user) notFound();

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_auto] gap-8 rounded-xl bg-accent/50  p-6 md:grid-cols-2 md:grid-rows-1">
      <section className="divide-y divide-background">
        <h4 className="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
          ویرایش اطلاعات
        </h4>
        <ProfileForm user={user} />
      </section>
      <section className="divide-y divide-background">
        <h4 className="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
          تغییر رمز عبور
        </h4>
        <PasswordEditForm user={user} className="pt-5" />
      </section>
    </div>
  );
}

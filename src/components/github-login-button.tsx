"use client";

import { useFormStatus } from "react-dom";

import Icon from "./common/icon";
import { Button } from "./ui/button";

export default function GithubLoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full gap-2"
      disabled={pending}
    >
      {pending ? (
        <Icon name="LoaderCircle" size={20} className="animate-spin" />
      ) : (
        <>
          <Icon name="Github" size={20} />
          ورود با گیت هاب
        </>
      )}
    </Button>
  );
}

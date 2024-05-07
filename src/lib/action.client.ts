import { createSafeActionClient } from "next-safe-action";

import { auth } from "@/server/auth";

import { DEFAULT_SERVER_ERROR } from "@/lib/constants";

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
});

export const authAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
  async middleware() {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("احراز هویت صورت نگرفته است");
    }

    return session.user;
  },
});

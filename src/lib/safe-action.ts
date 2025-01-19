import { createSafeActionClient } from "next-safe-action";

import { SERVER_ERROR_MESSAGE } from "@/lib/constants";
import { auth } from "@/server/auth";

export const publicActionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof Error) {
      return error.message;
    }

    return SERVER_ERROR_MESSAGE;
  },
});

export const authenticatedActionClient = publicActionClient.use(
  async ({ next }) => {
    const session = await auth();

    if (!session) {
      throw new Error("Session not found");
    }

    if (!session.user) {
      throw new Error("Unauthenticated");
    }

    return next({ ctx: { user: session.user } });
  },
);

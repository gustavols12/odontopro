"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTimesClinic({ userId }: { userId: string }) {
  if (!userId) {
    return {
      times: [],
      userId: userId,
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        times: true,
      },
    });
    if (!user) {
      return {
        times: [],
        userId: userId,
      };
    }

    return {
      times: user.times,
      userId: user.id,
    };
  } catch (error) {
    return {
      times: [],
      userId: userId,
    };
  }
}

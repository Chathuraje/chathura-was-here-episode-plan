"use server";

import { revalidatePath } from "next/cache";
import { clearDataCache } from "@/lib/content";

export async function reloadData() {
  clearDataCache();
  revalidatePath("/", "layout");
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function completeOnboardingAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const displayName = formData.get("displayName") as string;
  const timezone = formData.get("timezone") as string;

  if (displayName) {
    await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("user_id", user.id);
  }

  await supabase
    .from("user_settings")
    .update({
      timezone: timezone || "Europe/Warsaw",
      onboarding_completed: true,
    })
    .eq("user_id", user.id);

  redirect("/dashboard");
}

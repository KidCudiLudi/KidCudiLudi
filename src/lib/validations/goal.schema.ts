import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany").max(200),
  description: z.string().max(2000).nullable().optional(),
  life_area: z.string().nullable().optional(),
  target_date: z.string().nullable().optional(),
  status: z.enum(["active", "completed", "abandoned"]).default("active"),
});

export type GoalInput = z.infer<typeof goalSchema>;

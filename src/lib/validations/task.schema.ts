import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany").max(200),
  goal_id: z.string().uuid().nullable().optional(),
  due_date: z.string().nullable().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export type TaskInput = z.infer<typeof taskSchema>;

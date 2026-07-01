import { z } from "zod";

export const habitSchema = z.object({
  title: z.string().min(1, "Nazwa jest wymagana").max(100),
  life_area: z.string().nullable().optional(),
});

export type HabitInput = z.infer<typeof habitSchema>;

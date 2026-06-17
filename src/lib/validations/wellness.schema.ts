import { z } from "zod";

export const weightLogSchema = z.object({
  weight: z.number().positive("Waga musi być większa od 0").max(500),
  logged_date: z.string(),
});

export const moodLogSchema = z.object({
  mood: z.number().int().min(1).max(5),
  note: z.string().max(500).nullable().optional(),
  logged_date: z.string(),
});

export const sleepLogSchema = z.object({
  hours: z.number().min(0).max(24),
  quality: z.number().int().min(1).max(5),
  logged_date: z.string(),
});

export type WeightLogInput = z.infer<typeof weightLogSchema>;
export type MoodLogInput = z.infer<typeof moodLogSchema>;
export type SleepLogInput = z.infer<typeof sleepLogSchema>;

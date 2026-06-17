import { z } from "zod";

export const calendarEventSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany").max(200),
  description: z.string().max(1000).nullable().optional(),
  life_area: z.string().nullable().optional(),
  event_date: z.string(),
  start_time: z.string().nullable().optional(),
  end_time: z.string().nullable().optional(),
});

export type CalendarEventInput = z.infer<typeof calendarEventSchema>;

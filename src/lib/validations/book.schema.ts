import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany").max(300),
  author: z.string().max(200).nullable().optional(),
  total_pages: z.number().int().positive().nullable().optional(),
  status: z.enum(["want-to-read", "reading", "finished", "abandoned"]).default("want-to-read"),
});

export const readingSessionSchema = z.object({
  book_id: z.string().uuid(),
  pages_read: z.number().int().positive("Musisz przeczytać przynajmniej 1 stronę"),
  session_date: z.string(),
  note: z.string().max(500).nullable().optional(),
});

export type BookInput = z.infer<typeof bookSchema>;
export type ReadingSessionInput = z.infer<typeof readingSessionSchema>;

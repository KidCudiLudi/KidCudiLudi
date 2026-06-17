import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive("Kwota musi być większa od 0"),
  type: z.enum(["income", "expense"]),
  category_id: z.string().uuid().nullable().optional(),
  description: z.string().max(300).nullable().optional(),
  transaction_date: z.string(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;

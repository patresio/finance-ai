import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportsSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportsSchema>;

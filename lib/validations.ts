import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(130,{
    message:"Username must not exceed 130 characters"
  }),
  explanation: z.string().min(30,{
    message: "Explain your question in minimum 30 characters"
  }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    text: z.string().min(1),
    reminder: z.string().datetime().optional().nullable(),
    archived: z.boolean().optional(),
  }),
});

export const updateNoteSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    text: z.string().min(1).optional(),
    reminder: z.string().datetime().nullable().optional(),
    archived: z.boolean().optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

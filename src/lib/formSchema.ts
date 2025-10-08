import { z } from 'zod/v4';

export const addFormSchema = z.object({
  name: z.string().min(3),
  priceInCents: z.coerce.number(),
  description: z.string().min(5),
  file: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((f) => f.size > 0, "required."),
  image: z
    .instanceof(File)
    .refine(
      (f) => f.size > 0 || f.type.startsWith("image/"),
      "Max 100 kB upload size."
    ),
});

export const userSchema = z.object({
  email: z.email(),
  username: z.string().min(3),
  password: z.string().min(3),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});


export type addFormSchemaType = typeof addFormSchema
export type userSchemaType = typeof userSchema
export type loginSchemaType = typeof loginSchema

import { z } from 'zod';

export const CreateProductRequest = z.object({
  name: z.string().nonempty(),
  price: z.coerce.number().positive(),
  image: z.string().nullable().optional(),
});

export type CreateProductRequest = z.infer<typeof CreateProductRequest>;

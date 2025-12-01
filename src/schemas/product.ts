import { z } from 'zod';

export const Product = z.object({
  tenant_id: z.string(),
  product_id: z.string(),
  name: z.string(),
  image_url: z.string().nullable().optional(),
  price: z.coerce.number(),
});

export type Product = z.infer<typeof Product>;

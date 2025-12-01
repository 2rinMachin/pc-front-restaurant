import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_TENANT_ID: z.string().nonempty(),
    NEXT_PUBLIC_USERS_URL: z.url(),
    NEXT_PUBLIC_ORDERS_URL: z.url(),
    NEXT_PUBLIC_CATALOG_URL: z.url(),
    NEXT_PUBLIC_ANALYTICS_URL: z.url(),
    NEXT_PUBLIC_WEBSOCKET_URL: z.string().nonempty(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TENANT_ID: process.env.NEXT_PUBLIC_TENANT_ID,
    NEXT_PUBLIC_USERS_URL: process.env.NEXT_PUBLIC_USERS_URL,
    NEXT_PUBLIC_ORDERS_URL: process.env.NEXT_PUBLIC_ORDERS_URL,
    NEXT_PUBLIC_CATALOG_URL: process.env.NEXT_PUBLIC_CATALOG_URL,
    NEXT_PUBLIC_ANALYTICS_URL: process.env.NEXT_PUBLIC_ANALYTICS_URL,
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
  },
  emptyStringAsUndefined: true,
});

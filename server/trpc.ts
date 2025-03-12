import { initTRPC } from '@trpc/server';

// 👇 Define the context structure (e.g., username)
// Optional username in context
const t = initTRPC.context<{
  username?: string;  
}>().create();

// Export reusable router and procedures
export const router = t.router;
export const publicProcedure = t.procedure;
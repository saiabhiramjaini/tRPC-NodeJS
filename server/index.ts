import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

const todoInputType = z.object({
    title: z.string(),
    description: z.string(),
  });

// Sample router with a todo procedure
const appRouter = router({
  createTodo: publicProcedure
  .input(todoInputType)
  .mutation(async (opts) => {
    const username = opts.ctx.username; // Access context
    console.log("Username:", username);

    // Logic to handle todo creation
    return { id: "1", message: "Todo created!" };
  }),
});

// 👇 Create the context to check auth headers
const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    // Extract the Authorization header
    const authHeader = opts.req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    // Simulate decoding a token (e.g., JWT)
    const username = authHeader === "Bearer 123" ? "john_doe" : undefined;

    return { username };
  },
});

server.listen(3000);
console.log("🚀 Server running on http://localhost:3000");
export type AppRouter = typeof appRouter;
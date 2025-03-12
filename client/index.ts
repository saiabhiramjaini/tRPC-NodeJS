import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index";

// Create tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        // Send auth token (simulating a login)
        return {
          Authorization: "Bearer 123",  // Pass token in header
        };
      },
    }),
  ],
});

// Call the createTodo mutation
async function main() {
  const response = await trpc.createTodo.mutate({
    title: "Learn tRPC",
    description: "Understand how context works!",
  });

  console.log(response);
}

main();
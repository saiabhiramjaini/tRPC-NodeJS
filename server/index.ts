import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import mongoose, { mongo } from 'mongoose';
import { User , Todo} from "./db";
import jwt from "jsonwebtoken";
import { userRouter } from './routers/user';
import { todoRouter } from './routers/todo';
import cors from "cors";
export const SECRET = 'secret';

mongoose.connect('mongodb://localhost:27017/trpc');

// using trpc
const appRouter = router({
    user: userRouter,
    todo: todoRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token);
            return new Promise<{db: {Todo: typeof Todo, User: typeof User}, userId?: string}>((resolve) => {
                jwt.verify(token, SECRET, (err, user) => {
                    if (user) {
                      // @ts-ignore
                        resolve({userId: user.userId as string, db: {Todo, User}});
                    } else {
                        resolve({db: {Todo, User}});
                    }
                });
            })
        }

        return {
            db: {Todo, User},
        }
    }
});
   
server.listen(3000);
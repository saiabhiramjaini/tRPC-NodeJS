import { middleware } from "../trpc";
import { TRPCError } from "@trpc/server";

export const isLoggedIn = middleware(async (opts)=>{
    const {ctx} = opts;
    if(!ctx.userId){
        throw new TRPCError({ code: "UNAUTHORIZED"})
    }
    const user = await ctx.db.User.findOne({
        username: ctx.userId
    })
    return opts.next()
})
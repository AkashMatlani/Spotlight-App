import { v } from "convex/values";
import { mutation } from "./_generated/server";
export const createUser = mutation({

    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.number(),
    },

    handler: async (ctx, args) => {

        const existingUser= await ctx.db.query("users")
        .withIndex("by_clerk_id",(q)=>q.eq("clerkId", args.clerkId))
        .first()

        if(existingUser) return

        //create users in dv
        await ctx.db.insert("users", {
            username: args.string(),
            fullname: args.string(),
            email: args.string(),
            bio: args.optional(v.string()),
            image: args.string(),
            clerkId: args.number(),
            followers: 0,
            following: 0,
            posts: 0,
        })
    }

})
import { v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
export const createUser = mutation({

    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string(),
    },

    handler: async (ctx, args) => {

        const existingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first()

        if (existingUser) return

        const existingUserByEmail = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existingUserByEmail) return;

        //create users in dv
        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            bio: args.bio,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0,
        })
    }

})

export const getUserByClerkId = query({
    args: { clearkId: v.string() },
    handler: async (ctx, args) => {

        const user = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clearkId))
            .unique();

        return user;
    }
})

export const updateProfile = mutation({
    args: {
        fullname: v.string(),
        bio: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        const curreentUser = await getAuthenticatedUser(ctx);

        await ctx.db.patch(curreentUser._id, {
            fullname: args.fullname,
            bio: args.bio,
        });
    },
});

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
    const identify = await ctx.auth.getUserIdentity();
    if (!identify) throw new Error("Unauthorized");

    const currentUser = await ctx.db.query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identify.subject)).first();

    if (!currentUser) throw new Error("User not found")

    return currentUser;
}
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
    path: "/clerk-webhooks",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        //check headers

        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Error Occurred -no svix headers", {
                status: 400,
            });
        }
        const payload = await request.json();
        const body = JSON.stringify(payload);
        const wh = new Webhook(webhookSecret);

        let evt: any;
        //verify webhook
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as any;
        } catch (error) {
            console.error("Error verifying webhooks:", error);
            return new Response("Error Occured", { status: 400 });
        }

        const eventType = evt.type;
        if (eventType === "user.created") {
            const { id, email_address, first_name, last_name, image_url } = evt.data;

            const email = evt.data.email_addresses?.[0]?.email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            if (!email) {
                console.error("No email found in webhook");
                return new Response("Email missing", { status: 400 });
            }
            try {
                await ctx.runMutation(api.users.createUser, {
                    email,
                    fullname: name,
                    image: image_url,
                    clerkId: id,
                    username: email.split("@")[0],

                })
            } catch (error) {
                console.log("Error creating User:", error);
                return new Response("Error Creating user", { status: 500 });
            }
        }
        return new Response("Webhook processed Successfully", { status: 200 });
    })
})


export default http;


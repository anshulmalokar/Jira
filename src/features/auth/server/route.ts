import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator"
import { loginSchema, formSchema } from "@/app/(auth)/schema";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";

const app = new Hono()
.post("/login",zValidator('json' ,loginSchema) ,async (c) => {
    const {email, password} = c.req.valid("json");
    return c.json({
        email,
        password
    });
}).post("/signup",zValidator('json', formSchema), async(c) => {
    const {name, email, password} = c.req.valid("json");
    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    return c.json({
        name,
        email,
        password
        });
});

export default app;

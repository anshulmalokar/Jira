import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator"
import { loginSchema } from "@/app/(auth)/schema";

const app = new Hono()
.post("/login",zValidator('json' ,loginSchema) ,async (c) => {
    const {email, password} = c.req.valid("json");
    console.log('reached');
    return c.json({
        email,
        password
    });
});

export default app;

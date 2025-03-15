import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator"
import {workspaceSchema} from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { ID } from "node-appwrite";
const app = new Hono()
    .post('/', 
          zValidator('json', workspaceSchema),
          sessionMiddleware,
          async (c) => {
          const databases = c.get('databases');
          const user = c.get('user');
          const {name} = c.req.valid('json');
          const workspace = await databases.createDocument(
            DATABASE_ID,
            WORKSPACE_ID,
            ID.unique(),
            {
                name,
                userId: user.$id
            }
          );
          return c.json({data: workspace});
    })

export default app;
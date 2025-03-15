import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator"
import {workspaceSchema} from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, STORAGE_ID, WORKSPACE_ID } from "@/config";
import { ID } from "node-appwrite";
const app = new Hono()
    .post('/', 
          zValidator('form', workspaceSchema),
          sessionMiddleware,
          async (c) => {
          const databases = c.get('databases');
          const storage = c.get('storage');
          const user = c.get('user');
          const {name, image} = c.req.valid('form');
          let uploadedImageUrl: string | undefined;
          if(image instanceof File){
            const file = await storage.createFile(
              STORAGE_ID,
              ID.unique(),
              image,
            );
            const arrayBuffer = await storage.getFilePreview(STORAGE_ID ,file.$id);
            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
          }
          const workspace = await databases.createDocument(
            DATABASE_ID,
            WORKSPACE_ID,
            ID.unique(),
            {
                name,
                userId: user.$id,
                imageUrl: uploadedImageUrl
            }
          );
          return c.json({data: workspace});
    });

export default app;
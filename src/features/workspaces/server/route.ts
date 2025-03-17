import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { updateWorkSpaceSchema, workspaceSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, MEMBERS_ID, STORAGE_ID, WORKSPACE_ID } from "@/config";
import { Databases, ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/type";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/members/utils";
const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);
    if (members.total == 0) {
      return c.json({
        data: {
          document: [],
          total: 0,
        },
      });
    }
    const workspaceIds = members.documents.map((m) => m.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );
    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", workspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { name, image } = c.req.valid("form");
      let uploadedImageUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(STORAGE_ID, ID.unique(), image);
        const arrayBuffer = await storage.getFilePreview(STORAGE_ID, file.$id);
        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }else{
        uploadedImageUrl = image;
      }
      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(6),
        }
      );
      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: MemberRole.ADMIN,
      });
      return c.json({ data: workspace });
    }
  )
  .patch(
    "/:workspaceId",
    zValidator("form", updateWorkSpaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases: Databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { workspaceId } = c.req.param();
      const { name, image } = c.req.valid("form");
      const member = await getMember({
        databases: databases,
        workspaceId: workspaceId,
        userId: user.$id,
      });
      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({
          error: "You are not the admin of this workspace",
        });
      }
      let uploadedImageUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(STORAGE_ID, ID.unique(), image);
        const arrayBuffer = await storage.getFilePreview(STORAGE_ID, file.$id);
        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }else{
        uploadedImageUrl = image;
      }
      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        workspaceId,
        {
          name,
          imageUrl: uploadedImageUrl,
        }
      );
      return c.json({ data: workspace });
    }
  );

export default app;

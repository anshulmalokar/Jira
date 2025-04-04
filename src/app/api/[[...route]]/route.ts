import auth from '@/features/auth/server/route'
import workspaces from "@/features/workspaces/server/route"
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
const app = new Hono().basePath('/api')

const routes = app
               .route("/auth", auth)
               .route('/workspaces', workspaces);
export type AppType = typeof routes;
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
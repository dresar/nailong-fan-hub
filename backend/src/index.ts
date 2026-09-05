import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { jwt, sign } from "hono/jwt";
import { db } from "./db";
import * as schema from "./db/schema";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { eq } from "drizzle-orm";

const app = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-nailong";

// Middleware
app.use("/*", cors());

// Auth Middleware (example for protected routes)
const authMiddleware = jwt({
  secret: JWT_SECRET,
  alg: "HS256",
});

// Health Check
app.get("/", (c) => c.text("Nailong Fan Hub API is running!"));

// --- AUTH ROUTES ---

app.post("/auth/register", async (c) => {
  const { username, email, password } = await c.req.json();
  
  // Check if user exists
  const existing = await db.query.users.findFirst({
    where: (users, { or, eq }) => or(eq(users.username, username), eq(users.email, email)),
  });

  if (existing) {
    return c.json({ error: "Username or email already exists" }, 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const [newUser] = await db.insert(schema.users).values({
    username,
    email,
    passwordHash,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
  }).returning();

  const token = await sign({ id: newUser.id, username: newUser.username }, JWT_SECRET);
  
  return c.json({ user: newUser, token });
});

app.post("/auth/login", async (c) => {
  const { username, password } = await c.req.json();
  
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const token = await sign({ id: user.id, username: user.username }, JWT_SECRET);
  
  return c.json({ user, token });
});

app.get("/auth/me", authMiddleware, async (c) => {
  const payload = c.get("jwtPayload");
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, payload.id),
  });
  return c.json(user);
});

// --- DATA ROUTES ---

app.get("/characters", async (c) => {
  const result = await db.select().from(schema.characters);
  return c.json(result);
});

app.get("/episodes", async (c) => {
  const result = await db.select().from(schema.episodes);
  return c.json(result);
});

app.get("/memes", async (c) => {
  const result = await db.select().from(schema.memes);
  return c.json(result);
});

app.get("/news", async (c) => {
  const result = await db.select().from(schema.news);
  return c.json(result);
});

app.get("/products", async (c) => {
  const result = await db.select().from(schema.products);
  return c.json(result);
});

app.get("/posts", async (c) => {
  const result = await db.select().from(schema.posts);
  return c.json(result);
});

app.get("/leaderboard", async (c) => {
  const result = await db.select().from(schema.leaderboard);
  return c.json(result);
});

app.get("/events", async (c) => {
  const result = await db.select().from(schema.events);
  return c.json(result);
});

app.get("/faqs", async (c) => {
  const result = await db.select().from(schema.faqs);
  return c.json(result);
});

app.get("/gallery", async (c) => {
  const result = await db.select().from(schema.galleryItems);
  return c.json(result);
});

app.get("/collection", async (c) => {
  const result = await db.select().from(schema.collectionItems);
  return c.json(result);
});

// --- ADMIN ROUTES (CRUD) ---

// Generic CRUD helper (simplified for this task)
const createCrud = (path: string, table: any) => {
  app.get(`/admin/${path}`, authMiddleware, async (c) => {
    const payload = c.get("jwtPayload");
    const user = await db.query.users.findFirst({ where: eq(schema.users.id, payload.id) });
    if (user?.role !== "admin") return c.json({ error: "Unauthorized" }, 403);
    
    const result = await db.select().from(table);
    return c.json(result);
  });

  app.post(`/admin/${path}`, authMiddleware, async (c) => {
    const payload = c.get("jwtPayload");
    const user = await db.query.users.findFirst({ where: eq(schema.users.id, payload.id) });
    if (user?.role !== "admin") return c.json({ error: "Unauthorized" }, 403);

    const body = await c.req.json();
    const [inserted] = await db.insert(table).values(body).returning();
    return c.json(inserted);
  });

  app.delete(`/admin/${path}/:id`, authMiddleware, async (c) => {
    const payload = c.get("jwtPayload");
    const user = await db.query.users.findFirst({ where: eq(schema.users.id, payload.id) });
    if (user?.role !== "admin") return c.json({ error: "Unauthorized" }, 403);

    const id = c.req.param("id");
    // Handle different primary key names
    const pk = (table as any).id || (table as any).slug || (table as any).rank;
    await db.delete(table).where(eq(pk, id));
    return c.json({ success: true });
  });

  app.put(`/admin/${path}/:id`, authMiddleware, async (c) => {
    const payload = c.get("jwtPayload");
    const user = await db.query.users.findFirst({ where: eq(schema.users.id, payload.id) });
    if (user?.role !== "admin") return c.json({ error: "Unauthorized" }, 403);

    const id = c.req.param("id");
    const body = await c.req.json();
    const pk = (table as any).id || (table as any).slug || (table as any).rank;
    const [updated] = await db.update(table).set(body).where(eq(pk, id)).returning();
    return c.json(updated);
  });
};

createCrud("episodes", schema.episodes);
createCrud("memes", schema.memes);
createCrud("news", schema.news);
createCrud("products", schema.products);
createCrud("users", schema.users);
createCrud("characters", schema.characters);
createCrud("events", schema.events);
createCrud("faqs", schema.faqs);
createCrud("gallery", schema.galleryItems);
createCrud("reports", schema.reports);
createCrud("categories", schema.categories);

// Special case for news delete (using slug)
app.delete("/admin/news/:slug", authMiddleware, async (c) => {
  const payload = c.get("jwtPayload");
  const user = await db.query.users.findFirst({ where: eq(schema.users.id, payload.id) });
  if (user?.role !== "admin") return c.json({ error: "Unauthorized" }, 403);

  const slug = c.req.param("slug");
  await db.delete(schema.news).where(eq(schema.news.slug, slug));
  return c.json({ success: true });
});

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

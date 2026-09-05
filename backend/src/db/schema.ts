import { pgTable, text, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  desc: text("desc").notNull(),
  img: text("img").notNull(),
});

export const episodes = pgTable("episodes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  duration: text("duration").notNull(),
  views: text("views").notNull(),
  season: integer("season").notNull(),
  thumb: text("thumb").notNull(),
  desc: text("desc").notNull(),
  category: text("category"),
});

export const memes = pgTable("memes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  likes: integer("likes").default(0),
  img: text("img").notNull(),
  tag: text("tag").notNull(),
});

export const news = pgTable("news", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  excerpt: text("excerpt").notNull(),
  cover: text("cover").notNull(),
  body: text("body").notNull(),
  category: text("category"),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  img: text("img"),
  rating: text("rating").default("4.5"),
  stock: integer("stock").default(0),
  affiliateUrl: text("affiliate_url"),
  category: text("category"),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  avatar: text("avatar"),
  points: integer("points").default(0),
  role: text("role").default("fan"), // fan, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  author: text("author").notNull(),
  avatar: text("avatar").notNull(),
  time: text("time").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  cover: text("cover"),
});

export const leaderboard = pgTable("leaderboard", {
  rank: integer("rank").primaryKey(),
  name: text("name").notNull(),
  points: integer("points").notNull(),
  badge: text("badge").notNull(),
  avatar: text("avatar").notNull(),
});

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  cover: text("cover").notNull(),
  description: text("description"),
});

export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: text("id").primaryKey(),
  img: text("img").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
});

export const collectionItems = pgTable("collection_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  rarity: text("rarity").notNull(),
  img: text("img").notNull(),
  owned: boolean("owned").default(false),
});
export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  reporter: text("reporter").notNull(),
  target: text("target").notNull(),
  reason: text("reason").notNull(),
  status: text("status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // product, gallery, news, etc.
  icon: text("icon"),
});

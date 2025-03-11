import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping the existing one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Seed categories table
export const seedCategories = pgTable("seed_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  varietyCount: integer("variety_count").default(0),
});

export const insertSeedCategorySchema = createInsertSchema(seedCategories).pick({
  name: true,
  description: true,
  imageUrl: true,
  varietyCount: true,
});

// Seeds table
export const seeds = pgTable("seeds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scientificName: text("scientific_name"),
  categoryId: integer("category_id").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  growingSeason: text("growing_season"),
  daysToMaturity: integer("days_to_maturity"),
  marketDemand: text("market_demand").default("medium"),
  priceRange: text("price_range"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSeedSchema = createInsertSchema(seeds).pick({
  name: true,
  scientificName: true,
  categoryId: true,
  description: true,
  imageUrl: true,
  growingSeason: true,
  daysToMaturity: true,
  marketDemand: true,
  priceRange: true,
});

// Growth stages table
export const growthStages = pgTable("growth_stages", {
  id: serial("id").primaryKey(),
  seedId: integer("seed_id").notNull(),
  stageName: text("stage_name").notNull(),
  dayStart: integer("day_start").notNull(),
  dayEnd: integer("day_end").notNull(),
  description: text("description").notNull(),
  appearance: text("appearance"),
  careInstructions: text("care_instructions"),
  commonIssues: text("common_issues"),
  tips: text("tips"),
});

export const insertGrowthStageSchema = createInsertSchema(growthStages).pick({
  seedId: true,
  stageName: true,
  dayStart: true,
  dayEnd: true,
  description: true,
  appearance: true,
  careInstructions: true,
  commonIssues: true,
  tips: true,
});

// Nutritional requirements table
export const nutritionalRequirements = pgTable("nutritional_requirements", {
  id: serial("id").primaryKey(),
  seedId: integer("seed_id").notNull(),
  nitrogen: integer("nitrogen").default(50),
  phosphorus: integer("phosphorus").default(50),
  potassium: integer("potassium").default(50),
  calcium: integer("calcium").default(50),
  magnesium: integer("magnesium").default(50),
  sulfur: integer("sulfur").default(50),
  fertilizerRecommendations: text("fertilizer_recommendations"),
});

export const insertNutritionalRequirementSchema = createInsertSchema(nutritionalRequirements).pick({
  seedId: true,
  nitrogen: true,
  phosphorus: true,
  potassium: true,
  calcium: true,
  magnesium: true,
  sulfur: true,
  fertilizerRecommendations: true,
});

// Market trends table
export const marketTrends = pgTable("market_trends", {
  id: serial("id").primaryKey(),
  seedId: integer("seed_id").notNull(),
  demand: text("demand").notNull(),
  priceRange: text("price_range"),
  percentChange: integer("percent_change"),
  notes: text("notes"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMarketTrendSchema = createInsertSchema(marketTrends).pick({
  seedId: true,
  demand: true,
  priceRange: true,
  percentChange: true,
  notes: true,
});

// Educational resources table
export const educationalResources = pgTable("educational_resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  resourceType: text("resource_type").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEducationalResourceSchema = createInsertSchema(educationalResources).pick({
  title: true,
  description: true,
  category: true,
  resourceType: true,
  url: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSeedCategory = z.infer<typeof insertSeedCategorySchema>;
export type SeedCategory = typeof seedCategories.$inferSelect;

export type InsertSeed = z.infer<typeof insertSeedSchema>;
export type Seed = typeof seeds.$inferSelect;

export type InsertGrowthStage = z.infer<typeof insertGrowthStageSchema>;
export type GrowthStage = typeof growthStages.$inferSelect;

export type InsertNutritionalRequirement = z.infer<typeof insertNutritionalRequirementSchema>;
export type NutritionalRequirement = typeof nutritionalRequirements.$inferSelect;

export type InsertMarketTrend = z.infer<typeof insertMarketTrendSchema>;
export type MarketTrend = typeof marketTrends.$inferSelect;

export type InsertEducationalResource = z.infer<typeof insertEducationalResourceSchema>;
export type EducationalResource = typeof educationalResources.$inferSelect;

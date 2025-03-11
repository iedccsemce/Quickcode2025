import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertSeedCategorySchema, 
  insertSeedSchema, 
  insertGrowthStageSchema,
  insertNutritionalRequirementSchema,
  insertMarketTrendSchema,
  insertEducationalResourceSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed Categories endpoints
  app.get("/api/seed-categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getAllSeedCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching seed categories" });
    }
  });

  app.get("/api/seed-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const category = await storage.getSeedCategory(id);
      if (!category) {
        return res.status(404).json({ message: "Seed category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching seed category" });
    }
  });

  app.post("/api/seed-categories", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSeedCategorySchema.parse(req.body);
      const newCategory = await storage.createSeedCategory(validatedData);
      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating seed category" });
    }
  });

  // Seeds endpoints
  app.get("/api/seeds", async (_req: Request, res: Response) => {
    try {
      const seeds = await storage.getAllSeeds();
      res.json(seeds);
    } catch (error) {
      res.status(500).json({ message: "Error fetching seeds" });
    }
  });

  app.get("/api/seeds/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const seeds = await storage.searchSeeds(query);
      res.json(seeds);
    } catch (error) {
      res.status(500).json({ message: "Error searching seeds" });
    }
  });

  app.get("/api/seeds/category/:categoryId", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID format" });
      }
      
      const seeds = await storage.getSeedsByCategoryId(categoryId);
      res.json(seeds);
    } catch (error) {
      res.status(500).json({ message: "Error fetching seeds by category" });
    }
  });

  app.get("/api/seeds/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const seed = await storage.getSeed(id);
      if (!seed) {
        return res.status(404).json({ message: "Seed not found" });
      }
      
      res.json(seed);
    } catch (error) {
      res.status(500).json({ message: "Error fetching seed" });
    }
  });

  app.post("/api/seeds", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSeedSchema.parse(req.body);
      const newSeed = await storage.createSeed(validatedData);
      res.status(201).json(newSeed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating seed" });
    }
  });

  // Growth stages endpoints
  app.get("/api/growth-stages/seed/:seedId", async (req: Request, res: Response) => {
    try {
      const seedId = parseInt(req.params.seedId);
      if (isNaN(seedId)) {
        return res.status(400).json({ message: "Invalid seed ID format" });
      }
      
      const stages = await storage.getGrowthStagesBySeedId(seedId);
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching growth stages" });
    }
  });

  app.post("/api/growth-stages", async (req: Request, res: Response) => {
    try {
      const validatedData = insertGrowthStageSchema.parse(req.body);
      const newStage = await storage.createGrowthStage(validatedData);
      res.status(201).json(newStage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating growth stage" });
    }
  });

  // Nutritional requirements endpoints
  app.get("/api/nutritional-requirements/seed/:seedId", async (req: Request, res: Response) => {
    try {
      const seedId = parseInt(req.params.seedId);
      if (isNaN(seedId)) {
        return res.status(400).json({ message: "Invalid seed ID format" });
      }
      
      const requirements = await storage.getNutritionalRequirementBySeedId(seedId);
      if (!requirements) {
        return res.status(404).json({ message: "Nutritional requirements not found for this seed" });
      }
      
      res.json(requirements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching nutritional requirements" });
    }
  });

  app.post("/api/nutritional-requirements", async (req: Request, res: Response) => {
    try {
      const validatedData = insertNutritionalRequirementSchema.parse(req.body);
      const newRequirement = await storage.createNutritionalRequirement(validatedData);
      res.status(201).json(newRequirement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating nutritional requirement" });
    }
  });

  // Market trends endpoints
  app.get("/api/market-trends", async (_req: Request, res: Response) => {
    try {
      const trends = await storage.getAllMarketTrends();
      res.json(trends);
    } catch (error) {
      res.status(500).json({ message: "Error fetching market trends" });
    }
  });

  app.get("/api/market-trends/seed/:seedId", async (req: Request, res: Response) => {
    try {
      const seedId = parseInt(req.params.seedId);
      if (isNaN(seedId)) {
        return res.status(400).json({ message: "Invalid seed ID format" });
      }
      
      const trend = await storage.getMarketTrendBySeedId(seedId);
      if (!trend) {
        return res.status(404).json({ message: "Market trend not found for this seed" });
      }
      
      res.json(trend);
    } catch (error) {
      res.status(500).json({ message: "Error fetching market trend" });
    }
  });

  app.post("/api/market-trends", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMarketTrendSchema.parse(req.body);
      const newTrend = await storage.createMarketTrend(validatedData);
      res.status(201).json(newTrend);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating market trend" });
    }
  });

  // Educational resources endpoints
  app.get("/api/educational-resources", async (_req: Request, res: Response) => {
    try {
      const resources = await storage.getAllEducationalResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching educational resources" });
    }
  });

  app.get("/api/educational-resources/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const resources = await storage.getEducationalResourcesByCategory(category);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching educational resources by category" });
    }
  });

  app.get("/api/educational-resources/type/:type", async (req: Request, res: Response) => {
    try {
      const type = req.params.type;
      const resources = await storage.getEducationalResourcesByType(type);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching educational resources by type" });
    }
  });

  app.get("/api/educational-resources/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const resource = await storage.getEducationalResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Educational resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Error fetching educational resource" });
    }
  });

  app.post("/api/educational-resources", async (req: Request, res: Response) => {
    try {
      const validatedData = insertEducationalResourceSchema.parse(req.body);
      const newResource = await storage.createEducationalResource(validatedData);
      res.status(201).json(newResource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating educational resource" });
    }
  });

  // Set up HTTP server
  const httpServer = createServer(app);
  return httpServer;
}

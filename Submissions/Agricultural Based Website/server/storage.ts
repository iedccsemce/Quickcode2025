import {
  User,
  InsertUser,
  SeedCategory,
  InsertSeedCategory,
  Seed,
  InsertSeed,
  GrowthStage,
  InsertGrowthStage,
  NutritionalRequirement,
  InsertNutritionalRequirement,
  MarketTrend,
  InsertMarketTrend,
  EducationalResource,
  InsertEducationalResource
} from "@shared/schema";

import {
  initialSeedCategories,
  initialSeeds,
  initialGrowthStages,
  initialNutritionalRequirements,
  initialMarketTrends,
  initialEducationalResources
} from "@shared/data";

export interface IStorage {
  // User methods (keeping existing ones)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Seed categories
  getAllSeedCategories(): Promise<SeedCategory[]>;
  getSeedCategory(id: number): Promise<SeedCategory | undefined>;
  createSeedCategory(category: InsertSeedCategory): Promise<SeedCategory>;
  
  // Seeds
  getAllSeeds(): Promise<Seed[]>;
  getSeed(id: number): Promise<Seed | undefined>;
  getSeedsByCategoryId(categoryId: number): Promise<Seed[]>;
  searchSeeds(query: string): Promise<Seed[]>;
  createSeed(seed: InsertSeed): Promise<Seed>;
  
  // Growth stages
  getGrowthStagesBySeedId(seedId: number): Promise<GrowthStage[]>;
  getGrowthStage(id: number): Promise<GrowthStage | undefined>;
  createGrowthStage(growthStage: InsertGrowthStage): Promise<GrowthStage>;
  
  // Nutritional requirements
  getNutritionalRequirementBySeedId(seedId: number): Promise<NutritionalRequirement | undefined>;
  createNutritionalRequirement(requirement: InsertNutritionalRequirement): Promise<NutritionalRequirement>;
  
  // Market trends
  getAllMarketTrends(): Promise<MarketTrend[]>;
  getMarketTrendBySeedId(seedId: number): Promise<MarketTrend | undefined>;
  createMarketTrend(trend: InsertMarketTrend): Promise<MarketTrend>;
  
  // Educational resources
  getAllEducationalResources(): Promise<EducationalResource[]>;
  getEducationalResourcesByCategory(category: string): Promise<EducationalResource[]>;
  getEducationalResourcesByType(resourceType: string): Promise<EducationalResource[]>;
  getEducationalResource(id: number): Promise<EducationalResource | undefined>;
  createEducationalResource(resource: InsertEducationalResource): Promise<EducationalResource>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private seedCategories: Map<number, SeedCategory>;
  private seeds: Map<number, Seed>;
  private growthStages: Map<number, GrowthStage>;
  private nutritionalRequirements: Map<number, NutritionalRequirement>;
  private marketTrends: Map<number, MarketTrend>;
  private educationalResources: Map<number, EducationalResource>;
  
  currentUserId: number;
  currentSeedCategoryId: number;
  currentSeedId: number;
  currentGrowthStageId: number;
  currentNutritionalRequirementId: number;
  currentMarketTrendId: number;
  currentEducationalResourceId: number;

  constructor() {
    this.users = new Map();
    this.seedCategories = new Map();
    this.seeds = new Map();
    this.growthStages = new Map();
    this.nutritionalRequirements = new Map();
    this.marketTrends = new Map();
    this.educationalResources = new Map();
    
    this.currentUserId = 1;
    this.currentSeedCategoryId = 1;
    this.currentSeedId = 1;
    this.currentGrowthStageId = 1;
    this.currentNutritionalRequirementId = 1;
    this.currentMarketTrendId = 1;
    this.currentEducationalResourceId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Seed categories
    initialSeedCategories.forEach(category => {
      this.seedCategories.set(category.id, category);
      if (category.id >= this.currentSeedCategoryId) {
        this.currentSeedCategoryId = category.id + 1;
      }
    });
    
    // Seeds
    initialSeeds.forEach(seed => {
      this.seeds.set(seed.id, seed);
      if (seed.id >= this.currentSeedId) {
        this.currentSeedId = seed.id + 1;
      }
    });
    
    // Growth stages
    initialGrowthStages.forEach(stage => {
      this.growthStages.set(stage.id, stage);
      if (stage.id >= this.currentGrowthStageId) {
        this.currentGrowthStageId = stage.id + 1;
      }
    });
    
    // Nutritional requirements
    initialNutritionalRequirements.forEach(requirement => {
      this.nutritionalRequirements.set(requirement.id, requirement);
      if (requirement.id >= this.currentNutritionalRequirementId) {
        this.currentNutritionalRequirementId = requirement.id + 1;
      }
    });
    
    // Market trends
    initialMarketTrends.forEach(trend => {
      this.marketTrends.set(trend.id, trend);
      if (trend.id >= this.currentMarketTrendId) {
        this.currentMarketTrendId = trend.id + 1;
      }
    });
    
    // Educational resources
    initialEducationalResources.forEach(resource => {
      this.educationalResources.set(resource.id, resource);
      if (resource.id >= this.currentEducationalResourceId) {
        this.currentEducationalResourceId = resource.id + 1;
      }
    });
  }

  // User methods (keeping existing ones)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Seed category methods
  async getAllSeedCategories(): Promise<SeedCategory[]> {
    return Array.from(this.seedCategories.values());
  }
  
  async getSeedCategory(id: number): Promise<SeedCategory | undefined> {
    return this.seedCategories.get(id);
  }
  
  async createSeedCategory(category: InsertSeedCategory): Promise<SeedCategory> {
    const id = this.currentSeedCategoryId++;
    const newCategory: SeedCategory = { ...category, id };
    this.seedCategories.set(id, newCategory);
    return newCategory;
  }
  
  // Seed methods
  async getAllSeeds(): Promise<Seed[]> {
    return Array.from(this.seeds.values());
  }
  
  async getSeed(id: number): Promise<Seed | undefined> {
    return this.seeds.get(id);
  }
  
  async getSeedsByCategoryId(categoryId: number): Promise<Seed[]> {
    return Array.from(this.seeds.values()).filter(
      seed => seed.categoryId === categoryId
    );
  }
  
  async searchSeeds(query: string): Promise<Seed[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.seeds.values()).filter(
      seed => 
        seed.name.toLowerCase().includes(lowerQuery) || 
        (seed.scientificName && seed.scientificName.toLowerCase().includes(lowerQuery)) ||
        seed.description.toLowerCase().includes(lowerQuery)
    );
  }
  
  async createSeed(seed: InsertSeed): Promise<Seed> {
    const id = this.currentSeedId++;
    const newSeed: Seed = { 
      ...seed, 
      id, 
      createdAt: new Date() 
    };
    this.seeds.set(id, newSeed);
    return newSeed;
  }
  
  // Growth stage methods
  async getGrowthStagesBySeedId(seedId: number): Promise<GrowthStage[]> {
    return Array.from(this.growthStages.values())
      .filter(stage => stage.seedId === seedId)
      .sort((a, b) => a.dayStart - b.dayStart);
  }
  
  async getGrowthStage(id: number): Promise<GrowthStage | undefined> {
    return this.growthStages.get(id);
  }
  
  async createGrowthStage(growthStage: InsertGrowthStage): Promise<GrowthStage> {
    const id = this.currentGrowthStageId++;
    const newStage: GrowthStage = { ...growthStage, id };
    this.growthStages.set(id, newStage);
    return newStage;
  }
  
  // Nutritional requirement methods
  async getNutritionalRequirementBySeedId(seedId: number): Promise<NutritionalRequirement | undefined> {
    return Array.from(this.nutritionalRequirements.values()).find(
      req => req.seedId === seedId
    );
  }
  
  async createNutritionalRequirement(requirement: InsertNutritionalRequirement): Promise<NutritionalRequirement> {
    const id = this.currentNutritionalRequirementId++;
    const newRequirement: NutritionalRequirement = { ...requirement, id };
    this.nutritionalRequirements.set(id, newRequirement);
    return newRequirement;
  }
  
  // Market trend methods
  async getAllMarketTrends(): Promise<MarketTrend[]> {
    return Array.from(this.marketTrends.values());
  }
  
  async getMarketTrendBySeedId(seedId: number): Promise<MarketTrend | undefined> {
    return Array.from(this.marketTrends.values()).find(
      trend => trend.seedId === seedId
    );
  }
  
  async createMarketTrend(trend: InsertMarketTrend): Promise<MarketTrend> {
    const id = this.currentMarketTrendId++;
    const newTrend: MarketTrend = { 
      ...trend, 
      id, 
      updatedAt: new Date() 
    };
    this.marketTrends.set(id, newTrend);
    return newTrend;
  }
  
  // Educational resource methods
  async getAllEducationalResources(): Promise<EducationalResource[]> {
    return Array.from(this.educationalResources.values());
  }
  
  async getEducationalResourcesByCategory(category: string): Promise<EducationalResource[]> {
    return Array.from(this.educationalResources.values()).filter(
      resource => resource.category === category
    );
  }
  
  async getEducationalResourcesByType(resourceType: string): Promise<EducationalResource[]> {
    return Array.from(this.educationalResources.values()).filter(
      resource => resource.resourceType === resourceType
    );
  }
  
  async getEducationalResource(id: number): Promise<EducationalResource | undefined> {
    return this.educationalResources.get(id);
  }
  
  async createEducationalResource(resource: InsertEducationalResource): Promise<EducationalResource> {
    const id = this.currentEducationalResourceId++;
    const newResource: EducationalResource = { 
      ...resource, 
      id, 
      createdAt: new Date() 
    };
    this.educationalResources.set(id, newResource);
    return newResource;
  }
}

export const storage = new MemStorage();

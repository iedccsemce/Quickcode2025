import {
  SeedCategory,
  Seed,
  GrowthStage,
  NutritionalRequirement,
  MarketTrend,
  EducationalResource,
} from "./schema";

// Initial seed categories
export const initialSeedCategories: SeedCategory[] = [
  {
    id: 1,
    name: "Vegetable Seeds",
    description: "Seeds for growing various vegetables in your garden",
    imageUrl: "https://images.unsplash.com/photo-1620554918388-0ac9a44468e6?q=80&w=500&auto=format&fit=crop",
    varietyCount: 120,
  },
  {
    id: 2,
    name: "Fruit Seeds",
    description: "Seeds for growing fruit-bearing plants",
    imageUrl: "https://images.unsplash.com/photo-1599076480207-ba86a9c58a0d?q=80&w=500&auto=format&fit=crop",
    varietyCount: 85,
  },
  {
    id: 3,
    name: "Grain Seeds",
    description: "Seeds for growing various grains and cereals",
    imageUrl: "https://images.unsplash.com/photo-1620127682229-33388276e540?q=80&w=500&auto=format&fit=crop",
    varietyCount: 50,
  },
  {
    id: 4,
    name: "Herb Seeds",
    description: "Seeds for growing culinary and medicinal herbs",
    imageUrl: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=500&auto=format&fit=crop",
    varietyCount: 75,
  },
];

// Initial seeds
export const initialSeeds: Seed[] = [
  {
    id: 1,
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    categoryId: 1, // Vegetable
    description: "Tomatoes are the most popular garden vegetable to grow. They're easy to grow, prolific producers, and come in countless varieties with different colors, sizes, and flavors. They thrive in warm, sunny conditions.",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop",
    growingSeason: "Spring to Summer",
    daysToMaturity: 80,
    marketDemand: "high",
    priceRange: "$2.50-3.75/lb",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Bell Peppers",
    scientificName: "Capsicum annuum",
    categoryId: 1, // Vegetable
    description: "Bell peppers are versatile vegetables available in various colors including green, red, yellow, and orange. They have a mild, sweet flavor and are rich in vitamins and antioxidants.",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=600&auto=format&fit=crop",
    growingSeason: "Spring to Summer",
    daysToMaturity: 70,
    marketDemand: "high",
    priceRange: "$1.75-2.50/lb",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Spinach",
    scientificName: "Spinacia oleracea",
    categoryId: 1, // Vegetable
    description: "Spinach is a leafy green vegetable that grows quickly and is packed with nutrients. It's versatile in the kitchen and can be eaten raw or cooked.",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop",
    growingSeason: "Fall to Spring",
    daysToMaturity: 45,
    marketDemand: "medium",
    priceRange: "$3.00-4.50/lb",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Basil",
    scientificName: "Ocimum basilicum",
    categoryId: 4, // Herb
    description: "Basil is a fragrant herb commonly used in cooking, particularly in Italian dishes. It's easy to grow and has a variety of health benefits.",
    imageUrl: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?q=80&w=600&auto=format&fit=crop",
    growingSeason: "Spring to Summer",
    daysToMaturity: 30,
    marketDemand: "high",
    priceRange: "$15.00-25.00/lb",
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Strawberry",
    scientificName: "Fragaria × ananassa",
    categoryId: 2, // Fruit
    description: "Strawberries are sweet, red heart-shaped fruits that are popular in gardens around the world. They're relatively easy to grow and can be planted in containers or directly in the ground.",
    imageUrl: "https://images.unsplash.com/photo-1596591868231-05e848fd5b9d?q=80&w=600&auto=format&fit=crop",
    growingSeason: "Spring to Summer",
    daysToMaturity: 90,
    marketDemand: "low",
    priceRange: "$3.25-4.75/lb",
    createdAt: new Date(),
  },
];

// Initial growth stages
export const initialGrowthStages: GrowthStage[] = [
  // Tomato growth stages
  {
    id: 1,
    seedId: 1, // Tomato
    stageName: "Seed",
    dayStart: 0,
    dayEnd: 7,
    description: "The dormant seed stage before germination begins",
    appearance: "Small, flat seeds that are covered in silica-like hairs",
    careInstructions: "Plant seeds 1/4 inch deep in seed-starting mix, Keep soil moist but not waterlogged, Maintain temperature between 70-80°F",
    commonIssues: "Rotting (overwatering), Failure to germinate (old seeds)",
    tips: "Pre-soak seeds for 24 hours before planting to improve germination rate",
  },
  {
    id: 2,
    seedId: 1, // Tomato
    stageName: "Germination",
    dayStart: 8,
    dayEnd: 20,
    description: "The stage where the seed sprouts and emerges from the soil",
    appearance: "Small cotyledons (seed leaves) emerge, pale green stem appears",
    careInstructions: "Provide 14-16 hours of light daily, Water gently to keep soil moist, Maintain temperature between 65-75°F",
    commonIssues: "Damping off disease, Leggy seedlings (insufficient light)",
    tips: "Use a fan to create gentle air circulation, which strengthens stems and prevents disease",
  },
  {
    id: 3,
    seedId: 1, // Tomato
    stageName: "Seedling",
    dayStart: 21,
    dayEnd: 35,
    description: "Early growth stage with first true leaves developing",
    appearance: "First true leaves emerge, plant height reaches 3-5 inches. Stems thicken and develop more leaves.",
    careInstructions: "Water moderately, soil should be moist not soggy, Fertilize with balanced NPK (10-10-10), Provide 6-8 hours of direct sunlight, Maintain temperature between 65-75°F",
    commonIssues: "Legginess (insufficient light), Yellowing leaves (overwatering), Stunted growth (nutrient deficiency)",
    tips: "Begin hardening off seedlings if planning to transplant outdoors. Introduce to outdoor conditions gradually over 7-10 days. Consider adding support stakes for varieties that will grow tall.",
  },
  {
    id: 4,
    seedId: 1, // Tomato
    stageName: "Vegetative",
    dayStart: 36,
    dayEnd: 45,
    description: "Rapid growth stage where the plant develops its structure",
    appearance: "Plant grows taller and bushier, stems thicken, multiple branches form",
    careInstructions: "Water deeply 1-2 times per week, Fertilize with nitrogen-rich fertilizer, Provide support for growing vines, Maintain spacing between plants for air circulation",
    commonIssues: "Early blight, Aphids, Spider mites",
    tips: "Prune suckers (shoots that grow between the main stem and branches) to concentrate energy on fruit production",
  },
  {
    id: 5,
    seedId: 1, // Tomato
    stageName: "Flowering",
    dayStart: 46,
    dayEnd: 60,
    description: "Stage where yellow flowers appear, which will later develop into fruits",
    appearance: "Small yellow flowers appear in clusters, plant reaches mature height",
    careInstructions: "Switch to phosphorus-rich fertilizer (5-10-10), Provide consistent watering, Avoid overhead watering (can disrupt pollination), Maintain consistent temperature between 65-80°F",
    commonIssues: "Blossom drop (stress or extreme temperatures), Poor pollination",
    tips: "Gently shake plants to promote pollination. For outdoor plants, bees and wind will usually do the job.",
  },
  {
    id: 6,
    seedId: 1, // Tomato
    stageName: "Fruiting",
    dayStart: 61,
    dayEnd: 80,
    description: "Final stage where flowers develop into fruits that ripen",
    appearance: "Green fruits appear and gradually ripen to red (or variety color)",
    careInstructions: "Provide consistent water supply, Apply calcium-rich fertilizer to prevent blossom end rot, Support heavy fruit clusters with stakes or cages",
    commonIssues: "Blossom end rot, Cracking, Sunscald, Pests (hornworms, fruit worms)",
    tips: "Harvest when fruits are firm and fully colored. Green tomatoes can be ripened indoors at the end of the season.",
  },
];

// Initial nutritional requirements
export const initialNutritionalRequirements: NutritionalRequirement[] = [
  {
    id: 1,
    seedId: 1, // Tomato
    nitrogen: 75,
    phosphorus: 60,
    potassium: 90,
    calcium: 70,
    magnesium: 50,
    sulfur: 40,
    fertilizerRecommendations: "Start with balanced fertilizer (10-10-10) during early growth stages. Switch to phosphorus and potassium rich fertilizer (5-10-10) once flowering begins to encourage fruit development. Apply calcium supplements to prevent blossom end rot.",
  },
  {
    id: 2,
    seedId: 2, // Bell Peppers
    nitrogen: 65,
    phosphorus: 70,
    potassium: 85,
    calcium: 60,
    magnesium: 55,
    sulfur: 45,
    fertilizerRecommendations: "Use balanced fertilizer (10-10-10) at planting time. Apply phosphorus-rich fertilizer when flowering begins. Add magnesium (Epsom salts) if leaves yellow between veins.",
  },
  {
    id: 3,
    seedId: 3, // Spinach
    nitrogen: 85,
    phosphorus: 50,
    potassium: 65,
    calcium: 60,
    magnesium: 60,
    sulfur: 35,
    fertilizerRecommendations: "Spinach is a heavy nitrogen feeder. Apply nitrogen-rich fertilizer (20-5-5) for leafy growth. Split applications - one at planting and one when plants are 2 inches tall.",
  },
  {
    id: 4,
    seedId: 4, // Basil
    nitrogen: 70,
    phosphorus: 40,
    potassium: 50,
    calcium: 45,
    magnesium: 50,
    sulfur: 30,
    fertilizerRecommendations: "Use diluted balanced fertilizer (10-10-10) every 4-6 weeks. For container plants, consider liquid fish emulsion for natural nitrogen. Avoid over-fertilizing which can reduce flavor intensity.",
  },
  {
    id: 5,
    seedId: 5, // Strawberry
    nitrogen: 60,
    phosphorus: 80,
    potassium: 75,
    calcium: 65,
    magnesium: 40,
    sulfur: 35,
    fertilizerRecommendations: "Apply balanced fertilizer at planting. Switch to high phosphorus formula (5-10-5) when flowering begins. Avoid excessive nitrogen which promotes leaf growth at the expense of fruit production.",
  },
];

// Initial market trends
export const initialMarketTrends: MarketTrend[] = [
  {
    id: 1,
    seedId: 1, // Tomato
    demand: "high",
    priceRange: "$2.50-3.75/lb",
    percentChange: 12,
    notes: "Heirloom varieties especially in demand",
    updatedAt: new Date(),
  },
  {
    id: 2,
    seedId: 2, // Bell Peppers
    demand: "high",
    priceRange: "$1.75-2.50/lb",
    percentChange: 8,
    notes: "Colored varieties commanding premium prices",
    updatedAt: new Date(),
  },
  {
    id: 3,
    seedId: 3, // Spinach
    demand: "medium",
    priceRange: "$3.00-4.50/lb",
    percentChange: 0,
    notes: "Stable demand throughout the year",
    updatedAt: new Date(),
  },
  {
    id: 4,
    seedId: 4, // Basil
    demand: "high",
    priceRange: "$15.00-25.00/lb",
    percentChange: 5,
    notes: "Fresh culinary herbs consistently in demand",
    updatedAt: new Date(),
  },
  {
    id: 5,
    seedId: 5, // Strawberry
    demand: "low",
    priceRange: "$3.25-4.75/lb",
    percentChange: -3,
    notes: "Organic strawberries premium priced",
    updatedAt: new Date(),
  },
];

// Initial educational resources
export const initialEducationalResources: EducationalResource[] = [
  // Beginner guides
  {
    id: 1,
    title: "Understanding Soil Basics",
    description: "Learn about soil types, pH levels, and how to prepare your soil for planting",
    category: "beginner",
    resourceType: "article",
    url: "/learning/soil-basics",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Essential Gardening Tools",
    description: "A guide to must-have tools for beginning gardeners",
    category: "beginner",
    resourceType: "article",
    url: "/learning/gardening-tools",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Seed Starting 101",
    description: "Step-by-step instructions for starting seeds indoors",
    category: "beginner",
    resourceType: "article",
    url: "/learning/seed-starting",
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "Season Planning Guide",
    description: "How to plan your garden for each growing season",
    category: "beginner",
    resourceType: "article",
    url: "/learning/season-planning",
    createdAt: new Date(),
  },
  
  // Advanced techniques
  {
    id: 5,
    title: "Companion Planting Strategies",
    description: "Learn which plants grow well together and why",
    category: "advanced",
    resourceType: "article",
    url: "/learning/companion-planting",
    createdAt: new Date(),
  },
  {
    id: 6,
    title: "Organic Pest Management",
    description: "Natural methods to manage pests in your garden",
    category: "advanced",
    resourceType: "article",
    url: "/learning/organic-pest-management",
    createdAt: new Date(),
  },
  {
    id: 7,
    title: "Advanced Propagation Methods",
    description: "Techniques for propagating plants beyond basic seed starting",
    category: "advanced",
    resourceType: "article",
    url: "/learning/advanced-propagation",
    createdAt: new Date(),
  },
  {
    id: 8,
    title: "Sustainable Irrigation Systems",
    description: "Water-saving irrigation methods for environmentally conscious gardeners",
    category: "advanced",
    resourceType: "article",
    url: "/learning/sustainable-irrigation",
    createdAt: new Date(),
  },
  
  // Video tutorials
  {
    id: 9,
    title: "Proper Seed Starting Techniques",
    description: "Visual demonstration of seed starting best practices",
    category: "video",
    resourceType: "video",
    url: "/videos/seed-starting",
    createdAt: new Date(),
  },
  {
    id: 10,
    title: "How to Transplant Seedlings",
    description: "Step-by-step guide to safely transplanting seedlings",
    category: "video",
    resourceType: "video",
    url: "/videos/transplanting",
    createdAt: new Date(),
  },
  {
    id: 11,
    title: "Pruning for Maximum Yield",
    description: "Learn proper pruning techniques to increase your harvest",
    category: "video",
    resourceType: "video",
    url: "/videos/pruning",
    createdAt: new Date(),
  },
  {
    id: 12,
    title: "Identifying Common Plant Diseases",
    description: "Visual guide to recognizing and treating plant diseases",
    category: "video",
    resourceType: "video",
    url: "/videos/plant-diseases",
    createdAt: new Date(),
  },
];

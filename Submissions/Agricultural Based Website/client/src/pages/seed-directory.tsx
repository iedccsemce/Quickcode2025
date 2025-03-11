import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Seed, SeedCategory } from "@shared/schema";
import MarketDemandBadge from "@/components/ui/market-demand-badge";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SeedDirectory = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredSeeds, setFilteredSeeds] = useState<Seed[]>([]);
  
  // Parse URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const categoryParam = queryParams.get("category");
  const searchParam = queryParams.get("search");
  
  // Fetch all seed categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery<SeedCategory[]>({
    queryKey: ['/api/seed-categories'],
  });
  
  // Fetch all seeds
  const { data: seeds, isLoading: isLoadingSeeds } = useQuery<Seed[]>({
    queryKey: ['/api/seeds'],
  });
  
  // Handle search query if provided in URL
  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParam]);
  
  // Handle category filter if provided in URL
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Filter seeds based on search query and active category
  useEffect(() => {
    if (!seeds) return;
    
    let filtered = [...seeds];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        seed => 
          seed.name.toLowerCase().includes(query) || 
          (seed.scientificName && seed.scientificName.toLowerCase().includes(query)) ||
          seed.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        seed => seed.categoryId === parseInt(activeCategory)
      );
    }
    
    setFilteredSeeds(filtered);
  }, [seeds, searchQuery, activeCategory]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/seed-directory?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setLocation(categoryId === "all" 
      ? "/seed-directory" 
      : `/seed-directory?category=${categoryId}`
    );
  };
  
  return (
    <div className="bg-[#FFFBE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2C5F2D] sm:text-4xl font-heading">
            Seed Directory
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Explore our collection of seeds, learn about their growth requirements, and find what's in demand.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or characteristics..."
                className="w-full md:w-80 pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Button 
                type="submit" 
                variant="default" 
                className="absolute right-0 top-0 h-full rounded-l-none bg-[#2C5F2D] hover:bg-[#2C5F2D]/90"
              >
                Search
              </Button>
            </div>
          </form>
          
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setLocation("/seed-directory");
              }}
              className="w-full md:w-auto"
            >
              Clear Search
            </Button>
          )}
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue={activeCategory} onValueChange={handleCategoryChange}>
            <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap whitespace-nowrap pb-2">
              <TabsTrigger value="all">All Seeds</TabsTrigger>
              {isLoadingCategories ? (
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-10 w-24" />
                  ))}
                </div>
              ) : (
                categories?.map(category => (
                  <TabsTrigger key={category.id} value={category.id.toString()}>
                    {category.name}
                  </TabsTrigger>
                ))
              )}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              {isLoadingSeeds ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              ) : filteredSeeds.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No seeds found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSeeds.map(seed => (
                    <Link key={seed.id} href={`/seed-directory/${seed.id}`}>
                      <Card className="overflow-hidden h-full cursor-pointer transition-transform hover:scale-[1.02]">
                        <div className="relative aspect-[4/3]">
                          <img 
                            src={seed.imageUrl} 
                            alt={seed.name} 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 right-2">
                            <MarketDemandBadge demand={seed.marketDemand} />
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold text-[#2C5F2D]">{seed.name}</h3>
                          {seed.scientificName && (
                            <p className="text-sm italic text-gray-500">{seed.scientificName}</p>
                          )}
                          <p className="mt-2 text-gray-600 line-clamp-2">
                            {seed.description}
                          </p>
                          <div className="mt-3 flex justify-between">
                            <span className="text-sm text-gray-500">
                              {seed.growingSeason}
                            </span>
                            <span className="text-sm text-gray-500">
                              {seed.daysToMaturity} days to maturity
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SeedDirectory;

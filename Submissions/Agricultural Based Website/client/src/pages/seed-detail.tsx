import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Seed, GrowthStage, NutritionalRequirement, MarketTrend } from "@shared/schema";
import GrowthTimeline from "@/components/ui/growth-timeline";
import NutrientBar from "@/components/ui/nutrient-bar";
import MarketDemandBadge from "@/components/ui/market-demand-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const SeedDetail = () => {
  const { id } = useParams();
  const seedId = parseInt(id);
  
  // Fetch seed details
  const { data: seed, isLoading: isLoadingSeed } = useQuery<Seed>({
    queryKey: [`/api/seeds/${seedId}`],
    enabled: !isNaN(seedId),
  });
  
  // Fetch growth stages
  const { data: growthStages, isLoading: isLoadingStages } = useQuery<GrowthStage[]>({
    queryKey: [`/api/growth-stages/seed/${seedId}`],
    enabled: !isNaN(seedId),
  });
  
  // Fetch nutritional requirements
  const { data: nutrition, isLoading: isLoadingNutrition } = useQuery<NutritionalRequirement>({
    queryKey: [`/api/nutritional-requirements/seed/${seedId}`],
    enabled: !isNaN(seedId),
  });
  
  // Fetch market trend
  const { data: marketTrend, isLoading: isLoadingMarket } = useQuery<MarketTrend>({
    queryKey: [`/api/market-trends/seed/${seedId}`],
    enabled: !isNaN(seedId),
  });
  
  if (isNaN(seedId)) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Invalid Seed ID</h1>
        <Link href="/seed-directory" className="mt-4 inline-block text-[#2C5F2D] hover:underline">
          Return to Seed Directory
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-[#FFFBE6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/seed-directory" className="inline-flex items-center text-[#2C5F2D] hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Seed Directory
        </Link>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            {isLoadingSeed ? (
              <>
                <Skeleton className="h-10 w-48 mb-2" />
                <Skeleton className="h-6 w-32 mb-6" />
                <Skeleton className="h-[300px] w-full rounded-lg mb-6" />
                <div className="flex items-center">
                  <Skeleton className="h-8 w-24 mr-4" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-6 w-full mt-6" />
                <Skeleton className="h-6 w-full mt-2" />
                <Skeleton className="h-6 w-full mt-2" />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold text-[#2C5F2D] tracking-tight sm:text-4xl font-heading">
                  {seed?.name}
                  {seed?.scientificName && (
                    <span className="block text-gray-500 text-xl font-medium mt-1">
                      {seed.scientificName}
                    </span>
                  )}
                </h2>
                
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img 
                    src={seed?.imageUrl} 
                    alt={seed?.name} 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Market Demand</h3>
                      <div className="mt-2 flex items-center">
                        <MarketDemandBadge demand={seed?.marketDemand || "medium"} />
                        <span className="ml-2 text-gray-600">{marketTrend?.priceRange || seed?.priceRange}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Growing Season</h3>
                      <p className="mt-2 text-gray-600">{seed?.growingSeason}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Description</h3>
                    <p className="mt-2 text-gray-600">
                      {seed?.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="bg-[#FFFBE6] rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-[#2C5F2D] font-heading">Growth Timeline</h3>
              
              {isLoadingStages ? (
                <div className="mt-8">
                  <Skeleton className="h-4 w-full mb-6" />
                  <div className="mt-6 grid grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-[200px] w-full mt-8 rounded-lg" />
                </div>
              ) : growthStages && growthStages.length > 0 ? (
                <GrowthTimeline 
                  stages={growthStages} 
                  totalDays={seed?.daysToMaturity || 100} 
                />
              ) : (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
                  Growth stage information is not available for this seed.
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Nutritional Requirements</h3>
                
                {isLoadingNutrition ? (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : nutrition ? (
                  <>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <NutrientBar label="Nitrogen (N)" value={nutrition.nitrogen} />
                      <NutrientBar label="Phosphorus (P)" value={nutrition.phosphorus} />
                      <NutrientBar label="Potassium (K)" value={nutrition.potassium} />
                      <NutrientBar label="Calcium (Ca)" value={nutrition.calcium} />
                    </div>
                    
                    {nutrition.fertilizerRecommendations && (
                      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-sm font-semibold text-[#2C5F2D]">Fertilizer Recommendations</h4>
                        <p className="mt-2 text-sm text-gray-600">
                          {nutrition.fertilizerRecommendations}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
                    Nutritional requirements data is not available for this seed.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedDetail;

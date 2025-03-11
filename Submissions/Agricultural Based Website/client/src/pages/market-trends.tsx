import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Seed, MarketTrend } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MarketDemandBadge from "@/components/ui/market-demand-badge";
import NewsletterSignup from "@/components/ui/newsletter-signup";

const MarketTrends = () => {
  const [view, setView] = useState<"all" | "high" | "medium" | "low">("all");
  
  // Fetch all market trends
  const { data: marketTrends, isLoading: isLoadingTrends } = useQuery<MarketTrend[]>({
    queryKey: ['/api/market-trends'],
  });
  
  // Fetch all seeds to get names and info
  const { data: seeds, isLoading: isLoadingSeeds } = useQuery<Seed[]>({
    queryKey: ['/api/seeds'],
  });
  
  // Create a combined data structure with seed info
  const combinedData = marketTrends && seeds ? marketTrends.map((trend) => {
    const relatedSeed = seeds.find(seed => seed.id === trend.seedId);
    return {
      ...trend,
      seedName: relatedSeed?.name || "Unknown",
      scientificName: relatedSeed?.scientificName,
      imageUrl: relatedSeed?.imageUrl,
      category: relatedSeed?.categoryId,
    };
  }) : [];
  
  // Filter combined data based on selected view
  const filteredData = view === "all" 
    ? combinedData 
    : combinedData.filter(item => item.demand.toLowerCase() === view);
  
  // Format percent change for display
  const formatPercentChange = (change: number | undefined) => {
    if (change === undefined) return "No data";
    if (change === 0) return "Stable";
    return change > 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`;
  };
  
  // Determine CSS class for percent change
  const getPercentChangeClass = (change: number | undefined) => {
    if (change === undefined || change === 0) return "text-gray-500";
    return change > 0 ? "text-green-600" : "text-red-600";
  };
  
  return (
    <div className="bg-[#FFFBE6] min-h-screen">
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2C5F2D] sm:text-4xl font-heading">
            Current Market Trends
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Stay informed about which crops are in high demand and which have the best profit potential.
          </p>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="all" onValueChange={(value) => setView(value as "all" | "high" | "medium" | "low")}>
            <TabsList className="mb-6 w-full flex-wrap justify-center">
              <TabsTrigger value="all">All Trends</TabsTrigger>
              <TabsTrigger value="high">High Demand</TabsTrigger>
              <TabsTrigger value="medium">Medium Demand</TabsTrigger>
              <TabsTrigger value="low">Low Demand</TabsTrigger>
            </TabsList>
            
            <TabsContent value={view} className="mt-0">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-[#2C5F2D]">
                  <h3 className="text-lg leading-6 font-medium text-white font-heading">
                    Top Crops by Market Demand
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-white text-opacity-80">
                    Updated monthly based on market research and industry reports.
                  </p>
                </div>
                <div className="bg-white">
                  {isLoadingTrends || isLoadingSeeds ? (
                    <div className="divide-y divide-gray-200">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div className="ml-4">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48 mt-1" />
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-4 text-right">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-24 mt-1" />
                              </div>
                              <Skeleton className="h-6 w-12 rounded-full" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredData.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-gray-500">No market trends found for this category.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {filteredData.map((item) => (
                        <li key={item.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2C5F2D] bg-opacity-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2C5F2D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.seedName}</div>
                                <div className="text-sm text-gray-500">{item.notes}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-4 text-right">
                                <div className="text-sm font-medium text-gray-900">{item.priceRange}</div>
                                <div className={`text-sm ${getPercentChangeClass(item.percentChange)}`}>
                                  {formatPercentChange(item.percentChange)} from last month
                                </div>
                              </div>
                              <MarketDemandBadge demand={item.demand} />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-[#2C5F2D]">
              <h3 className="text-lg leading-6 font-medium text-white font-heading">
                Market Insights
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-white text-opacity-80">
                Key factors affecting current agricultural markets
              </p>
            </div>
            <div className="bg-white p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#2C5F2D]">Seasonal Factors</h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Spring planting season increasing demand for early season crops</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Summer heat affecting leafy green supply, driving prices up</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Fall harvest season creating surplus of root vegetables</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#2C5F2D]">Consumer Trends</h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Growing interest in heirloom and specialty varieties</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Increased demand for organic and pesticide-free produce</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Superfoods and nutrient-dense crops commanding premium prices</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-[#FFFBE6] p-4 rounded border border-[#4F772D] border-opacity-30">
                <h4 className="text-lg font-semibold text-[#2C5F2D]">Market Analysis Takeaways</h4>
                <p className="mt-2 text-gray-700">
                  High-demand crops are currently dominated by heirloom vegetables, culinary herbs, and colorful varieties that stand out at farmers' markets. 
                  Crops with extended growing seasons and storage potential also maintain stable prices throughout the year. 
                  Consider diversifying your plantings to include both high-demand specialty crops and reliable staples to balance your market potential.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2C5F2D] hover:bg-opacity-90"
          >
            Download Complete Market Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default MarketTrends;

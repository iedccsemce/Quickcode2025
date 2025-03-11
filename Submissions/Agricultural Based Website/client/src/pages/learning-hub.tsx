import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EducationalResource } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Beaker, Video } from "lucide-react";
import NewsletterSignup from "@/components/ui/newsletter-signup";

const LearningHub = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
  
  // Parse URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const categoryParam = queryParams.get("category");
  const typeParam = queryParams.get("type");
  
  // Fetch all educational resources
  const { data: resources, isLoading } = useQuery<EducationalResource[]>({
    queryKey: ['/api/educational-resources'],
  });
  
  // Set initial category from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else if (typeParam) {
      setActiveCategory(typeParam);
    }
  }, [categoryParam, typeParam]);
  
  // Filter resources based on active category
  useEffect(() => {
    if (!resources) return;
    
    let filtered = [...resources];
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        resource => 
          resource.category === activeCategory || 
          resource.resourceType === activeCategory
      );
    }
    
    setFilteredResources(filtered);
  }, [resources, activeCategory]);
  
  // Group resources by category
  const beginnerResources = filteredResources.filter(r => r.category === "beginner");
  const advancedResources = filteredResources.filter(r => r.category === "advanced");
  const videoResources = filteredResources.filter(r => r.resourceType === "video");
  
  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-[#4F772D]" />;
      case "article":
        return <BookOpen className="h-5 w-5 text-[#4F772D]" />;
      default:
        return <BookOpen className="h-5 w-5 text-[#4F772D]" />;
    }
  };
  
  return (
    <div className="bg-[#FFFBE6] min-h-screen">
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2C5F2D] sm:text-4xl font-heading">
            Learning Hub
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Expand your farming knowledge with our comprehensive collection of educational resources.
          </p>
        </div>
        
        <div className="mt-10">
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-6 w-full flex-wrap justify-center">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="beginner">Beginner Guides</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Techniques</TabsTrigger>
              <TabsTrigger value="video">Video Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="grid gap-8 md:grid-cols-3">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <div>
                  {(activeCategory === "all" || activeCategory === "beginner") && beginnerResources.length > 0 && (
                    <div className="mb-12">
                      <div className="bg-[#FFFBE6] rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#2C5F2D] flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Beginner Guides</h3>
                              <p className="text-sm text-gray-600">Perfect for those just starting their farming journey</p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <ul className="space-y-3">
                              {beginnerResources.map(resource => (
                                <li key={resource.id} className="flex">
                                  {getResourceIcon(resource.resourceType)}
                                  <a href={resource.url} className="ml-2 text-gray-700 hover:text-[#2C5F2D] hover:underline">
                                    {resource.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-6">
                            <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                              Browse All Beginner Resources
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(activeCategory === "all" || activeCategory === "advanced") && advancedResources.length > 0 && (
                    <div className="mb-12">
                      <div className="bg-[#FFFBE6] rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#2C5F2D] flex items-center justify-center">
                              <Beaker className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Advanced Techniques</h3>
                              <p className="text-sm text-gray-600">Take your farming skills to the next level</p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <ul className="space-y-3">
                              {advancedResources.map(resource => (
                                <li key={resource.id} className="flex">
                                  {getResourceIcon(resource.resourceType)}
                                  <a href={resource.url} className="ml-2 text-gray-700 hover:text-[#2C5F2D] hover:underline">
                                    {resource.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-6">
                            <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                              Explore Advanced Techniques
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(activeCategory === "all" || activeCategory === "video") && videoResources.length > 0 && (
                    <div className="mb-12">
                      <div className="bg-[#FFFBE6] rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#2C5F2D] flex items-center justify-center">
                              <Video className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Video Tutorials</h3>
                              <p className="text-sm text-gray-600">Visual learning for hands-on techniques</p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <ul className="space-y-3">
                              {videoResources.map(resource => (
                                <li key={resource.id} className="flex">
                                  <Video className="h-5 w-5 text-[#4F772D]" />
                                  <a href={resource.url} className="ml-2 text-gray-700 hover:text-[#2C5F2D] hover:underline">
                                    {resource.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-6">
                            <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                              Watch Video Tutorials
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Try selecting a different category.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#2C5F2D] mb-6 font-heading">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=600&auto=format&fit=crop" 
                  alt="Soil preparation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-[#2C5F2D] mb-2">The Importance of Soil Health</h3>
                <p className="text-gray-600 mb-4">
                  Discover why soil health is the foundation of successful farming and how to improve your soil naturally.
                </p>
                <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                  Read Article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600&auto=format&fit=crop" 
                  alt="Sustainable farming" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-[#2C5F2D] mb-2">Sustainable Farming Practices</h3>
                <p className="text-gray-600 mb-4">
                  Learn about environmentally-friendly farming techniques that can increase yields while protecting natural resources.
                </p>
                <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                  Read Article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1581385339821-5b358673a480?q=80&w=600&auto=format&fit=crop" 
                  alt="Seasonal planning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-[#2C5F2D] mb-2">Planning Your Growing Season</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to planning your planting schedule for maximum productivity throughout the year.
                </p>
                <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                  Read Article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#2C5F2D] mb-6 font-heading">Community Learning</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              Join our community of farming enthusiasts to share knowledge, ask questions, and learn from each other's experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FFFBE6] rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#2C5F2D] mb-4">Join Our Forums</h3>
              <p className="text-gray-600 mb-4">
                Connect with other gardeners and farmers in our online community forums. Share your successes, ask for help with challenges, and learn from others' experiences.
              </p>
              <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                Visit Forums
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-[#FFFBE6] rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#2C5F2D] mb-4">Upcoming Webinars</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex justify-between">
                  <span className="text-gray-700">Organic Pest Management</span>
                  <span className="text-gray-500">July 15, 2023</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Seed Saving Techniques</span>
                  <span className="text-gray-500">July 22, 2023</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Extending Your Growing Season</span>
                  <span className="text-gray-500">August 5, 2023</span>
                </li>
              </ul>
              <a href="#" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                Register Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default LearningHub;

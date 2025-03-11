import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import NewsletterSignup from "@/components/ui/newsletter-signup";
import { SeedCategory } from "@shared/schema";

const Home = () => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery<SeedCategory[]>({
    queryKey: ['/api/seed-categories'],
  });

  return (
    <div className="bg-[#FFFBE6]">
      {/* Hero Section */}
      <div className="relative bg-[#2C5F2D] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-[#2C5F2D] sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl font-heading">
                  <span className="block">Cultivate Knowledge,</span>
                  <span className="block text-[#4F772D]">Harvest Success</span>
                </h1>
                <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Learn everything you need to know about farming, seeds, plant development, and market demands - all in one place.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/seed-directory">
                      <Button 
                        size="lg" 
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#2C5F2D] bg-[#FFFBE6] hover:bg-gray-100"
                      >
                        Explore Seeds
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/learning-hub">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#4F772D] hover:bg-opacity-75"
                      >
                        Growth Guides
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 hidden lg:block w-1/2 h-full">
              <img 
                src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=800&auto=format&fit=crop" 
                alt="Hands holding soil with seedling" 
                className="h-full w-full object-cover opacity-70"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2C5F2D] sm:text-4xl font-heading">
              Explore Our Seed Directory
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
              Discover a wide variety of seeds, learn about their growth stages, and understand market demands.
            </p>
          </div>

          <div className="mt-10">
            {isLoadingCategories ? (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="h-60 animate-pulse bg-gray-200" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {categories?.map((category) => (
                  <Link key={category.id} href={`/seed-directory?category=${category.id}`}>
                    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 cursor-pointer">
                      <div className="relative h-60 w-full overflow-hidden">
                        <img 
                          src={category.imageUrl} 
                          alt={category.name} 
                          className="w-full h-full object-cover group-hover:opacity-75 transition"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C5F2D] to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-semibold text-white font-heading">{category.name}</h3>
                          <p className="text-sm text-white">{category.varietyCount}+ varieties</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Resources Preview */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2C5F2D] sm:text-4xl font-heading">
              Educational Resources
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
              Expand your farming knowledge with our comprehensive learning materials.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="bg-[#FFFBE6] rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#2C5F2D] flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Beginner Guides</h3>
                    <p className="text-sm text-gray-600">Perfect for those just starting their farming journey</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Understanding Soil Basics</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Essential Gardening Tools</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Seed Starting 101</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href="/learning-hub?category=beginner" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                    Browse All Beginner Resources
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFBE6] rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#2C5F2D] flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Advanced Techniques</h3>
                    <p className="text-sm text-gray-600">Take your farming skills to the next level</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Companion Planting Strategies</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Organic Pest Management</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Advanced Propagation Methods</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href="/learning-hub?category=advanced" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                    Explore Advanced Techniques
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFBE6] rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#2C5F2D] flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#2C5F2D] font-heading">Video Tutorials</h3>
                    <p className="text-sm text-gray-600">Visual learning for hands-on techniques</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Proper Seed Starting Techniques</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="ml-2 text-gray-700">How to Transplant Seedlings</span>
                    </li>
                    <li className="flex">
                      <svg className="h-5 w-5 text-[#4F772D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="ml-2 text-gray-700">Pruning for Maximum Yield</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href="/learning-hub?type=video" className="text-[#4F772D] hover:text-[#2C5F2D] font-medium flex items-center">
                    Watch Video Tutorials
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
};

export default Home;

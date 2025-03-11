import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/seed-directory", label: "Seed Directory" },
    { href: "/market-trends", label: "Market Trends" },
    { href: "/learning-hub", label: "Learning Hub" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/seed-directory?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-[#2C5F2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 mr-2">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M6 3a7 7 0 0 1 6 10.243c1.32-.555 2.428-1.308 3-2.243a7 7 0 1 1-3 13h-6a7 7 0 0 1 0-14v-7zm1 2v5h5a5 5 0 1 0-5-5z" fill="currentColor"/>
                </svg>
                <span className="font-heading font-bold text-xl">GrowWise</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location === item.href 
                        ? "bg-[#4F772D]" 
                        : "hover:bg-[#4F772D] hover:bg-opacity-75 transition"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search seeds, plants..."
                  className="bg-[#4F772D] bg-opacity-50 text-white placeholder:text-white placeholder:opacity-75 rounded-full py-1 pr-8"
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-0 top-0 h-full rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#4F772D] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === item.href
                    ? "bg-[#4F772D] text-white"
                    : "text-white hover:bg-[#4F772D] hover:bg-opacity-75"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[#4F772D]">
            <form onSubmit={handleSearch} className="px-2">
              <div className="relative mt-3">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search seeds, plants..."
                  className="bg-[#4F772D] bg-opacity-50 text-white placeholder:text-white placeholder:opacity-75 rounded-full py-1 w-full pr-8"
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-0 top-0 h-full rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

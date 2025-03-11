import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#97704F] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 mr-2">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M6 3a7 7 0 0 1 6 10.243c1.32-.555 2.428-1.308 3-2.243a7 7 0 1 1-3 13h-6a7 7 0 0 1 0-14v-7zm1 2v5h5a5 5 0 1 0-5-5z" fill="currentColor"/>
              </svg>
              <span className="font-heading font-bold text-xl">GrowWise</span>
            </div>
            <p className="text-white opacity-80">
              Your comprehensive resource for farming education, seed information, and market insights.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-opacity-75">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-opacity-75">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-opacity-75">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-opacity-75">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/seed-directory" className="text-base text-white opacity-80 hover:opacity-100">
                      Seed Directory
                    </Link>
                  </li>
                  <li>
                    <Link href="/learning-hub" className="text-base text-white opacity-80 hover:opacity-100">
                      Growth Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/market-trends" className="text-base text-white opacity-80 hover:opacity-100">
                      Market Analysis
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Seasonal Calendar
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Community Forum
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Expert Advice
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Partners
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-white opacity-80 hover:opacity-100">
                      Copyright
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white border-opacity-20 pt-8">
          <div className="text-center mb-4">
            <p className="text-white opacity-80">
              Founded by Kenas A, J.Krish, Sivanand.M and Midhun Naveen
            </p>
          </div>
          <p className="text-base text-white opacity-60 text-center">
            &copy; {new Date().getFullYear()} GrowWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

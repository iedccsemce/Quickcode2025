import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Home from "@/pages/home";
import SeedDirectory from "@/pages/seed-directory";
import SeedDetail from "@/pages/seed-detail";
import MarketTrends from "@/pages/market-trends";
import LearningHub from "@/pages/learning-hub";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/seed-directory" component={SeedDirectory} />
      <Route path="/seed-directory/:id" component={SeedDetail} />
      <Route path="/market-trends" component={MarketTrends} />
      <Route path="/learning-hub" component={LearningHub} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

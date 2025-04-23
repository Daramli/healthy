import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlateBuilderProvider } from "@/context/PlateBuilderContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import PlateBuilder from "@/pages/PlateBuilder";
import Menu from "@/pages/Menu";
import Products from "@/pages/Products";
import Plans from "@/pages/Plans";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/plate-builder" component={PlateBuilder} />
      <Route path="/menu" component={Menu} />
      <Route path="/products" component={Products} />
      <Route path="/plans" component={Plans} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlateBuilderProvider>
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </PlateBuilderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

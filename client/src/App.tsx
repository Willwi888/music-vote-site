import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { TranslationProvider } from "@/hooks/useTranslation";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TranslationProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </TranslationProvider>
    </ErrorBoundary>
  );
}

export default App;

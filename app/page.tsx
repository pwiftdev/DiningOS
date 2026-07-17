import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProblemGrid } from "@/components/ProblemGrid";
import { SolutionCards } from "@/components/SolutionCards";
import { CameraShowcase } from "@/components/CameraShowcase";
import { FeatureCards } from "@/components/FeatureCards";
import { ProductShowcase } from "@/components/ProductShowcase";
import { DifferenceBand } from "@/components/DifferenceBand";
import { MetricsBand } from "@/components/MetricsBand";
import { HowItWorks } from "@/components/HowItWorks";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemGrid />
        <SolutionCards />
        <CameraShowcase />
        <FeatureCards />
        <ProductShowcase />
        <DifferenceBand />
        <MetricsBand />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedProperties from "../components/home/FeaturedProperties";
import ProcessSection from "../components/home/ProcessSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import BlogSection from "../components/home/BlogSection";
import CTASection from "../components/home/CTASection";
import FullScreenCarousel from "../components/home/FullScreenCarousel";

export default function Home() {
  return (
    <>
    <FullScreenCarousel />
      <Hero />
      <ServicesSection />
      <FeaturedProperties />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutStats from "@/components/AboutStats";
import AboutDiscover from "@/components/AboutDiscover";
import BookingSteps from "@/components/BookingSteps";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Preloader from "@/components/Preloader";

export default function AboutPage() {
  return (
    <>
      <Preloader />
      <Header />
      <main className="min-h-screen bg-[#fafafc]">
        <AboutHero />
        <AboutStats />
        <AboutDiscover />
        <BookingSteps />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

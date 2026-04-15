import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Properties from "@/components/Properties";
import BookingSteps from "@/components/BookingSteps";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Services />
        <Properties />
        <BookingSteps />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

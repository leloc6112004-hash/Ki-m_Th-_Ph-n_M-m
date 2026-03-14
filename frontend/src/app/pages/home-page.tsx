import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { QuickAccessSection } from "../components/quick-access-section";
import { AboutSection } from "../components/about-section";
import { AdvantagesSection } from "../components/advantages-section";
import { DoctorsSection } from "../components/doctors-section";
import { SpecialtiesSection } from "../components/specialties-section";
import { AppointmentSection } from "../components/appointment-section";
import { Footer } from "../components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <QuickAccessSection />
        <AboutSection />
        <AdvantagesSection />
        <DoctorsSection />
        <SpecialtiesSection />
        <AppointmentSection />
      </main>
      <Footer />
    </div>
  );
}
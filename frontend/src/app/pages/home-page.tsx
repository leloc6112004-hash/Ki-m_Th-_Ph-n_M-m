import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { QuickAccessSection } from "../components/quick-access-section";
import { AboutSection } from "../components/about-section";
import { AdvantagesSection } from "../components/advantages-section";
import { DoctorsSection } from "../components/doctors-section";
import { SpecialtiesSection } from "../components/specialties-section";
import { AppointmentSection } from "../components/appointment-section";
import { Footer } from "../components/footer";
import { PatientOverlay } from "../components/patient-overlay";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isAuthenticated, username } = useAuth();
  
  // Check if logged in user is a patient
  const isPatient = isAuthenticated && username === "Benhnhan@gmail.com";

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
      
      {/* Patient Overlay - Only show for patient users */}
      {isPatient && <PatientOverlay />}
    </div>
  );
}
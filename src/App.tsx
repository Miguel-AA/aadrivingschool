import { Routes, Route } from "react-router-dom";
import { useTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/cta/MobileCTABar";
import { FloatingWhatsApp } from "@/components/cta/FloatingWhatsApp";
import { ScrollToTop } from "@/components/util/ScrollToTop";
import { Home } from "@/pages/Home";
import { Courses } from "@/pages/Courses";
import { CatalogDetail } from "@/pages/CatalogDetail";
import { Contact } from "@/pages/Contact";
import { Checkout } from "@/pages/Checkout";
import { CourseFinder } from "@/pages/CourseFinder";
import { PermitPrep } from "@/pages/PermitPrep";
import { SpanishHelp } from "@/pages/SpanishHelp";
import { TicketHelp } from "@/pages/TicketHelp";
import { NewToFlorida } from "@/pages/NewToFlorida";
import { MatureDriver } from "@/pages/MatureDriver";
import { LicenseReinstatement } from "@/pages/LicenseReinstatement";
import { NotFound } from "@/pages/NotFound";

export function App() {
  const t = useTranslations("common");
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CatalogDetail />} />
          <Route path="/permit-test-prep" element={<PermitPrep />} />
          <Route path="/spanish-help" element={<SpanishHelp />} />
          <Route path="/ticket-help" element={<TicketHelp />} />
          <Route path="/new-to-florida" element={<NewToFlorida />} />
          <Route path="/55-plus-driver" element={<MatureDriver />} />
          <Route
            path="/license-reinstatement"
            element={<LicenseReinstatement />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<CourseFinder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </div>
  );
}

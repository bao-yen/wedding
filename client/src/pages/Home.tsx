import { useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventDetails from "@/components/EventDetails";
import InvitationCard from "@/components/InvitationCard";
import QuotesSection from "@/components/QuotesSection";
import RsvpSection from "@/components/RsvpSection";
import WishToast, { type WishToastRef } from "@/components/WishToast";
import PhotoBook from "@/components/PhotoBook";
import { WEDDING_DATA } from "../../../shared/weddingData";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const wishToastRef = useRef<WishToastRef>(null);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <main className="animate-fade-in-up">
          <HeroSection />
          <AboutSection />
          <QuotesSection />
          <PhotoBook />
          <InvitationCard />
          <EventDetails />
          <RsvpSection />

          {/* Wish Toast - floating notification */}
          <WishToast ref={wishToastRef} />

          {/* Footer */}
          <footer className="bg-primary/10 py-12 text-center borFder-t border-border">
            <h2 className="font-script text-4xl text-primary mb-4">
              {WEDDING_DATA.groom.name} &  {WEDDING_DATA.bride.name}
            </h2>
            <p className="font-serif text-muted-foreground mb-4">Thank you for being part of our big day!</p>
            <p className="text-sm text-muted-foreground/60">© 2025 Wedding Invitation</p>
          </footer>
        </main>
      )}
    </div>
  );
}

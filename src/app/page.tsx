import { Hero } from "@/components/Hero";
import { Workflow } from "@/components/Workflow";
import { Install } from "@/components/Install";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Workflow />
      <Install />
      <Footer />
    </main>
  );
}

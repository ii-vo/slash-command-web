import { Hero } from "@/components/Hero";
import { Workflow } from "@/components/Workflow";
import { ContextFolders } from "@/components/ContextFolders";
import { Handoff } from "@/components/Handoff";
import { Install } from "@/components/Install";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Workflow />
      <ContextFolders />
      <Handoff />
      <Install />
      <Footer />
    </main>
  );
}

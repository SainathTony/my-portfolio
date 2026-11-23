import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import AIWork from "./sections/AIWork";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Toolbox from "./sections/Toolbox";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#ai"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper-raised focus:px-4 focus:py-2 focus:shadow-sheet"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <AIWork />
        <Work />
        <Experience />
        <Toolbox />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

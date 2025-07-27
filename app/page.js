import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Comparison from './components/Comparison';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Comparison />
        <Features />
        <Pricing />
        <FAQ />
    </main>
      <Footer />
    </div>
  );
}

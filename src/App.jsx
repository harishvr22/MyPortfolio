import Header from './components/Header';
import SpotlightOverlay from './components/SpotlightOverlay';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="antialiased min-h-screen flex flex-col">
      <SpotlightOverlay />
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

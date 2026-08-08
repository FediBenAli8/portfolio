import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AmbientOrbs from "./components/AmbientOrbs";
import CommandMenu from "./components/CommandMenu";
import IntroScreen from "./components/IntroScreen";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      <BrowserRouter>
        {/* Background Interactive visual systems */}
        <AmbientOrbs />

        <Nav theme={theme} onToggleTheme={toggle} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>

        {/* Global Interactive Command Center */}
        <CommandMenu />

        <Footer />
      </BrowserRouter>
    </>
  );
}

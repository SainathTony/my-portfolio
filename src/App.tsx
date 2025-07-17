import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingSection from './components/LandingSection';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <LandingSection />
      </div>
    </ThemeProvider>
  );
}

export default App;

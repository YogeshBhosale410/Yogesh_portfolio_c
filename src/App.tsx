import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import About from './pages/About';
import AboutMorphing from './pages/AboutMorphing';
import Education from './pages/Education';
import ExperienceMorphing from './pages/ExperienceMorphing';
import ProjectsMorphing from './pages/ProjectsMorphing';
import SkillsMorphing from './pages/SkillsMorphing';
import Contact from './pages/Contact';
import Home from './pages/Home';
import './App.css';
import RoboticGrid from './components/RoboticGrid';

function App() {

  return (
    <Router>
      {/* Global robotic grid background */}
      <RoboticGrid />
      <div className="App" style={{ position: 'relative', zIndex: 1 }}>
        <header>
          <h1>Yogesh Bhosale Portfolio</h1>
          <nav>
            <ul className="navbar">
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-morphing" element={<AboutMorphing />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<ExperienceMorphing />} />
            <Route path="/projects" element={<ProjectsMorphing />} />

            <Route path="/skills" element={<SkillsMorphing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

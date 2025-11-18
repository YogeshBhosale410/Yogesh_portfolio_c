import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 0; /* behind content */
  pointer-events: none;
  mix-blend-mode: screen;
`;

const gradients: Record<string, string> = {
  '/': 'radial-gradient(60% 40% at 20% 30%, rgba(0,212,255,0.20) 0%, transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(0,255,191,0.16) 0%, transparent 60%)',
  '/about': 'radial-gradient(40% 35% at 25% 25%, rgba(255, 179, 71, 0.25) 0%, transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(0, 212, 255, 0.18) 0%, transparent 60%)',
  '/education': 'radial-gradient(45% 35% at 20% 70%, rgba(130, 233, 255, 0.22) 0%, transparent 60%), radial-gradient(45% 35% at 75% 20%, rgba(155, 81, 224, 0.18) 0%, transparent 60%)',
  '/experience': 'radial-gradient(50% 40% at 15% 35%, rgba(0, 255, 191, 0.2) 0%, transparent 60%), radial-gradient(45% 35% at 80% 70%, rgba(255, 0, 153, 0.16) 0%, transparent 60%)',
  '/projects': 'radial-gradient(55% 45% at 20% 30%, rgba(0,212,255,0.25) 0%, transparent 60%), radial-gradient(55% 45% at 80% 70%, rgba(0,255,191,0.2) 0%, transparent 60%)',
  '/skills': 'radial-gradient(45% 40% at 15% 25%, rgba(255, 214, 10, 0.22) 0%, transparent 60%), radial-gradient(45% 35% at 82% 75%, rgba(0, 212, 255, 0.2) 0%, transparent 60%)',
  '/contact': 'radial-gradient(50% 45% at 20% 30%, rgba(255, 99, 132, 0.22) 0%, transparent 60%), radial-gradient(55% 45% at 80% 70%, rgba(54, 162, 235, 0.2) 0%, transparent 60%)',
  '/admin': 'radial-gradient(55% 50% at 18% 28%, rgba(0, 255, 191, 0.22) 0%, transparent 60%), radial-gradient(55% 50% at 82% 72%, rgba(0, 212, 255, 0.22) 0%, transparent 60%)',
};

const PageBackgrounds: React.FC = () => {
  const { pathname } = useLocation();
  // choose base route key if nested paths exist
  const key = Object.keys(gradients).find(g => pathname.startsWith(g)) || '/';
  const bg = gradients[key];

  return (
    <Layer
      style={{ backgroundImage: bg }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
  );
};

export default PageBackgrounds;

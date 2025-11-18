import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animated floating effect
const float = keyframes`
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-20px) translateX(10px) scale(1.05); opacity: 0.9; }
  100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0; /* behind page content */
  overflow: hidden;
  pointer-events: none; /* do not block clicks */
`;

const Grid = styled.div`
  position: absolute;
  width: 140%;
  height: 140%;
  left: -20%;
  top: -20%;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-auto-rows: 80px;
  gap: 14px;
  opacity: 0.35;
  filter: blur(0.2px) saturate(120%);
  will-change: transform;
  /* background only visuals */
`;

const Box = styled(motion.div)`
  border-radius: 10px;
  background: linear-gradient(145deg, rgba(0,212,255,0.08), rgba(0,255,191,0.06));
  border: 1px solid rgba(0,212,255,0.18);
  box-shadow: 0 0 18px rgba(0, 212, 255, 0.08) inset;
  animation: ${float} 6s ease-in-out infinite;
`;

function useBoxes(count: number) {
  return useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      key: `fx-${i}`,
      delay: (i % 12) * 0.25,
      duration: 5 + (i % 7),
      rotate: (i % 2 === 0) ? 0 : 1,
      opacity: 0.6 + ((i % 5) * 0.05),
      scale: 0.9 + ((i % 3) * 0.05),
    }));
  }, [count]);
}

const BackgroundFX: React.FC = () => {
  // Responsive-ish amount of boxes
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768;
  const COUNT = isSmall ? 90 : 180;
  const boxes = useBoxes(COUNT);

  return (
    <Wrapper aria-hidden>
      <Grid>
        {boxes.map((b) => (
          <Box
            key={b.key}
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: b.opacity, scale: b.scale, rotate: b.rotate }}
            transition={{ duration: 1.2, delay: b.delay }}
          />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default BackgroundFX;

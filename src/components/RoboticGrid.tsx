import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const sweep = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  10% { opacity: 0.35; }
  50% { opacity: 0.2; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Grid = styled.div`
  position: absolute;
  inset: -20% -10% -10% -10%;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
  background-position: 0 0, 0 0;
  filter: drop-shadow(0 0 6px rgba(0,212,255,0.12));
  will-change: transform;
  transform: translateZ(0);
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(0, 255, 191, 0.04) 30%,
    rgba(0, 255, 191, 0.08) 50%,
    rgba(0, 255, 191, 0.04) 70%,
    transparent 100%);
  animation: ${sweep} 10s linear infinite;
  will-change: transform;
  transform: translateZ(0);
`;

const Nodes = styled.div`
  position: absolute;
  inset: 0;
`;

const Dot = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00e6ff;
  box-shadow: 0 0 10px rgba(0,230,255,0.8), 0 0 18px rgba(0,230,255,0.35);
  will-change: transform;
  transform: translateZ(0);
`;

const nodePositions = [
  { top: '12%', left: '18%' },
  { top: '28%', left: '62%' },
  { top: '46%', left: '35%' },
  { top: '68%', left: '78%' },
  { top: '82%', left: '22%' },
];

const RoboticGrid: React.FC = () => {
  return (
    <Wrapper aria-hidden>
      <Grid />
      <ScanLine style={{ left: '-25%' }} />
      <ScanLine style={{ left: '-60%', animationDelay: '2s' }} />
      <Nodes>
        {nodePositions.map((pos, i) => (
          <Dot
            key={i}
            style={pos}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </Nodes>
    </Wrapper>
  );
};

export default RoboticGrid;

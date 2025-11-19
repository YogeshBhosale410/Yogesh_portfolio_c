import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100%;
  overflow: hidden;
  z-index: -1;
  background: transparent; /* remove dark gradient to avoid black background */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  @media (max-width: 768px) {
    min-height: 100vh;
    height: auto;
  }
`;

const FloatingParticle = styled(motion.div)<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.2;
  will-change: transform;
  transform: translateZ(0);
`;

const GeometricShape = styled(motion.div)<{ size: number; rotation: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transform: rotate(${props => props.rotation}deg);
  opacity: 0.15;
  will-change: transform;
  transform: translateZ(0);
`;

const WaveLayer = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 212, 255, 0.02) 0%, transparent 50%);
  will-change: transform;
  transform: translateZ(0);
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  animation: gridMove 20s linear infinite;
  will-change: transform;
  transform: translateZ(0);
  
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`;

const CircuitLine = styled(motion.div)<{ width: number; height: number; top: string; left: string; color: string }>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top};
  left: ${props => props.left};
  background: ${props => props.color};
  opacity: 0.15;
  will-change: transform;
  transform: translateZ(0);
`;


const AnimatedBackground: React.FC = () => {
  // Use useMemo to avoid recalculating on every render
  const [width, height] = typeof window !== 'undefined'
    ? [window.innerWidth, window.innerHeight]
    : [1920, 1080];

  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.6)' : 'rgba(0, 255, 127, 0.6)',
      initialX: Math.random() * width,
      initialY: Math.random() * height,
    })), []
  );

  const shapes = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      rotation: Math.random() * 360,
      initialX: Math.random() * width,
      initialY: Math.random() * height,
    })), []
  );

  const circuitLines = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      width: Math.random() * 200 + 100,
      height: Math.random() > 0.5 ? 2 : Math.random() * 100 + 50,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    })), []
  );

  return (
    <BackgroundContainer>
      {/* Animated wave layers */}
      <WaveLayer
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <WaveLayer
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ opacity: 0.5 }}
      />

      {/* Moving grid overlay */}
      <GridOverlay />

      {/* Floating particles */}
      {particles.map((particle) => (
        <FloatingParticle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          initial={{
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{
            x: [
              particle.initialX,
              particle.initialX + Math.random() * 400 - 200,
              particle.initialX + Math.random() * 400 - 200,
              particle.initialX,
            ],
            y: [
              particle.initialY,
              particle.initialY + Math.random() * 300 - 150,
              particle.initialY + Math.random() * 300 - 150,
              particle.initialY,
            ],
            scale: [1, 1.5, 0.8, 1],
            opacity: [0.6, 0.9, 0.3, 0.6],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric shapes */}
      {shapes.map((shape) => (
        <GeometricShape
          key={shape.id}
          size={shape.size}
          rotation={shape.rotation}
          initial={{
            x: shape.initialX,
            y: shape.initialY,
          }}
          animate={{
            x: [
              shape.initialX,
              shape.initialX + Math.random() * 200 - 100,
              shape.initialX,
            ],
            y: [
              shape.initialY,
              shape.initialY + Math.random() * 200 - 100,
              shape.initialY,
            ],
            rotate: [shape.rotation, shape.rotation + 360, shape.rotation + 720],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Circuit lines */}
      {circuitLines.map((line) => (
        <CircuitLine
          key={line.id}
          width={line.width}
          height={line.height}
          top={line.top}
          left={line.left}
          color="linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)"
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Pulsing orbs */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '70%',
          right: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Scanning lines */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
        }}
        animate={{
          y: [0, window.innerHeight, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent, rgba(0, 255, 127, 0.1), transparent)',
        }}
        animate={{
          x: [0, window.innerWidth, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />

      {/* Vignette overlay removed to restore previous appearance */}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;

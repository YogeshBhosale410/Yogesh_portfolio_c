import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AnimatedBackground from '../components/AnimatedBackground';



const WorkspaceContainer = styled(motion.div)`
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
  padding-top: 10px;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 162, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 150, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
    will-change: transform;
    transform: translateZ(0);
  }
  
  @media (max-width: 768px) {
    overflow: visible;
    min-height: auto;
    padding-top: 1px;
  }
`;

const IntroPanel = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 400px;
  z-index: 120;
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    max-width: 90%;
    margin: 2px auto;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    margin: 1px auto;
  }
`;

const Title = styled.h1`
  color: #00d4ff;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Instruction = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const DraggableHint = styled.p`
  color: #00d4ff;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
  animation: pulse 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;



const DraggableObject = styled(motion.div)<{ color: string }>`
  position: absolute;
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, ${props => props.color}15, ${props => props.color}35);
  border: 2px solid ${props => props.color};
  border-radius: 20px;
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  user-select: none;
  z-index: 150;
  will-change: transform;
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
  
  &:hover {
    transform: translateZ(10px) scale(1.05);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px ${props => props.color}44;
  }
  
  &:active {
    cursor: grabbing;
    transform: translateZ(5px) scale(0.95);
  }
`;

const ObjectIcon = styled.div<{ color: string }>`
  font-size: 2.5rem;
  color: ${props => props.color};
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 10px ${props => props.color}44);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ObjectLabel = styled.div`
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;







const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const handleObjectClick = (route: string) => {
    setTimeout(() => {
      navigate(route);
    }, 200);
  };
  
  // Update positions on window resize
  const [, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  React.useEffect(() => {
    const handleResize = () => {
      // Update window size state to trigger re-render
      // This prevents infinite recursion as warned in memory about self-triggering event loops
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <AnimatedBackground />
      <WorkspaceContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
      <IntroPanel
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.0, type: "spring", stiffness: 120, damping: 30 }}
      >
        <Title>YOGESH BHOSALE</Title>
        <Subtitle>BCA Graduate | Python | IoT Enthusiast | Embedded Systems | MERN Stack Developer Using AI</Subtitle>
        <Instruction>Drag the objects around to explore my portfolio! 🎵 Loading music...</Instruction>
      </IntroPanel>

      {/* About Me */}
      <DraggableObject
        color="#00d4ff"
        drag
        dragMomentum={false}
        dragElastic={0.5}
        initial={{ x: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 50 : 190, y: window.innerWidth < 480 ? 60 : window.innerWidth < 768 ? 100 : 280, scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150, damping: 25 }}
        whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
        whileDrag={{ scale: window.innerWidth < 768 ? 1.1 : 1.2, rotateY: window.innerWidth < 768 ? 10 : 20, rotateX: window.innerWidth < 768 ? 5 : 10, zIndex: 1000 }}
        onClick={() => handleObjectClick('/about')}
      >
        <ObjectIcon color="#00d4ff">
          👤
        </ObjectIcon>
        <ObjectLabel>About Me</ObjectLabel>
      </DraggableObject>

      {/* Projects */}
      <DraggableObject
        color="#ff6b6b"
        drag
        dragMomentum={false}
        dragElastic={0.5}
        initial={{ x: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 50 : 400, y: window.innerWidth < 480 ? 120 : window.innerWidth < 768 ? 160 : 200, scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 150, damping: 25 }}
        whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
        whileDrag={{ scale: window.innerWidth < 768 ? 1.1 : 1.2, rotateY: window.innerWidth < 768 ? 10 : 20, rotateX: window.innerWidth < 768 ? 5 : 10, zIndex: 1000 }}
        onClick={() => handleObjectClick('/projects')}
      >
        <ObjectIcon color="#ff6b6b">
          💻
        </ObjectIcon>
        <ObjectLabel>Projects</ObjectLabel>
      </DraggableObject>

      {/* Skills */}
      <DraggableObject
        color="#4ecdc4"
        drag
        dragMomentum={false}
        dragElastic={0.5}
        initial={{ x: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 50 : 600, y: window.innerWidth < 480 ? 180 : window.innerWidth < 768 ? 220 : 150, scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 150, damping: 25 }}
        whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
        whileDrag={{ scale: window.innerWidth < 768 ? 1.1 : 1.2, rotateY: window.innerWidth < 768 ? 10 : 20, rotateX: window.innerWidth < 768 ? 5 : 10, zIndex: 1000 }}
        onClick={() => handleObjectClick('/skills')}
      >
        <ObjectIcon color="#4ecdc4">
          ⚙️
        </ObjectIcon>
        <ObjectLabel>Skills</ObjectLabel>
      </DraggableObject>

      {/* Experience */}
      <DraggableObject
        color="#45b7d1"
        drag
        dragMomentum={false}
        dragElastic={0.5}
        initial={{ x: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 50 : 300, y: window.innerWidth < 480 ? 240 : window.innerWidth < 768 ? 280 : 350, scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 150, damping: 25 }}
        whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
        whileDrag={{ scale: window.innerWidth < 768 ? 1.1 : 1.2, rotateY: window.innerWidth < 768 ? 10 : 20, rotateX: window.innerWidth < 768 ? 5 : 10, zIndex: 1000 }}
        onClick={() => handleObjectClick('/experience')}
      >
        <ObjectIcon color="#45b7d1">
          💼
        </ObjectIcon>
        <ObjectLabel>Experience</ObjectLabel>
      </DraggableObject>

      {/* Education */}
      <DraggableObject
        color="#96ceb4"
        drag
        dragMomentum={false}
        dragElastic={0.5}
        initial={{ x: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 50 : 500, y: window.innerWidth < 480 ? 300 : window.innerWidth < 768 ? 340 : 400, scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 150, damping: 25 }}
        whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
        whileDrag={{ scale: window.innerWidth < 768 ? 1.1 : 1.2, rotateY: window.innerWidth < 768 ? 10 : 20, rotateX: window.innerWidth < 768 ? 5 : 10, zIndex: 1000 }}
        onClick={() => handleObjectClick('/education')}
      >
        <ObjectIcon color="#96ceb4">
          📚
        </ObjectIcon>
        <ObjectLabel>Education</ObjectLabel>
      </DraggableObject>

      {/* Contact */}
      <DraggableObject
        color="#ffeaa7"
        drag
        dragMomentum={false}
        dragElastic={0.5}
        initial={{ x: window.innerWidth < 480 ? 20 : window.innerWidth < 768 ? 50 : 700, y: window.innerWidth < 480 ? 360 : window.innerWidth < 768 ? 400 : 300, scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8, type: "spring", stiffness: 150, damping: 25 }}
        whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
        whileDrag={{ scale: window.innerWidth < 768 ? 1.1 : 1.2, rotateY: window.innerWidth < 768 ? 10 : 20, rotateX: window.innerWidth < 768 ? 5 : 10, zIndex: 1000 }}
        onClick={() => handleObjectClick('/contact')}
      >
        <ObjectIcon color="#ffeaa7">
          ✉️
        </ObjectIcon>
        <ObjectLabel>Contact</ObjectLabel>
      </DraggableObject>
      </WorkspaceContainer>
    </>
  );
};

export default React.memo(Home);
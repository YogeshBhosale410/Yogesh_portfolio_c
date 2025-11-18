import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface MorphingGeometryProps {
  data: {
    id: string;
    title: string;
    description: string;
    tech: string[];
    color: string;
    icon: string;
  };
  index: number;
  isActive: boolean;
  onActivate: () => void;
}



const GeometryContainer = styled(motion.div)<{ isActive: boolean; color: string }>`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px;
  cursor: pointer;
  perspective: 1000px;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const MorphingShape = styled.div<{ isActive: boolean; color: string; index: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.isActive 
    ? `linear-gradient(135deg, ${props.color}40, ${props.color}80)`
    : `linear-gradient(135deg, ${props.color}20, ${props.color}40)`
  };
  border: 2px solid ${props => props.color};
  clip-path: ${props => {
    const shapes = [
      'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // Octagon
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)', // Rounded square
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Pentagon
      'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
    ];
    return props.isActive ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : shapes[props.index % shapes.length];
  }};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isActive ? '0 0 30px rgba(0, 212, 255, 0.5)' : '0 0 10px rgba(0, 212, 255, 0.2)'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => `conic-gradient(from 0deg, ${props.color}00, ${props.color}40, ${props.color}00)`};
    animation: ${props => props.isActive ? 'spin 4s linear infinite' : 'none'};
    z-index: -1;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ContentOverlay = styled(motion.div)<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  opacity: ${props => props.isActive ? 1 : 0};
  pointer-events: ${props => props.isActive ? 'all' : 'none'};
  transition: opacity 0.5s ease;
`;

const ShapeIcon = styled.div<{ isActive: boolean; color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${props => props.isActive ? '2rem' : '3rem'};
  color: ${props => props.color};
  transition: all 0.5s ease;
  z-index: 2;
  text-shadow: 0 0 20px ${props => props.color}80;
`;

const Title = styled.h3`
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Description = styled.p`
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const TechTag = styled.span<{ color: string }>`
  background: ${props => props.color}20;
  border: 1px solid ${props => props.color};
  color: ${props => props.color};
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const CircuitLines = styled.div<{ isActive: boolean; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: ${props => props.isActive ? 1 : 0.3};
  transition: opacity 0.5s ease;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: ${props => props.color};
    transition: all 0.8s ease;
  }
  
  &::before {
    top: 20%;
    left: 0;
    width: 100%;
    height: 2px;
    transform: ${props => props.isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
  }
  
  &::after {
    top: 0;
    right: 20%;
    width: 2px;
    height: 100%;
    transform: ${props => props.isActive ? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top;
  }
`;

const MorphingGeometry: React.FC<MorphingGeometryProps> = ({ 
  data, 
  index, 
  isActive, 
  onActivate 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GeometryContainer
      isActive={isActive}
      color={data.color}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onActivate}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{ duration: 0.3 }}
    >
      <MorphingShape
        isActive={isActive}
        color={data.color}
        index={index}
      />
      
      <CircuitLines 
        isActive={isActive || isHovered} 
        color={data.color} 
      />
      
      <ShapeIcon
        isActive={isActive}
        color={data.color}
      >
        {data.icon}
      </ShapeIcon>
      
      <AnimatePresence>
        {isActive && (
          <ContentOverlay
            isActive={isActive}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Title>{data.title}</Title>
            <Description>{data.description}</Description>
            <TechList>
              {data.tech.map((tech, i) => (
                <TechTag key={i} color={data.color}>
                  {tech}
                </TechTag>
              ))}
            </TechList>
          </ContentOverlay>
        )}
      </AnimatePresence>
    </GeometryContainer>
  );
};

export default MorphingGeometry;

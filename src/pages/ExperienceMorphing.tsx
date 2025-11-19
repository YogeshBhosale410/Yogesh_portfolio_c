import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  tech: string[];
  color: string;
  icon: string;
  category: 'current' | 'internship' | 'project' | 'academic';
}

const ExperienceContainer = styled(motion.div)`
  min-height: 100vh;
  background: transparent;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-family: 'Courier New', monospace;
  background: linear-gradient(45deg, #00d4ff, #00ff7f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const GeometryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
`;

const MorphingCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color'].includes(prop as string),
})<{ $isActive: boolean; color: string }>`
  position: relative;
  height: 300px;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.color}40;
  transition: all 0.5s ease;
  will-change: transform;
  transform: translateZ(0);
  
  &:hover {
    border-color: ${props => props.color};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px ${props => props.color}20;
  }
`;

const MorphingShape = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color', '$shapeType'].includes(prop as string),
})<{ 
  $isActive: boolean; 
  color: string; 
  $shapeType: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, ${props => props.color}40, ${props => props.color}80);
  border: 3px solid ${props => props.color};
  transform: translate(-50%, -50%);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  
  ${props => {
    const shapes = {
      triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      rounded: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
      heptagon: 'polygon(50% 0%, 90% 20%, 90% 70%, 50% 100%, 10% 70%, 10% 20%)'
    };
    
    return `clip-path: ${shapes[props.$shapeType as keyof typeof shapes] || shapes.triangle};`;
  }}
  
  ${props => props.$isActive && `
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    border-radius: 0;
  `}
`;

const ShapeIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isActive',
})<{ $isActive: boolean }>`
  font-size: ${props => props.$isActive ? '2rem' : '3rem'};
  transition: all 0.5s ease;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
`;

const ContentOverlay = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color'].includes(prop as string),
})<{ $isActive: boolean; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, ${props => props.color}10, rgba(0, 0, 0, 0.9));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  opacity: ${props => props.$isActive ? 1 : 0};
  pointer-events: ${props => props.$isActive ? 'auto' : 'none'};
  transition: opacity 0.5s ease;
  text-align: center;
`;

const ContentTitle = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ContentCompany = styled.p`
  color: #00ff7f;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;

const ContentDuration = styled.p`
  color: #00d4ff;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const ContentDescription = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const TechTag = styled.span<{ color: string }>`
  background: ${props => props.color}20;
  color: ${props => props.color};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  border: 1px solid ${props => props.color}40;
`;

const CircuitPattern = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color'].includes(prop as string),
})<{ $isActive: boolean; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => props.$isActive ? 0.3 : 0};
  transition: opacity 0.5s ease;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: ${props => props.color};
    transition: all 0.5s ease;
  }
  
  &::before {
    top: 20%;
    left: 10%;
    width: 80%;
    height: 2px;
    box-shadow: 
      0 0 10px ${props => props.color},
      0 20px 0 ${props => props.color},
      0 40px 0 ${props => props.color};
  }
  
  &::after {
    top: 10%;
    left: 20%;
    width: 2px;
    height: 80%;
    box-shadow: 
      0 0 10px ${props => props.color},
      20px 0 0 ${props => props.color},
      40px 0 0 ${props => props.color};
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color'].includes(prop as string),
})<{ $isActive: boolean; color: string }>`
  background: ${props => props.$isActive ? props.color + '40' : 'transparent'};
  border: 1px solid ${props => props.color};
  color: ${props => props.color};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${props => props.color + '20'};
    transform: translateY(-2px);
  }
`;

const experienceData: ExperienceData[] = [
  {
    id: 'infokshetra',
    title: 'Full Stack Development Intern',
    company: 'INFOKSHETRA TECHNOLOGY',
    duration: 'Feb 2025 - Mar 2025',
    description: 'Developed a College Grievance Management website with secure user authentication and database-driven complaint handling.',
    achievements: [
      'Developing college grievance management system',
      'Implementing user authentication and secure database handling',
      'Ensuring transparency in grievance resolution process',
      'Working with modern MERN stack technologies'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    color: '#00d4ff',
    icon: '💼',
    category: 'current'
  },
  {
    id: 'magnum',
    title: 'IoT Developer Intern',
    company: 'MAGNUM INFORMATION DRIVEN',
    duration: 'Feb 2025 - Apr 2025',
    description: 'Developed a LoRa-based smart irrigation system with remote water pump control..',
    achievements: [
      'Built IoT-based smart irrigation system using ESP32',
      'Implemented LoRa-based remote pump control',
      'Integrated real-time weather data for optimization',
      'Created web dashboard for monitoring and AI-driven efficiency'
    ],
    tech: ['ESP32', 'LoRa', 'HTML', 'Sensors', 'Weather API'],
    color: '#00ff7f',
    icon: '🌱',
    category: 'current'
  },
  {
    id: 'loading',
    title: 'Additional Projects',
    company: 'Loading...',
    duration: 'Loading...',
    description: 'Exploring new technologies and working on innovative projects.',
    achievements: [
      'Learning advanced IoT concepts',
      'Developing new embedded systems',
      'Experimenting with AI and machine learning',
      'System optimized for innovation!'
    ],
    tech: ['IoT', 'Embedded Systems', 'AI', 'Loading...'],
    color: '#ffd93d',
    icon: '🔄',
    category: 'current'
  }
];

const categories = [
  { id: 'all', label: 'All', color: '#00d4ff' },
  { id: 'current', label: 'Current', color: '#00ff7f' }
];

const shapeTypes = ['triangle', 'pentagon', 'hexagon', 'octagon', 'rounded', 'heptagon'];

const ExperienceMorphing: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredExperiences = activeCategory === 'all' 
    ? experienceData 
    : experienceData.filter(exp => exp.category === activeCategory);

  const handleCardClick = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveCard(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <AnimatedBackground />
      <ExperienceContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header>
          <Title
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            🤖 WORK.EXPERIENCE_LOG
          </Title>
          <Subtitle
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            &gt; Loading professional journey data...
          </Subtitle>
        </Header>

        <CategoryFilter>
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              $isActive={activeCategory === category.id}
              color={category.color}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </FilterButton>
          ))}
        </CategoryFilter>

        <GeometryGrid>
          <AnimatePresence>
            {filteredExperiences.map((experience, index) => (
              <MorphingCard
                key={experience.id}
                $isActive={activeCard === experience.id}
                color={experience.color}
                onClick={() => handleCardClick(experience.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MorphingShape
                  $isActive={activeCard === experience.id}
                  color={experience.color}
                  $shapeType={shapeTypes[index % shapeTypes.length]}
                  animate={{
                    rotate: activeCard === experience.id ? 0 : [0, 360],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: activeCard === experience.id ? 0 : Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  <ShapeIcon $isActive={activeCard === experience.id}>
                    {experience.icon}
                  </ShapeIcon>
                </MorphingShape>

                <CircuitPattern
                  $isActive={activeCard === experience.id}
                  color={experience.color}
                />

                <ContentOverlay
                  $isActive={activeCard === experience.id}
                  color={experience.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === experience.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContentTitle>{experience.title}</ContentTitle>
                  <ContentCompany>{experience.company}</ContentCompany>
                  <ContentDuration>{experience.duration}</ContentDuration>
                  <ContentDescription>{experience.description}</ContentDescription>
                  
                  <TechList>
                    {(experience.tech ?? []).map((tech, techIndex) => (
                      <TechTag key={techIndex} color={experience.color}>
                        {tech}
                      </TechTag>
                    ))}
                  </TechList>
                </ContentOverlay>
              </MorphingCard>
            ))}
          </AnimatePresence>
        </GeometryGrid>

        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              color: '#00d4ff',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.9rem',
              zIndex: 1000
            }}
          >
            Press ESC to close
          </motion.div>
        )}
      </ExperienceContainer>
    </>
  );
};

export default ExperienceMorphing;

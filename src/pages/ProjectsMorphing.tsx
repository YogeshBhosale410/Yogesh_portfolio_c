import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

// Styled components for the ProjectDetails
const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  z-index: 1000;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;


// Type definitions for styled components
interface MorphingCardProps extends HTMLMotionProps<'div'> {
  $isActive: boolean;
  $color: string;
}

interface ProjectLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color: string;
}

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $isActive: boolean;
  color: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    }
  }
}



interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  color: string;
  icon: string;
  category: 'iot' | 'web' | 'mobile' | 'fullstack';
  details: string;
}

const ProjectsContainer = styled(motion.div)`
  min-height: 100vh;
  background: transparent; /* remove dark gradient */
  padding: 1rem;
  position: relative;
  overflow: hidden;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
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
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GeometryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
  shouldForwardProp: (prop) => !['$isActive', '$color'].includes(prop),
})<MorphingCardProps>`
  position: relative;
  height: 350px;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.$color}40;
  transition: all 0.5s ease;
  
  &:hover {
    border-color: ${props => props.$color};
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.$color}20;
  }
`;

const MorphingShape = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isActive', 'color', 'shapeType'].includes(prop as string),
})<{
  isActive: boolean;
  color: string;
  shapeType: string;
}>`
  position: absolute;
  top: 40%;
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
      octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
    };
    
    return `clip-path: ${shapes[props.shapeType as keyof typeof shapes] || shapes.triangle};`;
  }}
  
  ${props => props.isActive && `
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    border-radius: 0;
    top: 0;
    transform: translate(-50%, 0);
  `}
`;

const ShapeIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  font-size: ${props => props.isActive ? '2rem' : '3rem'};
  transition: all 0.5s ease;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  color: ${props => props.isActive ? '#fff' : '#aaa'};
  background: ${props => props.isActive ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
`;

const ProjectName = styled(motion.div)<{ color: string }>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.color};
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 15px;
  border: 1px solid ${props => props.color}40;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentOverlay = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isActive', 'color'].includes(prop as string),
})<{ isActive: boolean; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, ${props => props.color}10, rgba(0, 0, 0, 0.9));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  opacity: ${props => props.isActive ? 1 : 0};
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
  transition: opacity 0.5s ease;
  text-align: center;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.color};
    border-radius: 2px;
  }
`;

const ContentTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContentDescription = styled.p`
  color: #cccccc;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TechTag = styled.span<{ color: string }>`
  background: ${props => props.color}20;
  color: ${props => props.color};
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  border: 1px solid ${props => props.color}40;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ProjectLink = styled(motion.a).withConfig({
  shouldForwardProp: (prop) => prop !== 'color',
})<ProjectLinkProps>`
  background: ${props => props.color}20;
  color: ${props => props.color};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  border: 1px solid ${props => props.color}40;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &::before {
    background: ${props => props.color}1a;
  }
  
  &:hover {
    background: ${props => props.color}40;
    transform: translateY(-2px);
  }
`;

const CircuitPattern = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'color'].includes(prop as string),
})<{ isActive: boolean; color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => props.isActive ? 0.3 : 0};
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

const FilterButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['$isActive', 'color'].includes(prop),
})<FilterButtonProps>`
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

const projectsData: ProjectData[] = [
  {
    id: 'agrosense',
    title: 'SMART AGROSENSE: LoRa-Based Smart Irrigation and Remote Water Pump Control',
    description: 'IoT-based system using ESP32, soil moisture sensors, and real-time weather data to optimize irrigation. Features LoRa-based remote pump control and web dashboard.',
    tech: ['ESP32', 'LoRa', 'HTML', 'Sensors', 'Weather API'],
    github: 'https://github.com/YogeshBhosale410',
    demo: '#',
    color: '#00ff7f',
    icon: '🌾',
    category: 'iot',
    details: 'ESP32 Microcontroller Integration • Soil Moisture Sensor Network • Real-time Weather Data Processing • LoRa Long-Range Communication • Remote Water Pump Control • Live Sensor Data Visualization • AI-driven Water Efficiency'
  },
  {
    id: 'emergigo',
    title: 'EmergiGo',
    description: 'Developed an IoT and AI-based intelligent traffic signal system that prioritizes emergency vehicles and dynamically manages traffic based on vehicle density, reducing congestion and delays.',
    tech: ['React', 'Node.js', 'GPS API', 'Real-time DB'],
    github: 'https://github.com/YogeshBhosale410',
    demo: '#',
    color: '#ff6b6b',
    icon: '🚑',
    category: 'mobile',
    details: 'Emergency Vehicle Detection • Real-time Traffic Density Monitoring • Dynamic Signal Control • Priority Clearance for Emergencies • Reduced Congestion • Automated & Reliable Operation'
  },
  {
    id: 'streamflix',
    title: 'StreamFlix',
    description: 'Netflix-Inspired UI  Responsive Frontend Design    Dynamic Movie Browsing (UI Only)  Mobile-First Approach.',
    tech: ['React', 'CSS3', 'JavaScript', 'API Integration'],
    github: 'https://github.com/YogeshBhosale410',
    demo: '#',
    color: '#00d4ff',
    icon: '🎥',
    category: 'web',
    details: 'Netflix-Inspired UI Design  Movie Database Integration  User Authentication System  Personalized Recommendations  Dynamic Movie Browsing  Watchlist Management  Mobile-First Approach'
  },
  {
    id: 'grievance',
    title: 'College Grievance App',
    description: 'MERN stack application for managing student grievances with user authentication, complaint tracking, admin dashboard, and automated notifications.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    github: 'https://github.com/YogeshBhosale410',
    demo: '#',
    color: '#ffd93d',
    icon: '🏫',
    category: 'fullstack',
    details: 'Student Complaint Portal • Multi-level Approval System • Real-time Status Tracking • Automated Notifications • Admin Dashboard • JWT Authentication • Role-based Access Control • Currently under development at INFOKSHETRA'
  }
];

const categories = [
  { id: 'all', label: 'All', color: '#00d4ff' },
  { id: 'iot', label: 'IoT', color: '#00ff7f' },
  { id: 'web', label: 'Web', color: '#00d4ff' },
  { id: 'mobile', label: 'Mobile', color: '#ff6b6b' },
  { id: 'fullstack', label: 'Full Stack', color: '#ffd93d' }
];

const shapeTypes = ['triangle', 'pentagon', 'hexagon', 'octagon'];

// Memoize project card component to prevent unnecessary re-renders
interface ProjectCardProps {
  project: ProjectData;
  isSelected: boolean;
  onClick: () => void;
}

// Define ProjectCard as a simple function component
const ProjectCard = ({ project, isSelected, onClick }: ProjectCardProps) => {
  // Prepare the style object with the project color
  const cardStyle = {
    '--project-color': project.color,
    zIndex: isSelected ? 100 : 1,
  } as React.CSSProperties;
  return (
    <MorphingCard 
      key={project.id}
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      $isActive={isSelected}
      $color={project.color}
      style={cardStyle}
    >
      <MorphingShape
        isActive={isSelected}
        color={project.color}
        shapeType={shapeTypes[0]}
        animate={{
          rotate: isSelected ? 0 : [0, 360],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: isSelected ? 0 : Infinity,
            ease: "linear"
          }
        }}
      >
        <ShapeIcon isActive={isSelected}>
          {project.icon}
        </ShapeIcon>
      </MorphingShape>

      <ProjectName 
        color={project.color}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isSelected ? 0 : 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {project.title}
      </ProjectName>

      <CircuitPattern
        isActive={isSelected}
        color={project.color}
      />

      <ContentOverlay
        isActive={isSelected}
        color={project.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ContentTitle>{project.title}</ContentTitle>
        <ContentDescription>{project.description}</ContentDescription>
        
        <TechList>
          {project.tech.map((tech, techIndex) => (
            <TechTag key={techIndex} color={project.color}>
              {tech}
            </TechTag>
          ))}
        </TechList>

        <ContentDescription style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
          {(project.details ?? '')}
        </ContentDescription>

        <ProjectLinks>
          <ProjectLink href={project.github} target="_blank" color={project.color}>
            GitHub
          </ProjectLink>
          <ProjectLink href={project.demo} target="_blank" color={project.color}>
            Demo
          </ProjectLink>
        </ProjectLinks>
      </ContentOverlay>
    </MorphingCard>
  );
};

const ProjectsMorphing = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Memoize filtered projects to prevent recalculation on every render
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  const handleProjectClick = useCallback((projectId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedProject(projectId);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const handleCloseDetails = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const selectedProjectData = projectsData.find(p => p.id === selectedProject);

  // Get color for category filter buttons
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'iot': return '#00ff7f';
      case 'web': return '#00d4ff';
      case 'mobile': return '#ff6b6b';
      case 'fullstack': return '#ffd93d';
      default: return '#fff';
    }
  };

  return (
    <ProjectsContainer>
      <TitleContainer>
        <Title>PROJECT.PORTFOLIO</Title>
        <Subtitle>// Interactive selection of my development work</Subtitle>
        
        <FilterContainer>
          {['all', 'iot', 'web', 'mobile', 'fullstack'].map(category => (
            <FilterButton
              key={category}
              $isActive={selectedCategory === category}
              color={getCategoryColor(category)}
              onClick={() => setSelectedCategory(category)}
            >
              {category.toUpperCase()}
            </FilterButton>
          ))}
        </FilterContainer>
      </TitleContainer>

      <ProjectsGrid>
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedProject === project.id}
            onClick={() => handleProjectClick(project.id)}
          />
        ))}
      </ProjectsGrid>

    </ProjectsContainer>
  );
};

export default ProjectsMorphing;

// Styled components for the ProjectDetails


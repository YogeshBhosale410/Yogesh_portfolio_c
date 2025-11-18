import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

interface AboutSectionData {
  id: string;
  title: string;
  description: string;
  details: string[];
  color: string;
  icon: string;
  category: 'personal' | 'technical' | 'academic' | 'professional';
}

const AboutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
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

const Title = styled.h1`
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GeometryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const MorphingCard = styled(motion.div)<{ $isActive: boolean; $color: string; $shapeIndex: number }>`
  position: relative;
  width: 100%;
  height: 300px;
  cursor: pointer;
  perspective: 1000px;
  will-change: transform;
  transform: translateZ(0);
  
  &:hover {
    transform: scale(1.01);
  }
`;

const MorphingShape = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color', '$shapeIndex'].includes(prop as string),
})<{ $isActive: boolean; $color: string; $shapeIndex: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ $isActive, $color }) => $isActive 
    ? `linear-gradient(135deg, ${$color}60, ${$color}90)`
    : `linear-gradient(135deg, ${$color}20, ${$color}40)`
  };
  border: 2px solid ${({ $color }) => $color};
  clip-path: ${({ $isActive, $shapeIndex }) => {
    const shapes = [
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Pentagon
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // Octagon
      'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
      'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)', // Rounded square
      'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)', // Heptagon
    ];
    return $isActive ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : shapes[$shapeIndex % shapes.length];
  }};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isActive, $color }) => $isActive ? `0 0 40px ${$color}80` : `0 0 15px ${$color}40`};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $color }) => `conic-gradient(from 0deg, ${$color}00, ${$color}30, ${$color}00)`};
    animation: ${({ $isActive }) => $isActive ? 'spin 6s linear infinite' : 'none'};
    z-index: -1;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ShapeIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$color'].includes(prop as string),
})<{ $isActive: boolean; $color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ $isActive }) => $isActive ? '2rem' : '3rem'};
  color: ${({ $color }) => $color};
  transition: all 0.5s ease;
  z-index: 2;
  text-shadow: 0 0 20px ${({ $color }) => $color}80;
  filter: ${({ $isActive }) => $isActive ? 'brightness(1.2)' : 'brightness(1)'};
`;

const ContentOverlay = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== '$isActive',
})<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
  opacity: ${({ $isActive }) => $isActive ? 1 : 0};
  pointer-events: ${({ $isActive }) => $isActive ? 'all' : 'none'};
  transition: opacity 0.5s ease;
  overflow-y: auto;
`;

const ContentTitle = styled.h3`
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContentDescription = styled.p`
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== '$color',
})<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  padding-left: 1rem;
  position: relative;
  
  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: ${({ $color }) => $color};
    font-size: 0.7rem;
  }
`;

const CircuitPattern = styled.div<{ $isActive: boolean; $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: ${({ $isActive }) => $isActive ? 0.8 : 0.3};
  transition: opacity 0.5s ease;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: ${({ $color }) => $color};
    transition: all 0.8s ease;
  }
  
  &::before {
    top: 30%;
    left: 0;
    width: 100%;
    height: 1px;
    transform: ${({ $isActive }) => $isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    box-shadow: 0 0 10px ${({ $color }) => $color};
  }
  
  &::after {
    top: 0;
    right: 30%;
    width: 1px;
    height: 100%;
    transform: ${({ $isActive }) => $isActive ? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top;
    box-shadow: 0 0 10px ${({ $color }) => $color};
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $isActive: boolean; $color: string }>`
  background: ${({ $isActive, $color }) => $isActive ? `${$color}40` : 'transparent'};
  border: 1px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${({ $color }) => `${$color}20`};
    transform: translateY(-2px);
  }
`;

const AboutMorphing: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const aboutData: AboutSectionData[] = [
    {
      id: 'core_functions',
      title: 'Core Functions',
      description: 'Primary operational parameters and system capabilities',
      details: [
        'Full-Stack Development: MERN Stack Specialist',
        'IoT Integration: ESP32, Arduino, Sensor Networks',
        'Database Management: MongoDB, MySQL, Firebase',
        'Version Control: Git, GitHub, Collaborative Development',
        'Problem Solving: Analytical thinking, Debug protocols',
        'Learning Protocol: Continuous skill acquisition mode'
      ],
      color: '#00d4ff',
      icon: '⚙️',
      category: 'technical'
    },
    {
      id: 'technical_specs',
      title: 'Technical Specifications',
      description: 'Hardware and software compatibility matrix',
      details: [
        'Programming Languages: JavaScript, Python, PHP, C++',
        'Frontend Frameworks: React.js, Vue.js, HTML5, CSS3',
        'Backend Technologies: Node.js, Express.js, REST APIs',
        'IoT Platforms: ESP32, Arduino, Raspberry Pi',
        'Development Tools: VS Code, Postman, MongoDB Compass',
        'Operating Systems: Windows, Linux compatibility'
      ],
      color: '#00ff7f',
      icon: '🔧',
      category: 'technical'
    },
    {
      id: 'personal_data',
      title: 'Personal Data',
      description: 'Individual identification and background information',
      details: [
        'Name: Yogesh Bhosale',
        'Location: Vijayapur, Karnataka, India',
        'Education: BCA Graduate (CGPA: 9.13/10)',
        'Age: 21 years old',
        'Languages: English, Hindi, Kannada',
        'Interests: IoT, Web Development, Technology Innovation'
      ],
      color: '#ff6b6b',
      icon: '👤',
      category: 'personal'
    },
    {
      id: 'mission_statement',
      title: 'Mission Statement',
      description: 'Primary objectives and operational directives',
      details: [
        'Develop innovative IoT solutions for real-world problems',
        'Create user-centric web applications with modern technologies',
        'Bridge the gap between hardware and software integration',
        'Contribute to open-source development community',
        'Continuous learning and skill enhancement',
        'Build scalable and efficient digital solutions'
      ],
      color: '#ffa500',
      icon: '🎯',
      category: 'professional'
    },
    {
      id: 'current_status',
      title: 'Current Status',
      description: 'Active processes and ongoing operations',
      details: [
        'Status: Active Development Mode',
        'Current Role: Full-Stack Developer Intern',
        'Companies: INFOKSHETRA & MAGNUM INFORMATION DRIVEN',
        'Focus Areas: MERN Stack, IoT Integration',
        'Recent Projects: Smart AgroSense, EmergiGo, StreamFlix',
        'Next Objective: Advanced React.js & IoT Specialization'
      ],
      color: '#9d4edd',
      icon: '📊',
      category: 'professional'
    },
    {
      id: 'education_matrix',
      title: 'Education Matrix',
      description: 'Academic credentials and learning achievements',
      details: [
        'Bachelor of Computer Applications (BCA) - 2024',
        'Institution: A.S.Patil College, Vijayapur',
        'CGPA: 9.13/10 (Distinction)',
        'Pre-University Course (PUC) - 2021: 78.33%',
        'SSLC - 2019: 85.44%',
        'Specialized Training: MERN Stack, IoT Development'
      ],
      color: '#00d4aa',
      icon: '🎓',
      category: 'academic'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Systems', color: '#00d4ff' },
    { id: 'personal', name: 'Personal', color: '#ff6b6b' },
    { id: 'technical', name: 'Technical', color: '#00ff7f' },
    { id: 'academic', name: 'Academic', color: '#00d4aa' },
    { id: 'professional', name: 'Professional', color: '#9d4edd' }
  ];

  const filteredData = categoryFilter === 'all' 
    ? aboutData 
    : aboutData.filter(item => item.category === categoryFilter);

  return (
    <>
      <AnimatedBackground />
      <AboutContainer>
        <Header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Title>System Profile</Title>
          <Subtitle>
            🎵 Personal data fragments reconstructing... Click geometric patterns to access detailed information about my background, skills, and objectives.
          </Subtitle>
        </Header>

        <CategoryFilter>
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              $isActive={categoryFilter === category.id}
              $color={category.color}
              onClick={() => setCategoryFilter(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </CategoryFilter>

        <GeometryGrid>
          {filteredData.map((section, index) => (
            <MorphingCard
              key={section.id}
              $isActive={activeSection === section.id}
              $color={section.color}
              $shapeIndex={index}
              onClick={() => setActiveSection(
                activeSection === section.id ? null : section.id
              )}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                rotateX: 2,
              }}
              transition={{ duration: 0.3 }}
            >
              <MorphingShape
                $isActive={activeSection === section.id}
                $color={section.color}
                $shapeIndex={index}
              />
              
              <CircuitPattern 
                $isActive={activeSection === section.id} 
                $color={section.color} 
              />
              
              <ShapeIcon
                $isActive={activeSection === section.id}
                $color={section.color}
              >
                {section.icon}
              </ShapeIcon>
              
              <AnimatePresence>
                {activeSection === section.id && (
                  <ContentOverlay
                    $isActive={activeSection === section.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ContentTitle>{section.title}</ContentTitle>
                    <ContentDescription>{section.description}</ContentDescription>
                    <DetailsList>
                      {(section.details ?? []).map((detail, i) => (
                        <DetailItem key={i} $color={section.color}>
                          {detail}
                        </DetailItem>
                      ))}
                    </DetailsList>
                  </ContentOverlay>
                )}
              </AnimatePresence>
            </MorphingCard>
          ))}
        </GeometryGrid>
      </AboutContainer>
    </>
  );
};

export default AboutMorphing;

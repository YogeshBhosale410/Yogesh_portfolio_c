import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AnimatedBackground from '../components/AnimatedBackground';

const Container = styled(motion.div)`
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  font-family: 'Courier New', monospace;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #00ff7f;
  margin-bottom: 3rem;
  text-align: center;
  font-family: 'Courier New', monospace;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const CategoryTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillItem = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const SkillName = styled.div`
  color: #ffffff;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillLevel = styled.span`
  color: #00ff7f;
  font-size: 0.9rem;
`;

const SkillBar = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const SkillProgress = styled(motion.div)<{ level: number }>`
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #00ff7f);
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const PopupCard = styled(motion.div)`
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  border: 2px solid #00d4ff;
  border-radius: 20px;
  padding: 3rem;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 0 50px rgba(0, 212, 255, 0.6);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00d4ff, #00ff7f, #00d4ff, #00ff7f);
    border-radius: 20px;
    z-index: -1;
    animation: borderSpin 3s linear infinite;
  }
  
  @keyframes borderSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SpinningIcon = styled(motion.div)`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
  animation: machineSpin 2s ease-in-out infinite;
  
  @keyframes machineSpin {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(90deg) scale(1.1); }
    50% { transform: rotate(180deg) scale(1.2); }
    75% { transform: rotate(270deg) scale(1.1); }
  }
`;

const PopupTitle = styled.h3`
  color: #00d4ff;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
`;

const PopupContent = styled.div`
  color: #ffffff;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
  text-align: left;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 107, 107, 0.2);
  border: 1px solid rgba(255, 107, 107, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #ff6b6b;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 107, 107, 0.3);
    transform: rotate(90deg);
  }
`;

const skillsData = [
  {
    category: "🖥️ Frontend Development",
    icon: "🖥️",
    skills: [
      { name: "React.js", level: 60 },
      { name: "JavaScript", level: 65 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "Responsive Design", level: 80 }
    ],
    details: "FRONTEND DEVELOPMENT SPECIFICATIONS:\n\n🖥️ CORE TECHNOLOGIES:\n• React.js (60%) - Component-based architecture\n• JavaScript (65%) - ES6+ features and DOM manipulation\n• HTML (90%) - Semantic markup and accessibility\n• CSS (85%) - Flexbox, Grid, animations\n• Responsive Design (80%) - Mobile-first approach\n\n🎨 DESIGN CAPABILITIES:\n• Modern UI/UX implementation\n• Cross-browser compatibility\n• Performance optimization\n• Interactive animations\n• Component reusability\n\n🛠️ DEVELOPMENT TOOLS:\n• VS Code with extensions\n• Browser DevTools\n• Responsive testing\n• Code debugging\n\n🎵 Loading music... Frontend systems operational!"
  },
  {
    category: "⚙️ Backend Development",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 60 },
      { name: "Express.js", level: 60 },
      { name: "Python (Intermediate)", level: 75 },
      { name: "REST APIs", level: 65 },
      { name: "C Programming", level: 70 }
    ],
    details: "BACKEND DEVELOPMENT SPECIFICATIONS:\n\n⚙️ SERVER TECHNOLOGIES:\n• Node.js (60%) - Server-side JavaScript runtime\n• Express.js (60%) - Web application framework\n• Python (75%) - Automation and AI applications\n• REST APIs (65%) - RESTful service design\n• C Programming (70%) - System-level programming\n\n📊 API DEVELOPMENT:\n• RESTful service architecture\n• JSON data handling\n• Authentication systems\n• Error handling\n• Middleware implementation\n\n🔒 SECURITY FEATURES:\n• Input validation\n• Authentication tokens\n• Data sanitization\n• CORS handling\n\n🎵 Loading music... Backend systems active!"
  },
  {
    category: "🗄️ Database & Cloud",
    icon: "🗄️",
    skills: [
      { name: "MySQL (Basic)", level: 55 },
      { name: "Database Design", level: 60 },
      { name: "Data Management", level: 65 },
      { name: "SQL Queries", level: 50 }
    ],
    details: "DATABASE & CLOUD SPECIFICATIONS:\n\n🗄️ DATABASE SYSTEMS:\n• MySQL (55%) - Relational database management\n• Database Design (60%) - Schema planning\n• Data Management (65%) - CRUD operations\n• SQL Queries (50%) - Data retrieval and manipulation\n• Loading music... (100%) - Entertainment system\n\n📊 DATA OPERATIONS:\n• Table relationships\n• Data normalization\n• Query optimization\n• Backup strategies\n• Data integrity\n\n☁️ CLOUD READINESS:\n• Database migration\n• Scalability planning\n• Performance monitoring\n\n🎵 Loading music... Database systems synchronized!"
  },
  {
    category: "🤖 IoT & Hardware",
    icon: "🤖",
    skills: [
      { name: "ESP32", level: 85 },
      { name: "LoRa Communication", level: 80 },
      { name: "Sensors & Actuators", level: 90 },
      { name: "Microcontrollers", level: 85 },
      { name: "Circuit Design", level: 75 }
    ],
    details: "IoT & HARDWARE SPECIFICATIONS:\n\n🤖 MICROCONTROLLER SYSTEMS:\n• ESP32 (85%) - WiFi/Bluetooth microcontroller\n• LoRa Communication (80%) - Long-range wireless\n• Sensors & Actuators (90%) - Environmental monitoring\n• Microcontrollers (85%) - Embedded programming\n• Circuit Design (75%) - Hardware integration\n\n📶 COMMUNICATION PROTOCOLS:\n• WiFi connectivity\n• Bluetooth integration\n• LoRa long-range\n• Serial communication\n• I2C and SPI protocols\n\n🌡️ SENSOR INTEGRATION:\n• Temperature/Humidity sensors\n• Soil moisture detection\n• Motion sensors\n• GPS modules\n\n🎵 Loading music... IoT systems operational!"
  },
  {
    category: "🔧 Tools & Technologies",
    icon: "🔧",
    skills: [
      { name: "Git/GitHub", level: 70 },
      { name: "VS Code", level: 90 },
      { name: "OpenCV (Python)", level: 65 },
      { name: "Weather APIs", level: 70 },
      { name: "Web Development", level: 75 }
    ],
    details: "TOOLS & TECHNOLOGIES SPECIFICATIONS:\n\n🔧 DEVELOPMENT TOOLS:\n• Git/GitHub (70%) - Version control and collaboration\n• VS Code (90%) - Primary development environment\n• OpenCV (65%) - Computer vision and image processing\n• Weather APIs (70%) - External service integration\n• Web Development (75%) - Full-stack capabilities\n\n💻 PRODUCTIVITY SUITE:\n• Code debugging and testing\n• Extension management\n• Terminal integration\n• Git workflow\n• Project management\n\n🔍 SPECIALIZED TOOLS:\n• Image processing libraries\n• API testing tools\n• Documentation generators\n• Performance analyzers\n\n🎵 Loading music... Development environment optimized!"
  },
  {
    category: "🎆 Soft Skills & Interests",
    icon: "🎆",
    skills: [
      { name: "Problem-Solving", level: 85 },
      { name: "Team Collaboration", level: 90 },
      { name: "Time Management", level: 80 },
      { name: "Learning New Tech", level: 95 },
      { name: "Watching Tech Videos", level: 100 }
    ],
    details: "SOFT SKILLS & INTERESTS SPECIFICATIONS:\n\n🎆 CORE COMPETENCIES:\n• Problem-Solving (85%) - Analytical thinking\n• Team Collaboration (90%) - Effective communication\n• Time Management (80%) - Project prioritization\n• Learning New Tech (95%) - Continuous improvement\n• Watching Tech Videos (100%) - Knowledge consumption\n\n🤝 COLLABORATION SKILLS:\n• Active listening\n• Knowledge sharing\n• Constructive feedback\n• Conflict resolution\n• Team leadership\n\n📚 LEARNING APPROACH:\n• Self-directed learning\n• Online course completion\n• Technical documentation\n• Hands-on experimentation\n• Community engagement\n\n🎵 Loading music... Personal development systems active!"
  }
];

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof skillsData[0] | null>(null);

  const handleCategoryClick = (category: typeof skillsData[0]) => {
    setSelectedCategory(category);
  };

  const closePopup = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <AnimatedBackground />
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        ⚙️ SYSTEM.SKILLS
      </Title>
      
      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        &gt; Analyzing technical capabilities...
      </Subtitle>

      <SkillsGrid>
        {skillsData.map((category, categoryIndex) => (
          <SkillCategory
            key={categoryIndex}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + categoryIndex * 0.1, duration: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 40px rgba(0, 212, 255, 0.3)"
            }}
            onClick={() => handleCategoryClick(category)}
          >
            <CategoryTitle>{category.category}</CategoryTitle>
            
            {category.skills.map((skill, skillIndex) => (
              <SkillItem
                key={skillIndex}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.05, 
                  duration: 0.6 
                }}
              >
                <SkillName>
                  <span>{skill.name}</span>
                  <SkillLevel>{skill.level}%</SkillLevel>
                </SkillName>
                <SkillBar>
                  <SkillProgress
                    level={skill.level}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ 
                      delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05,
                      duration: 1,
                      ease: "easeOut"
                    }}
                  />
                </SkillBar>
              </SkillItem>
            ))}
          </SkillCategory>
        ))}
      </SkillsGrid>

      {selectedCategory && (
        <PopupOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        >
          <PopupCard
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0, rotateY: -180 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={closePopup}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            
            <SpinningIcon>{selectedCategory.icon}</SpinningIcon>
            <PopupTitle>{selectedCategory.category}</PopupTitle>
            <PopupContent>
              {(selectedCategory.details ?? '').split('\n').map((line, index) => (
                <div key={index} style={{ marginBottom: '0.5rem' }}>
                  {line}
                </div>
              ))}
            </PopupContent>
          </PopupCard>
        </PopupOverlay>
      )}
      </Container>
    </>
  );
};

export default Skills;

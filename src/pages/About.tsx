import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupCard = styled(motion.div)`
  background: #1a1a2e;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  border: 1px solid #00ff7f;
  position: relative;
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
`;

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
  z-index: 1001;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SpinningIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PopupTitle = styled.h2`
  color: #00ff7f;
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  margin-bottom: 1rem;
  text-align: center;
`;

const PopupContent = styled.div`
  color: #fff;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  margin-top: 1rem;
  text-align: left;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-family: 'Courier New', monospace;
  background: linear-gradient(45deg, #00d4ff, #00ff7f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
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
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
  box-sizing: border-box;
`;

const InfoCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  will-change: transform;
  transform: translateZ(0);
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #00ff7f;
  font-family: 'Courier New', monospace;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CardContent = styled.div`
  font-size: 1rem;
  color: #fff;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled(motion.li)`
  color: #00ff7f;
  padding: 0.5rem 0;
  font-family: 'Courier New', monospace;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0.3rem 0;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem 0;
    font-size: 0.8rem;
  }
  
  &::before {
    content: '▶';
    color: #00d4ff;
    margin-right: 0.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem auto 0;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
`;

const StatCard = styled(motion.div)`
  background: rgba(0, 255, 127, 0.1);
  border: 1px solid rgba(0, 255, 127, 0.3);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;
  will-change: transform;
  transform: translateZ(0);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #00ff7f;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const StatLabel = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const cardData = [
  {
    id: 'core',
    icon: '🔧',
    title: 'CORE_FUNCTIONS',
    content: 'BCA Graduate with a strong foundation in Python and growing skills in the MERN stack. Passionate about AI, IoT, and full-stack development, with hands-on experience in real-world projects. Currently focusing on AI-driven MERN development while using Python for automation and smart solution building..',
    details: 'SYSTEM SPECIFICATIONS:\n\n• Education: Bachelor of Computer Applications\n• CGPA: 9.13/10 (Excellent Performance)\n• Core Competencies: IoT Development, Web Applications\n• Current Status: Active Internships\n• Learning Mode: Continuous Upgrade\n\nSystem optimized for innovation!'
  },
  {
    id: 'tech',
    icon: '⚡',
    title: 'TECHNICAL_SPECS',
    content: 'Frontend: React.js, HTML, CSS, JavaScript\nBackend: Node.js, Express.js, Python\nDatabase: MySQL (Basic)\nIoT: ESP32, LoRa, Sensors, Microcontrollers',
    details: 'TECHNICAL SPECIFICATIONS:\n\n🖥️ FRONTEND SYSTEMS:\n• React.js - Component Architecture\n• HTML5/CSS3 - Responsive Design\n• JavaScript - Interactive Logic\n\n⚙️ BACKEND SYSTEMS:\n• Node.js - Server Runtime\n• Express.js - API Framework\n• Python - Automation & AI\n\n🗄️ DATABASE SYSTEMS:\n• MySQL - Relational Database\n• Data Management - Structured Storage\n\n🤖 IoT HARDWARE:\n• ESP32 - Microcontroller Programming\n• LoRa - Long Range Communication\n• Sensors - Environmental Monitoring\n\nAll systems operational!'
  },
  {
    id: 'mission',
    icon: '🎯',
    title: 'MISSION_STATEMENT',
    content: 'A collaborative team player with a strong growth mindset, eager to contribute to innovative tech environments. Focused on creating intelligent IoT solutions and web applications that solve real-world problems through automation and AI-driven approaches.',
    details: 'MISSION CONTROL:\n\n🎯 PRIMARY OBJECTIVES:\n• Bridge hardware-software gap\n• Create intelligent IoT solutions\n• Develop user-friendly applications\n• Solve real-world problems\n\n🤝 COLLABORATION PROTOCOL:\n• Team-oriented approach\n• Knowledge sharing mindset\n• Continuous learning culture\n• Innovation-driven solutions\n\n🚀 GROWTH TRAJECTORY:\n• Expanding MERN stack expertise\n• Advanced IoT implementations\n• AI-driven automation\n• Scalable system architecture\n\nMission parameters locked!'
  },
  {
    id: 'status',
    icon: '🚀',
    title: 'CURRENT_STATUS',
    content: 'CCurrently working as an R&D Embedded Intern at Elena Geo Pvt. Ltd., contributing to real-world projects through research, development, and prototyping of innovative embedded solutions. I consistently learn new technologies, explore tech content, and stay updated while enjoying music during my free time..',
    details: 'SYSTEM STATUS REPORT:\n\n💼 ACTIVE INTERNSHIPS:\n• INFOKSHETRA TECHNOLOGY\n  └─ College Grievance Management System\n  └─ MERN Stack Implementation\n  └─ User Authentication & Security\n\n• MAGNUM INFORMATION DRIVEN\n  └─ SMART AGROSENSE IoT Project\n  └─ ESP32 & LoRa Integration\n  └─ Weather API & Automation\n\n📚 CONTINUOUS LEARNING:\n• New Technology Exploration\n• Tech Video Consumption\n• Music Streaming Active\n• Skill Enhancement Mode\n\n⚡ SYSTEM UPTIME: 24/7\nStatus: Fully Operational!'
  }
];

const AboutContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  background: transparent;
  padding: 1rem;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const About: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<typeof cardData[0] | null>(null);

  const handleCardClick = (card: typeof cardData[0]) => {
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <AnimatedBackground />
      <AboutContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        🤖 SYSTEM.ABOUT_ME
      </Title>
      
      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        &gt; Initializing personal data retrieval...
      </Subtitle>

      <ContentGrid>
        {cardData.map((card, index) => (
          <InfoCard
            key={card.id}
            initial={{ 
              x: index % 2 === 0 ? -100 : 100, 
              y: index > 1 ? 100 : 0, 
              opacity: 0 
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: index % 2 === 0 ? 10 : -10,
              rotateX: index > 1 ? 5 : -5
            }}
            onClick={() => handleCardClick(card)}
          >
            <CardTitle>{card.icon} {card.title}</CardTitle>
            <CardContent>
              {card.id === 'tech' ? (
                <SkillsList>
                  {card.content.split('\n').map((skill, skillIndex) => (
                    <SkillItem
                      key={skillIndex}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 + skillIndex * 0.1, duration: 0.5 }}
                    >
                      {skill}
                    </SkillItem>
                  ))}
                </SkillsList>
              ) : (
                card.content
              )}
            </CardContent>
          </InfoCard>
        ))}
      </ContentGrid>

      <StatsGrid>
        <StatCard
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
        >
          <StatNumber>5+</StatNumber>
          <StatLabel>Projects Completed</StatLabel>
        </StatCard>
        
        <StatCard
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
        >
          <StatNumber>project</StatNumber>
          <StatLabel>Experience</StatLabel>
        </StatCard>
        
        <StatCard
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
        >
          <StatNumber>10+</StatNumber>
          <StatLabel>Technologies</StatLabel>
        </StatCard>
        
        <StatCard
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
        >
          <StatNumber>24/7</StatNumber>
          <StatLabel>Learning Mode</StatLabel>
        </StatCard>
      </StatsGrid>

      {selectedCard && (
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
            
            <SpinningIcon>{selectedCard.icon}</SpinningIcon>
            <PopupTitle>{selectedCard.title}</PopupTitle>
            <PopupContent>
              {(selectedCard.details ?? '').split('\n').map((line, index) => (
                <div key={index} style={{ marginBottom: '0.5rem' }}>
                  {line}
                </div>
              ))}
            </PopupContent>
          </PopupCard>
        </PopupOverlay>
      )}
      </AboutContainer>
    </>
  );
};

export default About;

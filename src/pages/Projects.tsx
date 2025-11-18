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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ProjectTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 127, 0.2);
  color: #00ff7f;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 127, 0.3);
  font-family: 'Courier New', monospace;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  color: #00d4ff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: #00d4ff;
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

const projects = [
  {
    id: 1,
    title: "🌾 SMART AGROSENSE: LoRa-Based Smart Irrigation",
    description: "IoT-based system using ESP32, soil moisture sensors, and real-time weather data to optimize irrigation. Features LoRa-based remote pump control and a web dashboard for monitoring and AI-driven water efficiency.",
    tech: ["ESP32", "LoRa", "HTML", "Sensors", "Weather API"],
    github: "https://github.com/YogeshBhosale410",
    demo: "#",
    icon: "🌾",
    details: "PROJECT SPECIFICATIONS:\n\n🌾 SMART AGROSENSE SYSTEM:\n• ESP32 Microcontroller Integration\n• Soil Moisture Sensor Network\n• Real-time Weather Data Processing\n• LoRa Long-Range Communication\n• Remote Water Pump Control\n\n📊 MONITORING DASHBOARD:\n• Live Sensor Data Visualization\n• Weather API Integration\n• AI-driven Water Efficiency\n• Automated Irrigation Scheduling\n• Mobile-Responsive Interface\n\n⚡ TECHNICAL FEATURES:\n• Low Power Consumption Design\n• Wireless Sensor Communication\n• Cloud Data Storage\n• Alert System Implementation\n• Energy-Efficient Operations\n\nAgricultural automation active!"
  },
  {
    id: 2,
    title: "🚑 EmergiGo:",
    description: "Developed an IoT and AI-based intelligent traffic signal system that prioritizes emergency vehicles and dynamically manages traffic based on vehicle density, reducing congestion and delays.",
    tech: ["React", "Node.js", "GPS API", "Real-time DB"],
    github: "https://github.com/YogeshBhosale410",
    demo: "#",
    icon: "🚑",
    details: "PROJECT SPECIFICATIONS:\n\n🚑 EMERGENCY RESPONSE SYSTEM:\n• Real-time Location Tracking\n• Instant Emergency Alerts\n• Multi-service Integration\n• GPS-based Service Finder\n• Emergency Contact Management\n\n🏥 SERVICE CONNECTIONS:\n• Hospital Network Integration\n• Police Station Connectivity\n• Fire Department Links\n• Ambulance Service Coordination\n• 24/7 Emergency Hotlines\n\n📱 USER FEATURES:\n• One-Touch Emergency Button\n• Live Location Sharing\n• Emergency History Tracking\n• Family Notification System\n• Offline Emergency Mode\n\nEmergency systems ready!"
  },
  {
    id: 3,
    title: "🎥 StreamFlix: Movie Streaming Platform",
    description: "Netflix-inspired streaming platform with user authentication, movie browsing, watchlist management, and responsive design. Built with modern web technologies.",
    tech: ["React", "CSS3", "JavaScript", "API Integration"],
    github: "https://github.com/YogeshBhosale410",
    demo: "#",
    icon: "🎥",
    details: "PROJECT SPECIFICATIONS:\n\n🎥 STREAMING PLATFORM:\n• Netflix-Inspired UI Design\n• Movie Database Integration\n• User Authentication System\n• Personalized Recommendations\n• Advanced Search Functionality\n\n📺 CONTENT MANAGEMENT:\n• Dynamic Movie Browsing\n• Genre-based Categorization\n• Watchlist Management\n• Recently Watched Tracking\n• Rating & Review System\n\n📱 RESPONSIVE DESIGN:\n• Mobile-First Approach\n• Cross-Device Compatibility\n• Smooth Video Playback\n• Adaptive Streaming Quality\n• Offline Download Support\n\nEntertainment system active!"
  },
  {
    id: 4,
    title: "🏫 College Grievance Management App",
    description: "MERN stack application for managing student grievances with user authentication, complaint tracking, admin dashboard, and automated notifications. Currently under development at INFOKSHETRA TECHNOLOGY.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    github: "https://github.com/YogeshBhosale410",
    demo: "#",
    icon: "🏫",
    details: "PROJECT SPECIFICATIONS:\n\n🏫 GRIEVANCE MANAGEMENT:\n• Student Complaint Portal\n• Multi-level Approval System\n• Real-time Status Tracking\n• Automated Notifications\n• Priority-based Categorization\n\n📊 ADMIN DASHBOARD:\n• Complaint Analytics\n• Department-wise Reports\n• Response Time Monitoring\n• User Management System\n• Performance Metrics\n\n🔒 SECURITY FEATURES:\n• JWT Authentication\n• Role-based Access Control\n• Data Encryption\n• Secure File Uploads\n• Audit Trail Logging\n\n🏢 CURRENT STATUS:\n• Under Development at INFOKSHETRA\n• MERN Stack Implementation\n• Beta Testing Phase\n\nEducational system optimizing!"
  },
  {
    id: 5,
    title: "📊 Python Data Science Projects",
    description: "Collection of data analysis and visualization projects including sales analysis, customer segmentation, and predictive modeling using Python libraries.",
    tech: ["Python", "Pandas", "Matplotlib", "NumPy", "Jupyter"],
    github: "https://github.com/YogeshBhosale410",
    demo: "#",
    icon: "📊",
    details: "PROJECT SPECIFICATIONS:\n\n📊 DATA SCIENCE PORTFOLIO:\n• Sales Performance Analysis\n• Customer Segmentation Models\n• Predictive Analytics\n• Market Trend Analysis\n• Business Intelligence Reports\n\n🔍 ANALYSIS TECHNIQUES:\n• Statistical Data Analysis\n• Data Visualization\n• Machine Learning Models\n• Pattern Recognition\n• Correlation Analysis\n\n🛠️ PYTHON LIBRARIES:\n• Pandas - Data Manipulation\n• Matplotlib - Visualization\n• NumPy - Numerical Computing\n• Jupyter - Interactive Analysis\n• Scikit-learn - ML Models\n\n📈 PROJECT OUTCOMES:\n• Actionable Business Insights\n• Data-Driven Recommendations\n• Performance Optimization\n\nData processing complete!"
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
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
        💻 SYSTEM.PROJECTS
      </Title>
      
      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        &gt; Loading project database...
      </Subtitle>

      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 10,
              boxShadow: "0 15px 40px rgba(0, 212, 255, 0.4)"
            }}
            onClick={() => handleProjectClick(project)}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            
            <TechStack>
              {project.tech.map((tech, techIndex) => (
                <TechTag key={techIndex}>{tech}</TechTag>
              ))}
            </TechStack>
            
            <ProjectLinks>
              <ProjectLink
                href={project.github}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📂 Code
              </ProjectLink>
              <ProjectLink
                href={project.demo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Demo
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      {selectedProject && (
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
            
            <SpinningIcon>{selectedProject.icon}</SpinningIcon>
            <PopupTitle>{selectedProject.title}</PopupTitle>
            <PopupContent>
              {(selectedProject.details ?? '').split('\n').map((line, index) => (
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

export default Projects;

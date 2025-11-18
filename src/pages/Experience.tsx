import React from 'react';
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

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #00d4ff, #00ff7f);
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isLeft: boolean }>`
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  ${props => props.isLeft ? 'right: 50%;' : 'left: 50%;'}
  ${props => props.isLeft ? 'padding-right: 2rem;' : 'padding-left: 2rem;'}
  
  @media (max-width: 768px) {
    width: calc(100% - 60px);
    left: 40px;
    padding-left: 1rem;
    padding-right: 0;
  }
`;

const TimelineMarker = styled.div<{ isLeft: boolean }>`
  position: absolute;
  top: 20px;
  ${props => props.isLeft ? 'right: -8px;' : 'left: -8px;'}
  width: 16px;
  height: 16px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
  
  @media (max-width: 768px) {
    left: -28px;
  }
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const JobTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
`;

const Company = styled.h4`
  color: #00ff7f;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
`;

const Duration = styled.p`
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.8;
  font-family: 'Courier New', monospace;
`;

const Description = styled.p`
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const Achievements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Achievement = styled.li`
  color: #ffffff;
  padding: 0.3rem 0;
  font-family: 'Courier New', monospace;
  position: relative;
  
  &::before {
    content: '▶';
    color: #00ff7f;
    margin-right: 0.5rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
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

const experiences = [
  {
    title: "Intern - Full Stack Development",
    company: "INFOKSHETRA TECHNOLOGY",
    duration: "Feb 2025 - Mar 2025",
    description: "Currently working on College Grievance App development with focus on user authentication and database management.",
    achievements: [
      "Developing college grievance management system",
      "Implementing user authentication and secure database handling",
      "Ensuring transparency in grievance resolution process",
      "Working with modern MERN stack technologies"
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL"]
  },
  {
    title: "Intern - IoT Developer",
    company: "MAGNUM INFORMATION DRIVEN",
    duration: "Feb 2025 - Apr 2025",
    description: "Developed SMART AGROSENSE: A LoRa-Based Smart Irrigation and Remote Water Pump Control System with IoT Integration.",
    achievements: [
      "Built IoT-based smart irrigation system using ESP32",
      "Implemented LoRa-based remote pump control",
      "Integrated real-time weather data for optimization",
      "Created web dashboard for monitoring and AI-driven efficiency"
    ],
    tech: ["ESP32", "LoRa", "HTML", "Sensors", "Weather API"]
  },
  {
    title: "Student Developer",
    company: "Personal Projects & Learning",
    duration: "2022 - Present",
    description: "Continuous learning and development of various projects while pursuing BCA degree.",
    achievements: [
      "Developed EmergiGo - Intelligent Traffic Signal System",
      "Created StreamFlix - Netflix Homepage Clone",
      "Built multiple IoT and web development projects",
      "Earned certifications in Python and C Programming"
    ],
    tech: ["Python", "IoT", "OpenCV", "HTML", "CSS"]
  },
  {
    title: "Academic Journey",
    company: "A.S.Patil College of Commerce, Vijayapur",
    duration: "2022 - 2025",
    description: "Pursuing Bachelor of Computer Applications with excellent academic performance and hands-on project experience.",
    achievements: [
      "Maintaining CGPA of 9.13 in BCA program",
      "Specialized in IoT, AI, and full-stack development",
      "Active participation in tech projects and learning",
      "Strong foundation in programming and problem-solving"
    ],
    tech: ["Python", "C Programming", "Web Technologies", "Database Management"]
  }
];

const Experience: React.FC = () => {
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
        💼 SYSTEM.EXPERIENCE
      </Title>
      
      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        &gt; Retrieving work history data...
      </Subtitle>

      <Timeline>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            isLeft={index % 2 === 0}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
          >
            <TimelineMarker isLeft={index % 2 === 0} />
            <ExperienceCard
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)"
              }}
            >
              <JobTitle>{exp.title}</JobTitle>
              <Company>🏢 {exp.company}</Company>
              <Duration>📅 {exp.duration}</Duration>
              <Description>{exp.description}</Description>
              
              <Achievements>
                {exp.achievements.map((achievement, achIndex) => (
                  <Achievement key={achIndex}>{achievement}</Achievement>
                ))}
              </Achievements>
              
              <TechStack>
                {exp.tech.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </TechStack>
            </ExperienceCard>
          </TimelineItem>
        ))}
      </Timeline>
      </Container>
    </>
  );
};

export default Experience;

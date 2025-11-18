import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AnimatedBackground from '../components/AnimatedBackground';

const Container = styled(motion.div)`
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.1) 0%, transparent 50%);
    pointer-events: none;
    will-change: transform;
    transform: translateZ(0);
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #00ff7f;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const EducationCard = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    transition: left 0.5s;
    will-change: transform;
    transform: translateZ(0);
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const DegreeTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Institution = styled.h4`
  color: #00ff7f;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
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
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Subjects = styled.div`
  margin-top: 1rem;
`;

const SubjectsTitle = styled.h5`
  color: #00d4ff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
`;

const SubjectsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.3rem;
`;

const SubjectItem = styled.li`
  color: #ffffff;
  padding: 0.2rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.1rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
  
  &::before {
    content: '▶';
    color: #00ff7f;
    margin-right: 0.5rem;
  }
`;

const CertificationsSection = styled.div`
  margin-top: 3rem;
  width: 100%;
  max-width: 1200px;
`;

const CertificationsTitle = styled(motion.h2)`
  color: #00d4ff;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CertificationCard = styled(motion.div)`
  background: rgba(0, 255, 127, 0.1);
  border: 1px solid rgba(0, 255, 127, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const CertificationName = styled.h4`
  color: #00ff7f;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CertificationIssuer = styled.p`
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
`;

const CertificationDate = styled.p`
  color: #00d4ff;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
`;

const educationData = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "A.S.Patil College of Commerce (Autonomous), Vijayapur",
    duration: "2022 - 2025",
    description: "Comprehensive study of computer applications including programming, web development, database management, and emerging technologies. Strong focus on practical implementation and project-based learning.",
    subjects: [
      "Python Programming",
      "C Programming Language",
      "Web Technologies",
      "Database Management Systems",
      "Data Structures & Algorithms",
      "Software Engineering",
      "Computer Networks",
      "Object-Oriented Programming",
    ]
  },
  {
    degree: "Pre-University Course (PUC) - Science",
    institution: "J A Comp PU College, Athani",
    duration: "2020 - 2022",
    description: "Focused on Physics, Chemistry, Mathematics, and Biology (PCMB), building a strong analytical and problem-solving foundation.",
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology"
    ]
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "KRES High School, Ainapur",
    duration: "2019 - 2020",
    description: "Completed high school education with strong performance across all subjects. Developed interest in technology and programming during this period.",
    subjects: [
      "Mathematics",
      "Science",
      "Social Studies",
      "English",
      "Kannada",
      "Hindi"
    ]
  }
];

const certifications = [
  {
    name: "Python 101 for Data Science",
    issuer: "Cognitive Class",
    date: "Aug 2024"
  },
  {
    name: "C Programming Language",
    issuer: "QSpiders Tuitions",
    date: "May 2023"
  },
  {
    name: "IoT & Embedded Systems",
    issuer: "College Projects",
    date: "2025"
  },
  {
    name: "Web Development Fundamentals",
    issuer: "Self-Learning",
    date: "2025"
  },
  {
    name: "MERN Stack Development",
    issuer: "Internship Training",
    date: "2025"
  },
  {
    name: "Loading",
    issuer: "_",
    date: "......"
  }
];

const Education: React.FC = () => {
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
        📚 SYSTEM.EDUCATION
      </Title>
      
      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        &gt; Loading academic records...
      </Subtitle>

      <ContentGrid>
        {educationData.map((edu, index) => (
          <EducationCard
            key={index}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)"
            }}
          >
            <DegreeTitle>🎓 {edu.degree}</DegreeTitle>
            <Institution>🏫 {edu.institution}</Institution>
            <Duration>📅 {edu.duration}</Duration>
            <Description>{edu.description}</Description>
            
            <Subjects>
              <SubjectsTitle>📖 Key Subjects:</SubjectsTitle>
              <SubjectsList>
                {edu.subjects.map((subject, subIndex) => (
                  <SubjectItem key={subIndex}>{subject}</SubjectItem>
                ))}
              </SubjectsList>
            </Subjects>
          </EducationCard>
        ))}
      </ContentGrid>

      <CertificationsSection>
        <CertificationsTitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          🏆 CERTIFICATIONS & ACHIEVEMENTS
        </CertificationsTitle>
        
        <CertificationsGrid>
          {certifications.map((cert, index) => (
            <CertificationCard
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 20px rgba(0, 255, 127, 0.3)"
              }}
            >
              <CertificationName>{cert.name}</CertificationName>
              <CertificationIssuer>{cert.issuer}</CertificationIssuer>
              <CertificationDate>{cert.date}</CertificationDate>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </CertificationsSection>
      </Container>
    </>
  );
};

export default Education;

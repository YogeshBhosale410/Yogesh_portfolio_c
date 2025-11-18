import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Simple background component as a fallback
const SimpleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
`;

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
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #00ff7f;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Courier New', monospace;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const ContactInfo = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
`;

const ContactForm = styled(motion.form)`
  background: rgba(0, 255, 127, 0.1);
  border: 1px solid rgba(0, 255, 127, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(0, 212, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.4);
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: #00d4ff;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  color: #00ff7f;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.3rem;
`;

const ContactValue = styled.div`
  color: #ffffff;
  font-family: 'Courier New', monospace;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #00ff7f;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 127, 0.3);
  border-radius: 6px;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ff7f;
    box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 127, 0.3);
  border-radius: 6px;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ff7f;
    box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 50%;
  color: #00d4ff;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: #00d4ff;
    transform: translateY(-3px);
  }
`;

const Contact: React.FC = () => {
  return (
    <>
      <SimpleBackground />
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
        ✉️ SYSTEM.CONTACT
      </Title>
      
      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        &gt; Establishing communication protocols...
      </Subtitle>

      <ContentWrapper>
        <ContactInfo
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SectionTitle>📡 COMMUNICATION_CHANNELS</SectionTitle>
          
          <ContactItem
            whileHover={{ scale: 1.02 }}
            onClick={() => window.open('mailto:bhosaleyogesh410@gmail.com')}
          >
            <ContactIcon>📧</ContactIcon>
            <ContactDetails>
              <ContactLabel>PRIMARY_EMAIL</ContactLabel>
              <ContactValue>bhosaleyogesh410@gmail.com</ContactValue>
            </ContactDetails>
          </ContactItem>

          <ContactItem
            whileHover={{ scale: 1.02 }}
            onClick={() => window.open('tel:+919113030410')}
          >
            <ContactIcon>📱</ContactIcon>
            <ContactDetails>
              <ContactLabel>DIRECT_LINE</ContactLabel>
              <ContactValue>+91-9113030410</ContactValue>
            </ContactDetails>
          </ContactItem>

          <ContactItem
            whileHover={{ scale: 1.02 }}
          >
            <ContactIcon>📍</ContactIcon>
            <ContactDetails>
              <ContactLabel>LOCATION</ContactLabel>
              <ContactValue>Vijayapur, Karnataka, India</ContactValue>
            </ContactDetails>
          </ContactItem>

          <ContactItem
            whileHover={{ scale: 1.02 }}
          >
            <ContactIcon>🕐</ContactIcon>
            <ContactDetails>
              <ContactLabel>RESPONSE_TIME</ContactLabel>
              <ContactValue>Within 24 hours</ContactValue>
            </ContactDetails>
          </ContactItem>

          <SocialLinks>
            <SocialLink
              href="https://github.com/YogeshBhosale410"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🐙
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/yogesh-71391231a"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              💼
            </SocialLink>
            <SocialLink
              href="mailto:bhosaleyogesh410@gmail.com"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ✉️
            </SocialLink>
            <SocialLink
              href="#"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              💬
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
      </ContentWrapper>
      </Container>
    </>
  );
};

export default Contact;

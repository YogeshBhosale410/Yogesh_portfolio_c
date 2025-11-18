import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid #00d4ff;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
`;

const Title = styled.h1`
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  font-size: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #00ff7f;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00d4ff;
  border-radius: 6px;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff7f;
    box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #00d4ff, #00ff7f);
  border: none;
  border-radius: 6px;
  color: #000;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 1rem;
  text-align: center;
  font-family: 'Courier New', monospace;
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token to localStorage
      if (!data?.token) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('adminToken', data.token);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>🔒 Admin Login</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">USERNAME</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username (admin)"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </SubmitButton>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

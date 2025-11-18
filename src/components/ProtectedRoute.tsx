import React, { useEffect, useState, ReactNode, FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ProtectedRouteProps {
  children: ReactNode;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0a0a0a;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
`;

const LoadingContainer = StyledDiv;

const ErrorContainer = styled(StyledDiv)`
  color: #ff6b6b;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  padding: 0 1rem;
`;

const RetryButton = styled.button`
  background: #00d4ff;
  color: #0a0a0a;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00b8e0;
    transform: translateY(-2px);
  }
`;

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }): ReactElement => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const ok = Boolean(token);
    setIsAuthenticated(ok);
    return ok;
  };

  useEffect(() => {
    const isAuth = checkAuth();
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  const handleRetry = () => {
    const isAuth = checkAuth();
    if (isAuth) {
      // no-op
    }
  };

  if (isAuthenticated === null) {
    return (
      <LoadingContainer>
        <span>🔐 Verifying authentication...</span>
      </LoadingContainer>
    ) as ReactElement;
  }

  // No error UI; simply gate by token presence

  return <>{children}</> as ReactElement;
};

export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'reactstrap';

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const checkAuth = () => {
    const accessToken = true;

      if (accessToken) {
        console.log('Access Token found. Navigating to Dashboard.');
        navigate('/dashboard');
      } else {
        console.log('No Access Token found. Navigating to Login.');
        navigate('/ahtu/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner color="primary" />
        <p className="ms-2">Loading...</p>
      </Container>
    );
  }

  return null;
};

export default HomePage;
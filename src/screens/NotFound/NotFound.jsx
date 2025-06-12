import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import notFoundImage from '../../assets/notfound-image.jpg'; 

const NotFound = () => {
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 h-100">
        <Col md="8" className="d-none d-md-flex flex-column justify-content-center align-items-center" style={{ flex: '2' }}>
          <img
            src={notFoundImage}
            alt="Page Not Found Illustration"
            className="img-fluid w-100 h-100 object-fit-cover"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </Col>

        <Col md="4" className="d-flex flex-column justify-content-center align-items-start bg-white p-5 text-center text-md-start">
          <h1 className="display-1 fw-bold mb-3" style={{ color: '#7b68ee' }}>404</h1>
          <h2 className="fs-3 mb-3 text-dark">Oops! Page not found.</h2>
          <p className="fs-6 mb-4 text-muted">
            The page you're looking for doesn't exist or has been moved.
            Don't worry, you can go back to the homepage.
          </p>
          <Link to="/">
            <Button
              className="py-2 px-4 fs-6"
              style={{ backgroundColor: '#7b68ee', borderColor: '#7b68ee' }}
            >
              Go to Homepage
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
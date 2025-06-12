import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import dashboardIllustration from "../../assets/dashboard-illustration.png";
import defaultAvatar from "../../assets/user-avatar.png";
import { logout } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      dispatch(logout());
      console.log("Logout success. Navigating to login...");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column p-0"
      style={{ backgroundColor: "#f8f9fa", overflowX: "hidden" }}
    >
      <Row
        className="flex-shrink-0 w-100 py-3 px-4 d-flex align-items-center justify-content-end m-0"
        style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "white" }}
      >
        <Col xs="auto" className="p-0">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            direction="down"
            offset={[-80, 100]}
          >
            <DropdownToggle
              tag="div"
              className="d-flex align-items-center position-relative"
              style={{ cursor: "pointer", padding: "0 8px" }}
            >
              <div className="position-relative">
                <img
                  src={defaultAvatar}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "36px", height: "36px", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#28a745",
                    borderRadius: "50%",
                    border: "1.5px solid white",
                  }}
                ></span>
              </div>
            </DropdownToggle>
            <DropdownMenu
              end
              className="shadow-sm border-0"
              style={{
                minWidth: "160px",
                padding: "0",
              }}
            >
              <DropdownItem divider className="my-1" />
              <DropdownItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="d-flex align-items-center py-2 px-3"
              >
                {isLoggingOut ? (
                  <>
                    <Spinner size="sm" className="me-2" /> Logging out...
                  </>
                ) : (
                  <>
                    Logout{" "}
                    <i
                      className="bi bi-box-arrow-right ms-2"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </>
                )}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="flex-grow-1 w-100 d-flex justify-content-center align-items-center m-0">
        <Col className="d-flex flex-column justify-content-center align-items-center text-center p-4">
          <h1 className="display-4 mb-3 text-dark">Welcome to Demo App</h1> [cite: Dashboard.png, Dashboard_Logout.png]
          <p className="lead text-muted mb-4">
            Manage your mobile app, cloud storage, and documents with ease.
          </p>
          <img
            src={dashboardIllustration}
            alt="Mobile App Illustration"
            className="img-fluid"
            style={{ maxWidth: "600px", height: "auto" }}
          />
          <p className="mt-5 text-muted" style={{ fontSize: "0.8rem" }}>
            COPYRIGHT © 2020
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;

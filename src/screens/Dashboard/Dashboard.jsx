import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
        <Col xs="auto" className="">
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
              <div className="mt-2 mx-2 text-center">
                <div style={{ fontWeight: "500", color: "#444", fontSize: "1rem" }}>
                  {user?.firstName + " " + user?.lastName || "Unknown User"}
                </div>
                <div style={{ color: "#bbb", fontSize: "0.9rem" }}>
                  Available
                </div>
              </div>
              <div className="position-relative">
                <img
                  src={defaultAvatar}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "36px", height: "36px", objectFit: "cover" }}
                />

              </div>
            </DropdownToggle>
            <DropdownMenu
              end
              className="shadow-sm border-0"
              style={{
                minWidth: "120px",
                padding: "0",
                marginTop: 65,
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
          <h1 className="display-4 mb-3 text-dark">Welcome to Demo App</h1>
          <img
            src={dashboardIllustration}
            alt="Mobile App Illustration"
            className="img-fluid"
            style={{ maxWidth: "600px", height: "auto" }}
          />
          <div className="position-absolute start-0 bottom-0 ps-3 pb-2 text-muted small">
            COPYRIGHT © 2020
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;

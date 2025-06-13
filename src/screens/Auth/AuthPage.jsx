import React, { useEffect } from "react";
import { Col } from "reactstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.png";
import signupImage from "../../assets/signup-image.png";
import SocialButtons from "../../components/SocialButtons";

const AuthLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const currentPath = location.pathname;

    if (currentPath === "/auth") {
      if (token) {
        navigate("/dashboard");
      } else {
        navigate("/auth/login");
      }
    }
  }, [location.pathname, navigate]);

  let imageToDisplay;
  if (currentPath === "/auth/login") {
    imageToDisplay = loginImage;
  } else if (currentPath === "/auth/signup") {
    imageToDisplay = signupImage;
  } else {
    imageToDisplay = "";
  }

  return (
    <div className="d-flex vh-100 font-sans-serif">
      <Col
        md="8"
        className="d-none d-md-flex flex-column justify-content-center align-items-center"
        style={{ flex: "2" }}
      >
        {imageToDisplay && (
          <img
            src={imageToDisplay}
            alt="Illustration"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        )}
      </Col>

      <Col
        md="4"
        className="d-flex flex-column justify-content-center align-items-start bg-white p-5"
      >
        <Outlet />{" "}
        <div className="text-center text-muted mb-4 w-100">
          <span>or</span>
        </div>
        <SocialButtons />
      </Col>
    </div>
  );
};

export default AuthLayout;

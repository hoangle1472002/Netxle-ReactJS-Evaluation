// src/layouts/AuthLayout.jsx
import React, { useEffect } from "react";
import { Col } from "reactstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Import useLocation

// Import cả hai hình ảnh vào AuthLayout
import loginImage from "../../assets/login-image.png"; // Đảm bảo đường dẫn này đúng
import signupImage from "../../assets/signup-image.png"; // Đảm bảo đường dẫn này đúng
import SocialButtons from "../../components/SocialButtons";

const AuthLayout = () => {
  const location = useLocation(); // Lấy đối tượng location từ React Router
  const currentPath = location.pathname; // Lấy đường dẫn hiện tại
    const navigate = useNavigate();

  const accessToken = true;

  // ✅ Kiểm tra nếu đang ở /auth thì redirect
  useEffect(() => {
    if (currentPath === "/auth") {
      if (accessToken) {
        navigate("/dashboard");
      } else {
        navigate("/auth/login");
      }
    }
  }, [currentPath, accessToken, navigate]);


  // Xác định hình ảnh sẽ hiển thị dựa trên đường dẫn
  let imageToDisplay;
  if (currentPath === "/auth/login") {
    imageToDisplay = loginImage;
  } else if (currentPath === "/auth/signup") {
    imageToDisplay = signupImage;
  } else {
    // Trường hợp không khớp với /login hay /signup (có thể là fallback hoặc lỗi)
    imageToDisplay = ""; // Hoặc một ảnh placeholder mặc định
  }

  return (
    <div className="d-flex vh-100 font-sans-serif">
      {/* Left section for the image */}
      <Col
        md="8"
        className="d-none d-md-flex flex-column justify-content-center align-items-center"
        style={{ flex: "2" }}
      >
        {imageToDisplay && ( // Chỉ render ảnh nếu có imageToDisplay
          <img
            src={imageToDisplay}
            alt="Illustration"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        )}
      </Col>

      {/* Right section for form/content */}
      <Col
        md="4"
        className="d-flex flex-column justify-content-center align-items-start bg-white p-5"
      >
        <Outlet />{" "}
        {/* This is where Login.jsx or Signup.jsx content will be rendered */}
        <div className="text-center text-muted mb-4 w-100">
          <span>or</span>
        </div>
        <SocialButtons />
      </Col>
    </div>
  );
};

export default AuthLayout;

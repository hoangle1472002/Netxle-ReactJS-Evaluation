import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { login } from "../../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { validateField, validateForm } from "../../../utils/validationUtils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFields = ["email", "password"];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (hasAttemptedSubmit) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasAttemptedSubmit(true);

    const { errors: newErrors, isValid: formFieldsAreValid } = validateForm(
      loginFields,
      formData
    );

    setErrors(newErrors);

    if (formFieldsAreValid) {
      try {
        await dispatch(login(formData));
        navigate("/dashboard")
      } catch (error) {
        console.error("Login error:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: error.message,
        }));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const hasFieldValidationErrors = () => {
    const fieldErrors = { ...errors };
    delete fieldErrors.api;
    return Object.values(fieldErrors).some((error) => error !== "");
  };

  const isLoginButtonDisabled =
    isSubmitting ||
    !formData.email ||
    !formData.password ||
    hasFieldValidationErrors();

  return (
    <>
      <h2 className="fs-4 mb-2 text-dark">
        Welcome to Entrance Test Interview!
      </h2>
      <p className="fs-6 mb-4 text-muted">
        Please sign-in to your account and start the adventure
      </p>

      <Form className="w-100 fs-6" onSubmit={handleSubmit} noValidate>
        {errors.api && <div className="text-danger mb-3">{errors.api}</div>}

        <FormGroup className="mb-3">
          <Label for="email" className="form-label text-dark fs-6">
            Email*
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </FormGroup>

        <FormGroup className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <Label for="password" className="form-label text-dark fs-6">
              Password*
            </Label>
            <a
              href="/"
              className="text-decoration-none fs-6"
              style={{ color: "#7b68ee" }}
            >
              Forgot Password?
            </a>
          </div>
          <Input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </FormGroup>

        <FormGroup check className="mb-4">
          <Input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="form-check-input"
            checked={rememberMe}
            onChange={handleChange}
          />
          <Label
            check
            for="rememberMe"
            className="form-check-label text-dark fs-6"
          >
            Remember me
          </Label>
        </FormGroup>

        <Button
          block
          className="mb-4 py-2 fs-6"
          style={{ backgroundColor: "#7b68ee", borderColor: "#7b68ee" }}
          type="submit"
          disabled={isLoginButtonDisabled}
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </Button>
      </Form>

      <p className="text-center text-muted mb-3 w-100 fs-6">
        New on our platform?{" "}
        <Link
          to="/auth/signup"
          className="text-decoration-none fw-bold"
          style={{ color: "#7b68ee" }}
        >
          Create an account
        </Link>
      </p>
    </>
  );
};

export default Login;

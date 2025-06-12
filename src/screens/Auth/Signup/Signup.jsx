import React, { useMemo, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {
  validateField,
  validateForm,
} from '../../../utils/validationUtils';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signupAndLogin } from "../../../redux/actions/authActions";
import { checkPasswordStrengthAndValidity, getPasswordStrengthColor } from "../../../utils/paswordUtils";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupFields = ["firstName", "lastName", "email", "password", "terms"];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setTermsAccepted(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "password") {
        setPasswordStrength(checkPasswordStrengthAndValidity(value));
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value, termsAccepted),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPasswordStrength(checkPasswordStrengthAndValidity(value));
    }

    if (hasAttemptedSubmit) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value, termsAccepted),
      }));
    }
  };

  const isSignupButtonDisabled = useMemo(() => {
    const fieldErrors = { ...errors };
    delete fieldErrors.api;

    return (
      isSubmitting ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      Object.values(fieldErrors).some((error) => error !== "") ||
      !termsAccepted
    );
  }, [isSubmitting, formData, errors, termsAccepted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasAttemptedSubmit(true);

    const { errors: newErrors, isValid: formIsValid } = validateForm(
      signupFields,
      formData,
      { termsAccepted }
    );

    setErrors(newErrors);

    if (formIsValid) {
      try {
        await dispatch(signupAndLogin(formData));
        navigate("/dashboard");
      } catch (error) {
        console.error("Signup/Login Error:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: error.message,
        }));
        console.log("error ", errors)
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      console.log("Form has validation errors, preventing submission.");
    }
  };


  return (
    <>
      <h2 className="fs-4 mb-2 text-dark">Adventure starts here</h2>
      <p className="fs-6 mb-4 text-muted">
        Make your app management easy and fun!
      </p>

      <Form className="w-100 fs-6" onSubmit={handleSubmit} noValidate>
        {errors.api && <div className="text-danger mb-3">{errors.api}</div>}

        <FormGroup className="mb-3">
          <Label for="firstName" className="form-label text-dark fs-6">
            Firstname*
          </Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="johndoe"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="lastName" className="form-label text-dark fs-6">
            Lastname*
          </Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="johndoe"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </FormGroup>

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
          <Label for="password" className="form-label text-dark fs-6">
            Password*
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password ? (
            <div
              className={`invalid-feedback ${getPasswordStrengthColor(
                errors.password
              )} d-block`}
            >
              {errors.password}
            </div>
          ) : (
            formData.password && (
              <small
                className={`form-text ${getPasswordStrengthColor(
                  passwordStrength
                )}`}
              >
                Password is {passwordStrength.toLowerCase()}.
              </small>
            )
          )}
        </FormGroup>

        <FormGroup check className="mb-4">
          <Input
            type="checkbox"
            id="agreeTerms"
            name="termsAccepted"
            className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
            checked={termsAccepted}
            onChange={handleChange}
          />
          <Label
            check
            for="agreeTerms"
            className="form-check-label text-dark fs-6"
          >
            I agree to{" "}
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "#7b68ee" }}
            >
              privacy policy
            </a>{" "}
            &{" "}
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "#7b68ee" }}
            >
              terms
            </a>
          </Label>
          {errors.terms && (
            <div className="invalid-feedback d-block">{errors.terms}</div>
          )}
        </FormGroup>

        <Button
          block
          style={{ backgroundColor: "#7b68ee", borderColor: "#7b68ee" }}
          className="mb-4 py-2 fs-6"
          type="submit"
          disabled={isSignupButtonDisabled}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </Form>

      <p className="text-center text-muted mb-3  w-100 fs-6">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-decoration-none fw-bold"
          style={{ color: "#7b68ee" }}
        >
          Sign in instead
        </Link>
      </p>
    </>

  );
};

export default Signup;

import { checkPasswordStrengthAndValidity } from "./paswordUtils";
import { EMAIL_REGEX, DIGIT_REGEX, SPECIAL_CHAR_REGEX, LETTER_REGEX } from "./regexUtils";

const validateFirstName = (value) => {
    if (!value) return "First name is required.";
    return "";
};

const validateLastName = (value) => {
    if (!value) return "Last name is required.";
    return "";
};

const validateEmail = (value) => {
    if (!value) return "Email is required.";
    if (!EMAIL_REGEX.test(value)) return "Email is not valid.";
    return "";
};

const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 6 || value.length > 18)
        return "The password must be between 6-18 characters.";

    if (
        !DIGIT_REGEX.test(value) ||
        !SPECIAL_CHAR_REGEX.test(value) ||
        !LETTER_REGEX.test(value)
    ) {
        return "The password must contain at least one digit, one special character, and one letter.";
    }

    const strength = checkPasswordStrengthAndValidity(value);
    if (strength !== "Strong") {
        return `Password is ${strength.toLowerCase()}.`;
    }

    return "";
};

const validateTerms = (accepted) => {
    if (!accepted) return "You must agree to privacy policy & terms.";
    return "";
};

export const validateField = (name, value, context = {}) => {
    switch (name) {
        case "firstName":
            return validateFirstName(value);
        case "lastName":
            return validateLastName(value);
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);
        case "terms":
            return validateTerms(context.termsAccepted || false);
        default:
            return "";
    }
};

export const validateForm = (fields, formData, context = {}) => {
    const errors = {};
    let isValid = true;

    fields.forEach((field) => {
        const error = validateField(field, formData[field], context);
        if (error) {
            errors[field] = error;
            isValid = false;
        }
    });

    if (fields.includes("terms")) {
        const termsError = validateField("terms", null, context);
        if (termsError) {
            errors.terms = termsError;
            isValid = false;
        }
    }

    return { errors, isValid };
};

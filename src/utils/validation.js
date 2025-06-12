export const checkPasswordStrengthAndValidity = (password) => {
    if (!password) return "";

    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isLengthValid = password.length >= 6 && password.length <= 18;

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (hasDigit) score++;
    if (hasSpecialChar) score++;
    if (hasLetter) score++;

    if (isLengthValid && hasDigit && hasSpecialChar && hasLetter && password.length >= 10) {
        return "Strong";
    } else if (score >= 4 && password.length >= 8) {
        return "Good";
    } else if (score >= 2 && password.length >= 6) {
        return "Fair";
    } else {
        return "Weak";
    }
};

export const validateField = (name, value, currentTermsAccepted) => {
    let error = "";
    switch (name) {
        case "firstName":
            if (!value) error = "First name is required.";
            break;
        case "lastName":
            if (!value) error = "Last name is required.";
            break;
        case "email":
            if (!value) {
                error = "Email is required.";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = "Email is not valid.";
            }
            break;
        case "password":
            if (!value) {
                error = "Password is required.";
            } else if (value.length < 6 || value.length > 18) {
                error = "The password must be between 6-18 characters.";
            } else if (
                !/[0-9]/.test(value) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                !/[a-zA-Z]/.test(value)
            ) {
                error = "The password must contain at least one digit, one special character, and one letter.";
            } else {
                const strength = checkPasswordStrengthAndValidity(value);
                if (strength !== "Strong") {
                    error = `Password is ${strength.toLowerCase()}.`;
                }
            }
            break;
        case "terms":
            if (!currentTermsAccepted)
                error = "You must agree to privacy policy & terms.";
            break;
        default:
            break;
    }
    return error;
};

export const validateForm = (currentFormData, currentTermsAccepted) => {
    let newErrors = {};
    let formIsValid = true;

    const fields = ["firstName", "lastName", "email", "password"];
    fields.forEach((field) => {
        const error = validateField(field, currentFormData[field], currentTermsAccepted);
        if (error) {
            newErrors[field] = error;
            formIsValid = false;
        }
    });

    const termsError = validateField("terms", null, currentTermsAccepted);
    if (termsError) {
        newErrors.terms = termsError;
        formIsValid = false;
    }

    return { newErrors, formIsValid };
};

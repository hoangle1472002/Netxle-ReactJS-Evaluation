export const getPasswordStrengthColor = (strengthOrError) => {
    const text = strengthOrError?.toLowerCase() || "";

    if (
        strengthOrError === "Weak" ||
        text.includes("weak") ||
        text.includes("required") ||
        text.includes("between 6-18") ||
        text.includes("digit, one special character, and one letter")
    )
        return "text-danger";

    if (strengthOrError === "Fair" || text.includes("fair"))
        return "text-warning";

    if (strengthOrError === "Good" || text.includes("good"))
        return "text-primary";

    if (strengthOrError === "Strong" || text.includes("strong"))
        return "text-success";

    return "text-muted";
};

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

import { DIGIT_REGEX, SPECIAL_CHAR_REGEX, LETTER_REGEX } from "./regexUtils";
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

    const hasDigit = DIGIT_REGEX.test(password);
    const hasSpecialChar = SPECIAL_CHAR_REGEX.test(password);
    const hasLetter = LETTER_REGEX.test(password);
    const length = password.length;

    const isLengthValid = length >= 6 && length <= 18;

    let score = 0;
    if (length >= 6) score++;
    if (length >= 10) score++;
    if (hasDigit) score++;
    if (hasSpecialChar) score++;
    if (hasLetter) score++;

    if (isLengthValid && hasDigit && hasSpecialChar && hasLetter && length >= 10) {
        return "Strong";
    } else if (score >= 4 && length >= 8) {
        return "Good";
    } else if (score >= 2 && length >= 6) {
        return "Fair";
    } else {
        return "Weak";
    }
};
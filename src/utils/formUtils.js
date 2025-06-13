export const hasFieldValidationErrors = (errors) => {
    if (!errors) return false;

    const { api, ...fieldErrors } = errors;
    return Object.values(fieldErrors).some((error) => error !== "");
};

export const isFormButtonDisabled = ({
    isSubmitting,
    formData,
    requiredFields = [],
    errors,
    extraConditions = [],
}) => {
    const hasErrors = hasFieldValidationErrors(errors);
    const areRequiredFieldsFilled = requiredFields.every((field) => formData[field]);
    requiredFields.forEach(field => {
        console.log(`${field}:`, formData[field]);
    });

    return isSubmitting || !areRequiredFieldsFilled || hasErrors || extraConditions.includes(false);
};

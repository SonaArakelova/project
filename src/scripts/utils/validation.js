
 export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export function validateNotEmpty(value, fieldName) {
    if (!value || value.trim() === "") {
        throw new ValidationError(`${fieldName} cannot be empty`);
    }
}

export function validateEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
        throw new ValidationError("Invalid email format");
    }
}


 export function validateIsNumber(value, fieldName) {
    if (isNaN(value)) {
        throw new ValidationError(`${fieldName} must be a number`);
    }
}



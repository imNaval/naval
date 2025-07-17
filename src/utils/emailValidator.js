// Comprehensive email validation utility

// List of common disposable email domains
const disposableDomains = [
    'tempmail.org', 'guerrillamail.com', '10minutemail.com', 'mailinator.com',
    'yopmail.com', 'temp-mail.org', 'sharklasers.com', 'getairmail.com',
    'mailnesia.com', 'trashmail.com', 'throwaway.email', 'tempr.email',
    'maildrop.cc', 'mailinator.net', 'guerrillamailblock.com', 'pokemail.net',
    'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com', 'fakeinbox.com',
    'mailmetrash.com', 'tempmailaddress.com', 'tmpmail.net', 'tmpeml.com',
    'sharklasers.com', 'grr.la', 'guerrillamail.biz', 'guerrillamail.de',
    'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com',
    'guerrillamail.com', 'guerrillamail.info', 'guerrillamail.org',
    'guerrillamailblock.com', 'guerrillamail.biz', 'guerrillamail.de',
    'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com',
    'guerrillamail.com', 'guerrillamail.info', 'guerrillamail.org'
];

// Basic email format validation
export const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Check if email domain is disposable
export const isDisposableEmail = (email) => {
    if (!email || !email.includes('@')) return false;
    const domain = email.split('@')[1].toLowerCase();
    return disposableDomains.includes(domain);
};

// Check if email domain has valid MX records (basic check)
export const checkDomainMX = async (email) => {
    if (!email || !email.includes('@')) return false;
    
    const domain = email.split('@')[1];
    
    try {
        // This is a basic check - in production, you might want to use a service
        // like Abstract API, Zero Bounce, or similar for more accurate validation
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
        const data = await response.json();
        
        return data.Answer && data.Answer.length > 0;
    } catch (error) {
        console.warn('Domain MX check failed:', error);
        return true; // Assume valid if check fails
    }
};

// Comprehensive email validation
export const validateEmail = async (email, options = {}) => {
    const { checkMX = false, checkDisposable = true } = options;
    
    // Basic format check
    if (!validateEmailFormat(email)) {
        return {
            isValid: false,
            message: "Please enter a valid email format",
            type: "format"
        };
    }
    
    // Check for disposable domains
    if (checkDisposable && isDisposableEmail(email)) {
        return {
            isValid: false,
            message: "Please use a valid email address (disposable emails not allowed)",
            type: "disposable"
        };
    }
    
    // Check domain MX records if requested
    if (checkMX) {
        const hasMX = await checkDomainMX(email);
        if (!hasMX) {
            return {
                isValid: false,
                message: "Email domain appears to be invalid",
                type: "domain"
            };
        }
    }
    
    return {
        isValid: true,
        message: "",
        type: "valid"
    };
};

// Real-time email validation (for input fields)
export const validateEmailRealTime = (email) => {
    // Only do basic checks for real-time validation
    if (!email) {
        return { isValid: true, message: "" }; // Allow empty for real-time
    }
    
    if (!validateEmailFormat(email)) {
        return {
            isValid: false,
            message: "Please enter a valid email format"
        };
    }
    
    if (isDisposableEmail(email)) {
        return {
            isValid: false,
            message: "Please use a valid email address"
        };
    }
    
    return { isValid: true, message: "" };
};

export default {
    validateEmail,
    validateEmailFormat,
    isDisposableEmail,
    checkDomainMX,
    validateEmailRealTime
}; 
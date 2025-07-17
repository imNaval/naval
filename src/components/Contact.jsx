import { useRef, useState } from "react"
import "../styles/contact.scss"
import { motion } from "framer-motion" // Used in JSX components below
import emailjs from '@emailjs/browser';
import { emailjs_PUBLIC_KEY, emailjs_SERVICE_ID, emailjs_TEMPLATE_ID } from "../utils/constants";
import { checkProfanity, isSpam } from "../utils/profanityFilter";
import { validateEmailRealTime, validateEmail } from "../utils/emailValidator";

const variants = {
    initial: {
        y: 0,
        opacity: 1,
    },
    animate:{
        y:0,
        opacity: 1,
        transition: {
            duration: 0.1,
            staggerChildren: 0.1,
        }
    }
}

// Name validation (alphabets only)
const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return { isValid: false, message: "Name can only contain alphabets and spaces" };
    }
    if (name.trim().length < 2) {
        return { isValid: false, message: "Name must be at least 2 characters long" };
    }
    return { isValid: true, message: "" };
};

// Input sanitization - different levels for different fields
const sanitizeInput = (input, fieldType = 'general') => {
    if (!input) return input;
    
    let sanitized = input.trim();
    
    // Basic XSS protection for all fields
    sanitized = sanitized
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, ''); // Remove event handlers
    
    // Apply field-specific sanitization
    switch (fieldType) {
        case 'name':
            // Only allow alphabets and spaces for name
            sanitized = sanitized.replace(/[^a-zA-Z\s]/g, '');
            break;
        case 'email':
            // Allow email characters
            sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, '');
            break;
        case 'message':
            // For message field: Allow ALL characters including spaces, line breaks, punctuation
            // Only remove the most dangerous HTML/script content
            // This ensures maximum flexibility for user input
            sanitized = sanitized
                .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
                .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframe tags
                .replace(/javascript:/gi, '') // Remove javascript protocol
                .replace(/on\w+=/gi, '') // Remove event handlers
                .replace(/</g, '&lt;') // Escape <
                .replace(/>/g, '&gt;'); // Escape >
            // Note: We intentionally preserve ALL spaces, line breaks (\n), and other characters
            break;
        default:
            // General sanitization - preserve spaces and most characters
            sanitized = sanitized
                .replace(/&(?!(amp|lt|gt|quot|apos|#x27|#x2F);)/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;');
    }
    
    return sanitized;
};

const Contact = () => {
    const ref = useRef(null)
    const formRef = useRef(null)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Special handling for message field to ensure spaces and line breaks are preserved
        let sanitizedValue;
        if (name === 'message') {
            // For message field, use minimal sanitization to preserve all user input
            sanitizedValue = value
                .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
                .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframe tags
                .replace(/javascript:/gi, '') // Remove javascript protocol
                .replace(/on\w+=/gi, '') // Remove event handlers
                .replace(/</g, '&lt;') // Escape <
                .replace(/>/g, '&gt;'); // Escape >
        } else {
            // For other fields, use the regular sanitization
            sanitizedValue = sanitizeInput(value, name);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue
        }));
        
        // Real-time validation for email
        if (name === 'email' && value) {
            const emailValidation = validateEmailRealTime(value);
            if (!emailValidation.isValid) {
                setValidationErrors(prev => ({
                    ...prev,
                    email: emailValidation.message
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    email: ''
                }));
            }
        } else {
            // Clear validation error when user starts typing
            if (validationErrors[name]) {
                setValidationErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };

    const validateForm = async () => {
        const errors = {};
        
        // Validate name
        const nameValidation = validateName(formData.name);
        if (!nameValidation.isValid) {
            errors.name = nameValidation.message;
        }
        
        // Validate email with comprehensive checks
        const emailValidation = await validateEmail(formData.email, {
            checkDisposable: true,
            checkMX: false // Set to true for production if you want domain validation
        });
        if (!emailValidation.isValid) {
            errors.email = emailValidation.message;
        }
        
        // Validate message
        if (!formData.message.trim()) {
            errors.message = "Message is required";
        } else if (formData.message.length < 10) {
            errors.message = "Message must be at least 10 characters long";
        } else {
            // Check for profanity and spam
            const profanityCheck = checkProfanity(formData.message);
            const spamCheck = isSpam(formData.message);
            
            if (profanityCheck.hasProfanity) {
                errors.message = profanityCheck.message;
            } else if (spamCheck) {
                errors.message = "Message appears to be spam";
            }
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        
        // Validate form before sending
        if (!validateForm()) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }
    
        try {
            await emailjs.sendForm(emailjs_SERVICE_ID, emailjs_TEMPLATE_ID, formRef.current, emailjs_PUBLIC_KEY);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.log(error.text);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

  return (
    <motion.div className='contact' id="contact"
        ref={ref}
        variants={variants}
        initial="animate"
        animate="animate"
    >
        <motion.div className="textContainer" variants={variants}>
            <h1>Let's Work Together</h1>

            <div className="itemContainer">
            <div className="item">
                <h2>Mail : </h2>
                <span>nehranvl2017@gmail.com</span>
            </div>
            <div className="item">
                <h2>Address : </h2>
                <span>udaipur, Rajasthan</span>
            </div>
            <div className="item">
                <h2>Phone</h2>
                <span>+91 6350431551</span>
            </div>
            </div>
        </motion.div>
        <motion.div className="formContainer">
            <motion.div className="phoneSvg" 
                initial={{opacity:1}} 
                whileInView={{opacity:0}} 
                transition={{ delay:3, duration: 1}}
            >
                <svg width="450px" height="450px" viewBox="0 0 32.666 32.666">
                    <motion.path
                    strokeWidth={0.2}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{pathLength: 1}}
                    transition={{ duration: 3 }}
                    d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
                    M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0
                    C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01
                    c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319
                    c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529
                    c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814
                    c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001
                    c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459
                    c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084
                    c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292
                    c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095
                    l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
                    C32.666,7.326,25.339,0,16.333,0z"
                    />
                </svg>
            </motion.div>
            <motion.form
                onSubmit={sendEmail}
                ref={formRef}
                initial={{opacity:0, y: 20}} 
                whileInView={{opacity:1, y: 0}} 
                transition={{ delay:3.5, duration: 1.5, ease: "easeOut"}}
            >
                <div className="input-group">
                    <input 
                        type="text" 
                        required 
                        placeholder="Name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={validationErrors.name ? 'error' : ''}
                    />
                    {validationErrors.name && <span className="error-message">{validationErrors.name}</span>}
                </div>
                
                <div className="input-group">
                    <input 
                        type="email" 
                        required 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={validationErrors.email ? 'error' : ''}
                    />
                    {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
                </div>
                
                <div className="input-group">
                    <textarea 
                        rows={8} 
                        placeholder="Message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={validationErrors.message ? 'error' : ''}
                    />
                    {validationErrors.message && <span className="error-message">{validationErrors.message}</span>}
                </div>
                
                <button type="submit">Send</button>

                {error && <div className="alert error">Please fix the errors above</div>}
                {success && <div className="alert success">Message sent successfully!</div>}

            </motion.form>
        </motion.div>
    </motion.div>
  )
}

export default Contact
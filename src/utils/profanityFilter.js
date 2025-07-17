// Comprehensive profanity filter
// This is a basic implementation - you can expand this list based on your needs

const profaneWords = [
    // Common profanities (censored for safety)
    'f***', 's***', 'a***', 'b***', 'c***', 'd***', 'p***', 't***',
    'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'pussy', 'tits',
    'bastard', 'whore', 'slut', 'cock', 'penis', 'vagina', 'boobs',
    
    // Spam and test words
    'spam', 'test', 'hello', 'hi', 'asdf', 'qwerty', '123456',
    'password', 'admin', 'user', 'guest', 'demo', 'sample',
    
    // Common spam phrases
    'buy now', 'click here', 'free money', 'make money fast',
    'work from home', 'earn money', 'get rich quick', 'lottery winner',
    'viagra', 'cialis', 'weight loss', 'diet pills', 'casino',
    
    // Suspicious patterns
    'http://', 'https://', 'www.', '.com', '.org', '.net',
    'bit.ly', 'tinyurl', 'goo.gl', 't.co',
    
    // Common bot/spam indicators
    'robot', 'bot', 'automated', 'script', 'program',
    'automatically', 'system', 'computer', 'machine',
    
    // Inappropriate content indicators
    'porn', 'sex', 'adult', 'xxx', 'nude', 'naked',
    'dating', 'hookup', 'escort', 'massage',
    
    // Threats and harassment
    'kill', 'death', 'murder', 'suicide', 'bomb', 'terrorist',
    'hate', 'racist', 'nazi', 'hitler', 'kkk',
    
    // Add more words as needed
];

// Enhanced profanity detection with context
export const checkProfanity = (text) => {
    if (!text || typeof text !== 'string') {
        return { hasProfanity: false, words: [], message: '' };
    }
    
    const lowerText = text.toLowerCase();
    const foundWords = [];
    
    // Check for exact word matches
    for (const word of profaneWords) {
        // Use word boundaries to avoid false positives
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        if (regex.test(lowerText)) {
            foundWords.push(word);
        }
    }
    
    // Check for common spam patterns
    const spamPatterns = [
        /[A-Z]{5,}/g, // Too many consecutive uppercase letters
        /\d{10,}/g,   // Too many consecutive numbers
        /[!@#$%^&*]{3,}/g, // Too many special characters
        /(.)\1{4,}/g, // Repeated characters (like 'aaaaa')
    ];
    
    for (const pattern of spamPatterns) {
        if (pattern.test(text)) {
            foundWords.push('suspicious_pattern');
        }
    }
    
    // Check for excessive repetition
    const words = text.split(/\s+/);
    const wordCount = {};
    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        if (cleanWord.length > 2) {
            wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
        }
    });
    
    const hasExcessiveRepetition = Object.values(wordCount).some(count => count > 3);
    if (hasExcessiveRepetition) {
        foundWords.push('excessive_repetition');
    }
    
    return {
        hasProfanity: foundWords.length > 0,
        words: foundWords,
        message: foundWords.length > 0 
            ? `Message contains inappropriate content or spam patterns` 
            : ''
    };
};

// Sanitize text by removing or replacing profane words
export const sanitizeText = (text) => {
    if (!text || typeof text !== 'string') {
        return text;
    }
    
    let sanitized = text;
    
    // Replace profane words with asterisks
    for (const word of profaneWords) {
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        sanitized = sanitized.replace(regex, '*'.repeat(word.length));
    }
    
    return sanitized;
};

// Check if text is likely spam
export const isSpam = (text) => {
    if (!text || typeof text !== 'string') {
        return false;
    }
    
    const lowerText = text.toLowerCase();
    
    // Check for common spam indicators
    const spamIndicators = [
        'buy now', 'click here', 'free money', 'make money fast',
        'work from home', 'earn money', 'get rich quick',
        'viagra', 'cialis', 'weight loss', 'diet pills',
        'lottery', 'winner', 'prize', 'claim your',
        'limited time', 'act now', 'don\'t miss out',
        'guaranteed', '100%', 'risk free', 'no obligation'
    ];
    
    for (const indicator of spamIndicators) {
        if (lowerText.includes(indicator)) {
            return true;
        }
    }
    
    // Check for excessive links
    const linkCount = (lowerText.match(/https?:\/\/|www\.|\.com|\.org|\.net/g) || []).length;
    if (linkCount > 2) {
        return true;
    }
    
    // Check for excessive capitalization
    const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (upperCaseRatio > 0.7 && text.length > 20) {
        return true;
    }
    
    return false;
};

export default {
    checkProfanity,
    sanitizeText,
    isSpam
}; 
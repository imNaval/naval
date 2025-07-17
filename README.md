# Naval Nehra - Portfolio

A modern React portfolio website showcasing my skills and experience as a Frontend Developer.

## Features

- Responsive design with modern UI/UX
- Contact form with EmailJS integration
- Comprehensive form validation
- Profanity and spam filtering
- Smooth animations with Framer Motion
- Mobile-friendly interface

## Environment Variables

This project uses environment variables for sensitive configuration. Create a `.env` file in the root directory with the following variables:

### EmailJS Configuration
Get these values from your [EmailJS dashboard](https://dashboard.emailjs.com/):
```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

### Contact Information
```
VITE_CONTACT_EMAIL=your_contact_email_here
VITE_RESUME_EMAIL=your_resume_email_here
```

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials
4. Run the development server: `npm run dev`
5. Build for production: `npm run build`

## Technologies Used

- React 19
- Vite
- EmailJS
- Framer Motion
- SCSS
- JavaScript (ES6+)

## Security Features

- Environment variables for sensitive data
- Input sanitization and validation
- XSS protection
- Spam and profanity filtering
- Email validation with disposable email detection

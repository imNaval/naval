# Deployment Guide for Hostinger

## 🚀 How to Deploy Your Portfolio to Hostinger

### Step 1: Build Your Project Locally

```bash
# Install dependencies (if not already done)
npm install

# Build the project for production
npm run build
```

This will create a `dist` folder with all your optimized files.

### Step 2: Upload to Hostinger

1. **Log into your Hostinger control panel**
2. **Go to File Manager**
3. **Navigate to your hosting directory** (usually `public_html` or your domain folder)
4. **Upload the contents of the `dist` folder** (not the folder itself, but all files inside it)

### Step 3: Configure Hostinger (if needed)

If you're using a subdirectory or custom domain:

1. **Create `.htaccess` file** in your hosting root with:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Step 4: Verify Deployment

- ✅ All images should load properly
- ✅ Navigation should work
- ✅ Contact form should function
- ✅ All links should work

## 🔧 Troubleshooting

### Images Not Loading?
- ✅ All images are now properly imported as modules
- ✅ Vite configuration is set to `base: './'` for relative paths
- ✅ No more hardcoded `/src/` paths

### 404 Errors?
- Make sure you uploaded the contents of `dist/` folder, not the folder itself
- Check that `index.html` is in the root of your hosting directory

### Environment Variables?
- For EmailJS to work, you need to set environment variables in your build process
- Build locally with your `.env` file, then upload the built files

## 📁 File Structure After Upload

Your hosting directory should look like this:
```
your-domain.com/
├── index.html
├── favicon.svg
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── hero-[hash].png
│   ├── profile-[hash].jpg
│   └── [other assets with hashes]
```

## 🎯 Key Changes Made

1. **✅ Fixed Image Imports**: All images now use proper ES6 imports
2. **✅ Updated Vite Config**: Added `base: './'` for relative paths
3. **✅ Fixed Project Images**: All project images are now imported
4. **✅ Fixed Certificate Images**: All certificate images are now imported
5. **✅ Updated Favicon Paths**: Changed to relative paths

Your portfolio should now work perfectly on Hostinger! 🚀 
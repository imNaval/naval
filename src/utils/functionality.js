import resumeUrl from '../assets/Naval_Resume.pdf';

export function downloadResume() {
  try {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = resumeUrl;
    a.download = 'Naval_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error('Failed to download resume:', err);
    alert('Failed to download resume. Please try again.');
  }
}
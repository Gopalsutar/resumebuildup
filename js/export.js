/**
 * RESUME BUILDER PRO - EXPORT & DATA MANAGEMENT MODULE
 * Handles PDF export (html2pdf & native print), JSON backup/restore,
 * and high quality sample data loading.
 */

const SAMPLE_RESUME_DATA = {
  personal: {
    fullName: 'Aditya Verma',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'aditya.verma@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka, India',
    website: 'https://adityaverma.dev',
    linkedin: 'https://linkedin.com/in/adityaverma',
    github: 'https://github.com/adityaverma',
    avatar: '',
    summary: 'High-performing Full Stack Engineer with 5+ years of experience designing, architecting, and scaling enterprise web applications. Proficient in React, Node.js, TypeScript, Cloud Native architecture (AWS/GCP), and database optimization. Passionate about building resilient distributed systems and crafting exceptional user experiences.'
  },
  experience: [
    {
      id: 'exp_1',
      position: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'Bengaluru',
      startDate: '2022',
      endDate: '',
      current: true,
      description: 'Architected and deployed microservices backend handling 4M+ daily active requests with 99.98% uptime.\nLed a high-velocity team of 6 engineers, spearheading CI/CD pipelines and cutting deployment lead time by 45%.\nReduced AWS infrastructure monthly spending by 28% through Redis caching and query indexing.'
    },
    {
      id: 'exp_2',
      position: 'Frontend Developer',
      company: 'InnovateX Labs',
      location: 'Pune',
      startDate: '2020',
      endDate: '2022',
      current: false,
      description: 'Engineered responsive SaaS dashboard serving 120k+ B2B users with React, Redux Toolkit, and Tailwind.\nImproved Google Core Web Vitals (LCP from 3.8s to 1.2s), directly improving user retention by 22%.\nCollaborated closely with UX designers to develop an accessible and reusable enterprise UI component library.'
    }
  ],
  education: [
    {
      id: 'edu_1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'National Institute of Technology (NIT)',
      startDate: '2016',
      endDate: '2020',
      current: false,
      score: '8.8 / 10 CGPA'
    }
  ],
  skills: [
    'JavaScript (ES6+)',
    'TypeScript',
    'React.js / Next.js',
    'Node.js & Express',
    'REST & GraphQL APIs',
    'PostgreSQL / MongoDB',
    'Docker & Kubernetes',
    'AWS Cloud Architecture',
    'Git & CI/CD Pipelines',
    'System Design & Security'
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'OmniFlow - AI Workflow Automation Engine',
      technologies: 'Node.js, React, Redis, OpenAI API, PostgreSQL',
      link: 'https://github.com/adityaverma/omniflow',
      description: 'Built a low-code workflow automation orchestrator enabling drag-and-drop generative AI task execution.\nImplemented resilient queue processing with BullMQ and WebSockets for real-time progress streaming.'
    },
    {
      id: 'proj_2',
      name: 'SecurePay - Cross-Border Payment Gateway',
      technologies: 'TypeScript, Go, Stripe API, Docker',
      link: 'https://github.com/adityaverma/securepay',
      description: 'Developed PCI-DSS compliant payment processing service with webhook retries and fraud risk scoring.'
    }
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      date: '2023'
    },
    {
      id: 'cert_2',
      name: 'Meta Certified Front-End Developer Specialization',
      issuer: 'Meta / Coursera',
      date: '2022'
    }
  ]
};

// Download as PDF using html2pdf.js with fallback to native print
function downloadPDF() {
  const paper = document.getElementById('resumePaper');
  if (!paper) return;

  const candidateName = window.ResumeApp.data.personal.fullName || 'Candidate';
  const cleanName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanName}_Resume.pdf`;

  showToast('Generating resume PDF, please wait...', 'info');

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       0,
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(paper).save()
      .then(() => {
        showToast('Resume PDF downloaded successfully!', 'success');
      })
      .catch((err) => {
        console.error('html2pdf error:', err);
        showToast('Direct download encountered an issue. Opening print dialog...', 'info');
        window.print();
      });
  } else {
    // Fallback: Native Browser Print
    window.print();
  }
}

// Print Resume
function printResume() {
  window.print();
}

// Export Resume to JSON
function exportJSON() {
  const data = window.ResumeApp.data;
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  const cleanName = (data.personal.fullName || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_');
  a.download = `${cleanName}_Backup.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Resume backup exported successfully!', 'success');
}

// Import Resume from JSON File
function importJSON(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && parsed.personal) {
        window.ResumeApp.loadData(parsed);
        showToast('Resume data restored successfully!', 'success');
      } else {
        showToast('Invalid JSON file format.', 'error');
      }
    } catch (err) {
      showToast('Error reading file. Please provide a valid JSON file.', 'error');
    }
  };
  reader.readAsText(file);
}

// Load Pre-Filled Sample Data
function loadSampleData() {
  if (window.ResumeApp) {
    window.ResumeApp.loadData(JSON.parse(JSON.stringify(SAMPLE_RESUME_DATA)));
    showToast('Professional sample resume loaded successfully!', 'success');
  }
}

// Save Resume to Current User Account
function saveUserResume() {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please sign in to save your resume to your account.', 'info');
    openAuthModal('login');
    return;
  }

  const key = `rb_resume_${user.id}`;
  const data = window.ResumeApp.data;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    showToast(`Resume saved successfully to ${user.name}'s account!`, 'success');
  } catch (e) {
    showToast('Storage limit exceeded. Unable to save resume data.', 'error');
  }
}

// Load User Saved Resume
function loadUserResume(userId) {
  if (!userId) return;
  const key = `rb_resume_${userId}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const data = JSON.parse(raw);
      window.ResumeApp.loadData(data);
      showToast('Your previously saved resume has been loaded.', 'info');
    }
  } catch (e) {
    console.error('Error loading user resume', e);
  }
}

// Clear Resume Form
function clearResumeData() {
  if (confirm('Are you sure you want to reset all resume data? This action cannot be undone.')) {
    const emptyData = {
      personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        avatar: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    };
    window.ResumeApp.loadData(emptyData);
    showToast('Resume form has been reset.', 'info');
  }
}

/**
 * RESUME BUILDER PRO - MAIN APPLICATION ENGINE
 * Orchestrates real-time state, dynamic repeaters, preview canvas, and UI events.
 */

class ResumeBuilderApp {
  constructor() {
    this.data = {
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

    this.init();
  }

  init() {
    this.initTheme();
    this.bindStaticInputs();
    this.bindAccordions();
    this.bindRepeaterAddButtons();
    this.bindSkillsTagInput();
    this.bindAvatarUpload();
    this.bindToolbarActions();
    this.bindMobileViewToggle();

    // Check if user has an existing saved draft or logged in user resume
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    let loaded = false;

    if (user) {
      const userSaved = localStorage.getItem(`rb_resume_${user.id}`);
      if (userSaved) {
        try {
          this.loadData(JSON.parse(userSaved));
          loaded = true;
        } catch (e) {}
      }
    }

    if (!loaded) {
      const draft = localStorage.getItem('rb_draft');
      if (draft) {
        try {
          this.loadData(JSON.parse(draft));
          loaded = true;
        } catch (e) {}
      }
    }

    // Default to rich sample data if first time opening
    if (!loaded) {
      if (typeof SAMPLE_RESUME_DATA !== 'undefined') {
        this.loadData(JSON.parse(JSON.stringify(SAMPLE_RESUME_DATA)));
      }
    }

    // Initialize Templates module
    if (window.ResumeTemplates) {
      window.ResumeTemplates.init();
    }

    this.render();
  }

  // Auto-save draft to localStorage
  saveDraft() {
    try {
      localStorage.setItem('rb_draft', JSON.stringify(this.data));
    } catch (e) {}
  }

  // Load complete state into form and preview
  loadData(newData) {
    this.data = JSON.parse(JSON.stringify(newData));

    // Fill Personal Inputs
    const p = this.data.personal || {};
    document.getElementById('inputFullName').value = p.fullName || '';
    document.getElementById('inputJobTitle').value = p.jobTitle || '';
    document.getElementById('inputEmail').value = p.email || '';
    document.getElementById('inputPhone').value = p.phone || '';
    document.getElementById('inputLocation').value = p.location || '';
    document.getElementById('inputWebsite').value = p.website || '';
    document.getElementById('inputLinkedIn').value = p.linkedin || '';
    document.getElementById('inputGitHub').value = p.github || '';
    document.getElementById('inputSummary').value = p.summary || '';

    // Avatar preview
    const avatarImg = document.getElementById('avatarPreviewImg');
    if (avatarImg) {
      avatarImg.src = p.avatar || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>';
    }

    // Render Repeater Forms
    this.renderRepeaterForm('experience');
    this.renderRepeaterForm('education');
    this.renderRepeaterForm('projects');
    this.renderRepeaterForm('certifications');
    this.renderSkillsTags();

    this.saveDraft();
    this.render();
  }

  // Bind two-way binding for personal info & summary
  bindStaticInputs() {
    const personalKeys = [
      { id: 'inputFullName', key: 'fullName' },
      { id: 'inputJobTitle', key: 'jobTitle' },
      { id: 'inputEmail', key: 'email' },
      { id: 'inputPhone', key: 'phone' },
      { id: 'inputLocation', key: 'location' },
      { id: 'inputWebsite', key: 'website' },
      { id: 'inputLinkedIn', key: 'linkedin' },
      { id: 'inputGitHub', key: 'github' },
      { id: 'inputSummary', key: 'summary' }
    ];

    personalKeys.forEach(({ id, key }) => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', (e) => {
          this.data.personal[key] = e.target.value;
          this.saveDraft();
          this.render();
        });
      }
    });
  }

  // Accordion toggle handlers
  bindAccordions() {
    document.querySelectorAll('.form-section-card .section-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.form-section-card');
        card.classList.toggle('active');
      });
    });
  }

  // Avatar Upload & Removal
  bindAvatarUpload() {
    const fileInput = document.getElementById('avatarFileInput');
    const avatarImg = document.getElementById('avatarPreviewImg');
    const removeBtn = document.getElementById('avatarRemoveBtn');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size > 2 * 1024 * 1024) {
            showToast('Photo size 2MB se kam hona chahiye.', 'error');
            return;
          }
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            this.data.personal.avatar = dataUrl;
            if (avatarImg) avatarImg.src = dataUrl;
            this.saveDraft();
            this.render();
            showToast('Profile photo update ho gayi!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.data.personal.avatar = '';
        if (fileInput) fileInput.value = '';
        if (avatarImg) {
          avatarImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>';
        }
        this.saveDraft();
        this.render();
        showToast('Photo hata di gayi.', 'info');
      });
    }
  }

  // Add Item to Dynamic Repeaters
  bindRepeaterAddButtons() {
    const addExpBtn = document.getElementById('addExperienceBtn');
    if (addExpBtn) {
      addExpBtn.addEventListener('click', () => {
        this.data.experience.push({
          id: 'exp_' + Date.now(),
          position: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        });
        this.renderRepeaterForm('experience');
        this.saveDraft();
        this.render();
      });
    }

    const addEduBtn = document.getElementById('addEducationBtn');
    if (addEduBtn) {
      addEduBtn.addEventListener('click', () => {
        this.data.education.push({
          id: 'edu_' + Date.now(),
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          current: false,
          score: ''
        });
        this.renderRepeaterForm('education');
        this.saveDraft();
        this.render();
      });
    }

    const addProjBtn = document.getElementById('addProjectBtn');
    if (addProjBtn) {
      addProjBtn.addEventListener('click', () => {
        this.data.projects.push({
          id: 'proj_' + Date.now(),
          name: '',
          technologies: '',
          link: '',
          description: ''
        });
        this.renderRepeaterForm('projects');
        this.saveDraft();
        this.render();
      });
    }

    const addCertBtn = document.getElementById('addCertBtn');
    if (addCertBtn) {
      addCertBtn.addEventListener('click', () => {
        this.data.certifications.push({
          id: 'cert_' + Date.now(),
          name: '',
          issuer: '',
          date: ''
        });
        this.renderRepeaterForm('certifications');
        this.saveDraft();
        this.render();
      });
    }
  }

  // Render Repeater Forms in Editor
  renderRepeaterForm(type) {
    const container = document.getElementById(`${type}Container`);
    if (!container) return;

    const items = this.data[type] || [];
    container.innerHTML = '';

    items.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'repeater-item';
      itemEl.dataset.id = item.id;

      if (type === 'experience') {
        itemEl.innerHTML = `
          <div class="repeater-item-header">
            <span class="repeater-item-index">Work Experience #${index + 1}</span>
            <button type="button" class="repeater-remove-btn" data-action="remove">✕ Delete</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Job Title / Position</label>
              <input type="text" class="form-input field-position" value="${this.escape(item.position)}" placeholder="e.g. Software Engineer">
            </div>
            <div class="form-group">
              <label>Company / Organization</label>
              <input type="text" class="form-input field-company" value="${this.escape(item.company)}" placeholder="e.g. Google India">
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" class="form-input field-location" value="${this.escape(item.location)}" placeholder="e.g. Bengaluru, India">
            </div>
            <div class="form-group">
              <label>Start Date</label>
              <input type="text" class="form-input field-startDate" value="${this.escape(item.startDate)}" placeholder="e.g. Jan 2021">
            </div>
            <div class="form-group">
              <label>End Date</label>
              <input type="text" class="form-input field-endDate" value="${this.escape(item.endDate)}" placeholder="e.g. Present" ${item.current ? 'disabled' : ''}>
              <label class="checkbox-label">
                <input type="checkbox" class="field-current" ${item.current ? 'checked' : ''}> Currently Working Here
              </label>
            </div>
            <div class="form-group form-grid-full">
              <label>Key Responsibilities & Achievements (1 per line)</label>
              <textarea class="form-textarea field-description" placeholder="• Led development of...&#10;• Reduced latency by 30%...">${this.escape(item.description)}</textarea>
            </div>
          </div>
        `;
      } else if (type === 'education') {
        itemEl.innerHTML = `
          <div class="repeater-item-header">
            <span class="repeater-item-index">Education #${index + 1}</span>
            <button type="button" class="repeater-remove-btn" data-action="remove">✕ Delete</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Degree / Qualification</label>
              <input type="text" class="form-input field-degree" value="${this.escape(item.degree)}" placeholder="e.g. B.Tech in CS">
            </div>
            <div class="form-group">
              <label>College / University</label>
              <input type="text" class="form-input field-institution" value="${this.escape(item.institution)}" placeholder="e.g. Delhi University">
            </div>
            <div class="form-group">
              <label>Start Date</label>
              <input type="text" class="form-input field-startDate" value="${this.escape(item.startDate)}" placeholder="e.g. 2018">
            </div>
            <div class="form-group">
              <label>End Date</label>
              <input type="text" class="form-input field-endDate" value="${this.escape(item.endDate)}" placeholder="e.g. 2022" ${item.current ? 'disabled' : ''}>
              <label class="checkbox-label">
                <input type="checkbox" class="field-current" ${item.current ? 'checked' : ''}> Currently Studying
              </label>
            </div>
            <div class="form-group form-grid-full">
              <label>CGPA / Percentage / Honors</label>
              <input type="text" class="form-input field-score" value="${this.escape(item.score)}" placeholder="e.g. 8.5 CGPA / First Class">
            </div>
          </div>
        `;
      } else if (type === 'projects') {
        itemEl.innerHTML = `
          <div class="repeater-item-header">
            <span class="repeater-item-index">Project #${index + 1}</span>
            <button type="button" class="repeater-remove-btn" data-action="remove">✕ Delete</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Project Title</label>
              <input type="text" class="form-input field-name" value="${this.escape(item.name)}" placeholder="e.g. E-Commerce Portal">
            </div>
            <div class="form-group">
              <label>Technologies Used</label>
              <input type="text" class="form-input field-technologies" value="${this.escape(item.technologies)}" placeholder="e.g. React, Node.js, MongoDB">
            </div>
            <div class="form-group form-grid-full">
              <label>Project URL / GitHub Link</label>
              <input type="url" class="form-input field-link" value="${this.escape(item.link)}" placeholder="https://github.com/username/project">
            </div>
            <div class="form-group form-grid-full">
              <label>Description & Impact</label>
              <textarea class="form-textarea field-description" placeholder="• Developed scalable authentication...&#10;• Processed 10k orders...">${this.escape(item.description)}</textarea>
            </div>
          </div>
        `;
      } else if (type === 'certifications') {
        itemEl.innerHTML = `
          <div class="repeater-item-header">
            <span class="repeater-item-index">Certification #${index + 1}</span>
            <button type="button" class="repeater-remove-btn" data-action="remove">✕ Delete</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Certificate Name</label>
              <input type="text" class="form-input field-name" value="${this.escape(item.name)}" placeholder="e.g. AWS Solutions Architect">
            </div>
            <div class="form-group">
              <label>Issuing Organization</label>
              <input type="text" class="form-input field-issuer" value="${this.escape(item.issuer)}" placeholder="e.g. Amazon Web Services">
            </div>
            <div class="form-group form-grid-full">
              <label>Issue Date / Validity</label>
              <input type="text" class="form-input field-date" value="${this.escape(item.date)}" placeholder="e.g. July 2023">
            </div>
          </div>
        `;
      }

      // Bind input changes in this item
      this.bindRepeaterItemEvents(itemEl, type, item.id);
      container.appendChild(itemEl);
    });
  }

  // Handle individual repeater item field bindings
  bindRepeaterItemEvents(itemEl, type, itemId) {
    const item = this.data[type].find(i => i.id === itemId);
    if (!item) return;

    // Delete item
    const removeBtn = itemEl.querySelector('[data-action="remove"]');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.data[type] = this.data[type].filter(i => i.id !== itemId);
        this.renderRepeaterForm(type);
        this.saveDraft();
        this.render();
      });
    }

    // Current working/studying checkbox
    const currentBox = itemEl.querySelector('.field-current');
    const endDateInput = itemEl.querySelector('.field-endDate');
    if (currentBox) {
      currentBox.addEventListener('change', (e) => {
        item.current = e.target.checked;
        if (endDateInput) {
          endDateInput.disabled = item.current;
          if (item.current) {
            endDateInput.value = '';
            item.endDate = '';
          }
        }
        this.saveDraft();
        this.render();
      });
    }

    // Text inputs & textareas
    itemEl.querySelectorAll('input:not([type="checkbox"]), textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        const className = Array.from(e.target.classList).find(c => c.startsWith('field-'));
        if (className) {
          const fieldKey = className.replace('field-', '');
          item[fieldKey] = e.target.value;
          this.saveDraft();
          this.render();
        }
      });
    });
  }

  // Skills Tag Input System
  bindSkillsTagInput() {
    const input = document.getElementById('skillInput');
    const addBtn = document.getElementById('addSkillBtn');

    const addSkill = () => {
      const val = input.value.trim();
      if (!val) return;

      const skillsToAdd = val.split(',').map(s => s.trim()).filter(Boolean);
      skillsToAdd.forEach(s => {
        if (!this.data.skills.includes(s)) {
          this.data.skills.push(s);
        }
      });

      input.value = '';
      this.renderSkillsTags();
      this.saveDraft();
      this.render();
    };

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          addSkill();
        }
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', addSkill);
    }
  }

  // Render Skill Chips in the editor form
  renderSkillsTags() {
    const container = document.getElementById('skillsTagsContainer');
    if (!container) return;

    container.innerHTML = '';
    this.data.skills.forEach((skill, index) => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.innerHTML = `
        <span>${this.escape(skill)}</span>
        <span class="skill-tag-remove" data-index="${index}">&times;</span>
      `;

      tag.querySelector('.skill-tag-remove').addEventListener('click', () => {
        this.data.skills.splice(index, 1);
        this.renderSkillsTags();
        this.saveDraft();
        this.render();
      });

      container.appendChild(tag);
    });
  }

  // Bind top navbar & floating toolbar buttons
  bindToolbarActions() {
    // Download PDF
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) downloadPdfBtn.addEventListener('click', downloadPDF);

    // Native Print
    const printBtn = document.getElementById('printResumeBtn');
    if (printBtn) printBtn.addEventListener('click', printResume);

    // Save to Account
    const saveAccountBtn = document.getElementById('saveResumeBtn');
    if (saveAccountBtn) saveAccountBtn.addEventListener('click', saveUserResume);

    // Load Sample Data
    const loadSampleBtn = document.getElementById('loadSampleBtn');
    if (loadSampleBtn) loadSampleBtn.addEventListener('click', loadSampleData);

    // Clear Form
    const clearFormBtn = document.getElementById('clearFormBtn');
    if (clearFormBtn) clearFormBtn.addEventListener('click', clearResumeData);

    // Export JSON
    const exportJsonBtn = document.getElementById('exportJsonBtn');
    if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportJSON);

    // Import JSON File
    const importFileInput = document.getElementById('importFileInput');
    const importBtn = document.getElementById('importJsonBtn');
    if (importBtn && importFileInput) {
      importBtn.addEventListener('click', () => importFileInput.click());
      importFileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          importJSON(e.target.files[0]);
          e.target.value = '';
        }
      });
    }
  }

  // Dark/Light Theme Switching
  initTheme() {
    const savedTheme = localStorage.getItem('rb_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonIcon(savedTheme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('rb_theme', next);
        this.updateThemeButtonIcon(next);
      });
    }
  }

  updateThemeButtonIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.title = theme === 'dark' ? 'Light Mode me badlein' : 'Dark Mode me badlein';
    }
  }

  // Mobile Edit vs. Preview Toggle
  bindMobileViewToggle() {
    const editBtn = document.getElementById('mobileToggleEdit');
    const prevBtn = document.getElementById('mobileTogglePrev');
    const editor = document.getElementById('editorSidebar');
    const preview = document.getElementById('previewPanel');

    if (editBtn && prevBtn && editor && preview) {
      editBtn.addEventListener('click', () => {
        editBtn.classList.add('active');
        prevBtn.classList.remove('active');
        editor.classList.remove('mobile-hidden');
        preview.classList.add('mobile-hidden');
      });

      prevBtn.addEventListener('click', () => {
        prevBtn.classList.add('active');
        editBtn.classList.remove('active');
        editor.classList.add('mobile-hidden');
        preview.classList.remove('mobile-hidden');
      });
    }
  }

  // Escape HTML utility
  escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Main Render to Live Canvas
  render() {
    const paper = document.getElementById('resumePaper');
    if (!paper || !window.ResumeTemplates) return;

    paper.innerHTML = window.ResumeTemplates.render(this.data);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.ResumeApp = new ResumeBuilderApp();
});

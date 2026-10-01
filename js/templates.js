/**
 * RESUME BUILDER PRO - TEMPLATES MODULE
 * Renders the resume paper dynamically based on the active template & accent color.
 */

const ResumeTemplates = {
  currentTemplate: 'modern',
  currentAccent: '#0d9488',

  // Available accent palette (Teal prioritized)
  colors: [
    { name: 'Emerald Teal', hex: '#0d9488', light: '#f0fdfa' },
    { name: 'Sapphire Blue', hex: '#2563eb', light: '#eff6ff' },
    { name: 'Royale Violet', hex: '#7c3aed', light: '#f5f3ff' },
    { name: 'Crimson Rose', hex: '#dc2626', light: '#fef2f2' },
    { name: 'Midnight Slate', hex: '#334155', light: '#f8fafc' },
    { name: 'Warm Amber', hex: '#d97706', light: '#fffbeb' },
  ],

  init() {
    this.bindEvents();
    this.setAccentColor(this.currentAccent);
  },

  bindEvents() {
    // Template switcher buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const template = e.currentTarget.dataset.template;
        this.setTemplate(template);
      });
    });

    // Accent color picker dots
    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const color = e.currentTarget.dataset.color;
        this.setAccentColor(color);
      });
    });
  },

  setTemplate(templateName) {
    this.currentTemplate = templateName;
    const paper = document.getElementById('resumePaper');
    if (!paper) return;

    paper.classList.remove('template-modern', 'template-executive', 'template-creative');
    paper.classList.add(`template-${templateName}`);
    
    // Re-render
    if (window.ResumeApp) {
      window.ResumeApp.render();
    }
  },

  setAccentColor(hex) {
    this.currentAccent = hex;
    const palette = this.colors.find(c => c.hex.toLowerCase() === hex.toLowerCase()) || this.colors[0];
    
    document.documentElement.style.setProperty('--resume-accent', palette.hex);
    document.documentElement.style.setProperty('--resume-accent-light', palette.light);

    // Re-render
    if (window.ResumeApp) {
      window.ResumeApp.render();
    }
  },

  // Helper: Escape HTML
  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Helper: Parse bullet points from multiline text
  formatBullets(text) {
    if (!text) return '';
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return '';
    return `<ul class="resume-bullets">
      ${lines.map(line => `<li>${this.escapeHTML(line.replace(/^[•\-\*]\s*/, ''))}</li>`).join('')}
    </ul>`;
  },

  // Format Date Range
  formatDateRange(start, end, current) {
    if (!start && !end && !current) return '';
    const startStr = start || '';
    const endStr = current ? 'Present' : (end || '');
    if (startStr && endStr) return `${startStr} — ${endStr}`;
    return startStr || endStr;
  },

  // Render Modern Clean Template
  renderModern(data) {
    const { personal, experience, education, skills, projects, certifications } = data;

    const avatarHTML = personal.avatar ? 
      `<img src="${personal.avatar}" alt="${this.escapeHTML(personal.fullName)}" class="header-avatar">` : '';

    const contactItems = [];
    if (personal.email) contactItems.push(`<div class="contact-item">✉️ ${this.escapeHTML(personal.email)}</div>`);
    if (personal.phone) contactItems.push(`<div class="contact-item">📞 ${this.escapeHTML(personal.phone)}</div>`);
    if (personal.location) contactItems.push(`<div class="contact-item">📍 ${this.escapeHTML(personal.location)}</div>`);
    if (personal.website) contactItems.push(`<div class="contact-item">🔗 <a href="${this.escapeHTML(personal.website)}" target="_blank">${this.escapeHTML(personal.website.replace(/^https?:\/\//, ''))}</a></div>`);
    if (personal.linkedin) contactItems.push(`<div class="contact-item">💼 <a href="${this.escapeHTML(personal.linkedin)}" target="_blank">LinkedIn</a></div>`);
    if (personal.github) contactItems.push(`<div class="contact-item">🐙 <a href="${this.escapeHTML(personal.github)}" target="_blank">GitHub</a></div>`);

    return `
      <header class="resume-header">
        <div class="header-main">
          <h1 class="resume-name">${this.escapeHTML(personal.fullName || 'Your Name')}</h1>
          <div class="resume-title">${this.escapeHTML(personal.jobTitle || 'Professional Title')}</div>
          <div class="contact-grid">
            ${contactItems.join('')}
          </div>
        </div>
        ${avatarHTML}
      </header>

      ${personal.summary ? `
        <section class="resume-section" style="margin-bottom: 1.25rem;">
          <h2 class="resume-section-title">Summary</h2>
          <p style="color: #334155; line-height: 1.6;">${this.escapeHTML(personal.summary)}</p>
        </section>
      ` : ''}

      <div class="resume-body">
        <!-- Main Column: Experience & Projects -->
        <div class="resume-main-col">
          ${experience && experience.length > 0 ? `
            <section class="resume-section" style="margin-bottom: 1.25rem;">
              <h2 class="resume-section-title">Work Experience</h2>
              ${experience.map(item => `
                <div class="timeline-item">
                  <div class="item-header">
                    <span class="item-title">${this.escapeHTML(item.position || 'Role Title')}</span>
                    <span class="item-date">${this.formatDateRange(item.startDate, item.endDate, item.current)}</span>
                  </div>
                  <div class="item-subtitle">${this.escapeHTML(item.company || 'Company')} ${item.location ? `• ${this.escapeHTML(item.location)}` : ''}</div>
                  ${this.formatBullets(item.description)}
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${projects && projects.length > 0 ? `
            <section class="resume-section" style="margin-bottom: 1.25rem;">
              <h2 class="resume-section-title">Projects</h2>
              ${projects.map(proj => `
                <div class="timeline-item">
                  <div class="item-header">
                    <span class="item-title">${this.escapeHTML(proj.name || 'Project Name')}</span>
                    ${proj.link ? `<a href="${this.escapeHTML(proj.link)}" target="_blank" style="font-size: 11px; color: var(--resume-accent);">Live Demo ↗</a>` : ''}
                  </div>
                  ${proj.technologies ? `<div class="item-subtitle" style="font-size: 11.5px;">Tech: ${this.escapeHTML(proj.technologies)}</div>` : ''}
                  ${this.formatBullets(proj.description)}
                </div>
              `).join('')}
            </section>
          ` : ''}
        </div>

        <!-- Sidebar Column: Skills & Education -->
        <div class="resume-side-col">
          ${skills && skills.length > 0 ? `
            <section class="resume-section" style="margin-bottom: 1.25rem;">
              <h2 class="resume-section-title">Skills & Technologies</h2>
              <div class="skill-chips">
                ${skills.map(s => `<span class="skill-chip">${this.escapeHTML(s)}</span>`).join('')}
              </div>
            </section>
          ` : ''}

          ${education && education.length > 0 ? `
            <section class="resume-section" style="margin-bottom: 1.25rem;">
              <h2 class="resume-section-title">Education</h2>
              ${education.map(edu => `
                <div style="margin-bottom: 0.85rem;">
                  <div class="item-title" style="font-size: 12.5px;">${this.escapeHTML(edu.degree || 'Degree')}</div>
                  <div class="item-subtitle" style="font-size: 11.5px;">${this.escapeHTML(edu.institution || 'University')}</div>
                  <div class="item-date">${this.formatDateRange(edu.startDate, edu.endDate, edu.current)} ${edu.score ? `• ${this.escapeHTML(edu.score)}` : ''}</div>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${certifications && certifications.length > 0 ? `
            <section class="resume-section">
              <h2 class="resume-section-title">Certifications</h2>
              ${certifications.map(cert => `
                <div style="margin-bottom: 0.65rem; font-size: 11.5px;">
                  <div style="font-weight: 700; color: #0f172a;">${this.escapeHTML(cert.name)}</div>
                  <div style="color: #64748b;">${this.escapeHTML(cert.issuer || '')} ${cert.date ? `(${this.escapeHTML(cert.date)})` : ''}</div>
                </div>
              `).join('')}
            </section>
          ` : ''}
        </div>
      </div>
    `;
  },

  // Render Executive Elite Template (ATS Corporate)
  renderExecutive(data) {
    const { personal, experience, education, skills, projects, certifications } = data;

    const contactItems = [];
    if (personal.email) contactItems.push(`✉ ${this.escapeHTML(personal.email)}`);
    if (personal.phone) contactItems.push(`☎ ${this.escapeHTML(personal.phone)}`);
    if (personal.location) contactItems.push(`📍 ${this.escapeHTML(personal.location)}`);
    if (personal.linkedin) contactItems.push(`LinkedIn: ${this.escapeHTML(personal.linkedin.replace(/^https?:\/\//, ''))}`);
    if (personal.website) contactItems.push(`Portfolio: ${this.escapeHTML(personal.website.replace(/^https?:\/\//, ''))}`);

    return `
      <header class="resume-header">
        <h1 class="resume-name">${this.escapeHTML(personal.fullName || 'Candidate Name')}</h1>
        <div class="resume-title">${this.escapeHTML(personal.jobTitle || 'Executive Professional')}</div>
        <div class="contact-grid">
          ${contactItems.map(c => `<span>${c}</span>`).join(' • ')}
        </div>
      </header>

      ${personal.summary ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Executive Summary</h2>
          <p style="color: #334155; line-height: 1.6; text-align: justify;">${this.escapeHTML(personal.summary)}</p>
        </section>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Professional Experience</h2>
          ${experience.map(item => `
            <div class="timeline-item">
              <div class="item-header">
                <span>${this.escapeHTML(item.position || 'Role Title')}</span>
                <span style="font-weight: 500; font-size: 12px;">${this.formatDateRange(item.startDate, item.endDate, item.current)}</span>
              </div>
              <div class="item-subtitle">${this.escapeHTML(item.company || 'Company')}${item.location ? ` | ${this.escapeHTML(item.location)}` : ''}</div>
              ${this.formatBullets(item.description)}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${education && education.length > 0 ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Education & Credentials</h2>
          ${education.map(edu => `
            <div style="margin-bottom: 0.65rem;">
              <div class="item-header">
                <span>${this.escapeHTML(edu.institution || 'University')}</span>
                <span style="font-weight: 500; font-size: 12px;">${this.formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
              </div>
              <div class="item-subtitle">${this.escapeHTML(edu.degree || 'Degree')} ${edu.score ? `— ${this.escapeHTML(edu.score)}` : ''}</div>
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${projects && projects.length > 0 ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Key Projects</h2>
          ${projects.map(proj => `
            <div style="margin-bottom: 0.65rem;">
              <div class="item-header">
                <span>${this.escapeHTML(proj.name)} ${proj.technologies ? `<span style="font-weight: 400; font-size: 12px;">(${this.escapeHTML(proj.technologies)})</span>` : ''}</span>
              </div>
              ${this.formatBullets(proj.description)}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${skills && skills.length > 0 ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Core Competencies</h2>
          <div class="skill-chips">
            ${skills.map(s => `<span class="skill-chip">${this.escapeHTML(s)}</span>`).join('')}
          </div>
        </section>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Honors & Certifications</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 12px;">
            ${certifications.map(c => `<span>• <strong>${this.escapeHTML(c.name)}</strong> (${this.escapeHTML(c.issuer || 'Authority')})</span>`).join('')}
          </div>
        </section>
      ` : ''}
    `;
  },

  // Render Creative Minimalist Template
  renderCreative(data) {
    const { personal, experience, education, skills, projects, certifications } = data;

    return `
      <header class="resume-header">
        <div>
          <h1 class="resume-name">${this.escapeHTML(personal.fullName || 'Candidate Name')}</h1>
          <div class="resume-title">${this.escapeHTML(personal.jobTitle || 'Product Designer & Engineer')}</div>
        </div>
        <div class="contact-grid">
          ${personal.email ? `<div>${this.escapeHTML(personal.email)}</div>` : ''}
          ${personal.phone ? `<div>${this.escapeHTML(personal.phone)}</div>` : ''}
          ${personal.location ? `<div>${this.escapeHTML(personal.location)}</div>` : ''}
          ${personal.github ? `<div>github.com/${this.escapeHTML(personal.github.replace(/^https?:\/\/github\.com\//, ''))}</div>` : ''}
        </div>
      </header>

      ${personal.summary ? `
        <div style="margin-bottom: 1.25rem; font-size: 13.5px; color: #334155; line-height: 1.6; border-left: 2px solid var(--resume-accent); padding-left: 0.85rem;">
          ${this.escapeHTML(personal.summary)}
        </div>
      ` : ''}

      ${skills && skills.length > 0 ? `
        <section class="resume-section" style="margin-bottom: 1.25rem;">
          <h2 class="resume-section-title">Tech Stack & Skills</h2>
          <div class="skill-chips">
            ${skills.map(s => `<span class="skill-chip">${this.escapeHTML(s)}</span>`).join('')}
          </div>
        </section>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <section class="resume-section" style="margin-bottom: 1.25rem;">
          <h2 class="resume-section-title">Experience</h2>
          ${experience.map(item => `
            <div class="timeline-item">
              <div class="item-header">
                <span class="item-title">${this.escapeHTML(item.position || 'Role')}</span>
                <span class="item-date">${this.formatDateRange(item.startDate, item.endDate, item.current)}</span>
              </div>
              <div class="item-subtitle">${this.escapeHTML(item.company || 'Company')} ${item.location ? `• ${this.escapeHTML(item.location)}` : ''}</div>
              ${this.formatBullets(item.description)}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${projects && projects.length > 0 ? `
        <section class="resume-section" style="margin-bottom: 1.25rem;">
          <h2 class="resume-section-title">Featured Projects</h2>
          ${projects.map(proj => `
            <div class="timeline-item">
              <div class="item-header">
                <span class="item-title">${this.escapeHTML(proj.name)}</span>
                ${proj.link ? `<a href="${this.escapeHTML(proj.link)}" target="_blank" style="font-size: 11px; font-weight: 700; color: var(--resume-accent);">View ↗</a>` : ''}
              </div>
              ${proj.technologies ? `<div style="font-size: 11.5px; color: #64748b; margin-bottom: 0.25rem;">${this.escapeHTML(proj.technologies)}</div>` : ''}
              ${this.formatBullets(proj.description)}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${education && education.length > 0 ? `
        <section class="resume-section">
          <h2 class="resume-section-title">Education</h2>
          ${education.map(edu => `
            <div style="margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <strong>${this.escapeHTML(edu.degree || 'Degree')}</strong> — ${this.escapeHTML(edu.institution || 'University')}
              </div>
              <div class="item-date">${this.formatDateRange(edu.startDate, edu.endDate, edu.current)}</div>
            </div>
          `).join('')}
        </section>
      ` : ''}
    `;
  },

  // Main Render Router
  render(data) {
    if (this.currentTemplate === 'executive') {
      return this.renderExecutive(data);
    } else if (this.currentTemplate === 'creative') {
      return this.renderCreative(data);
    } else {
      return this.renderModern(data);
    }
  }
};

window.ResumeTemplates = ResumeTemplates;

/**
 * RESUME BUILDER PRO - 100+ TEMPLATES CATALOG ENGINE
 * Provides a database of 108 designer-crafted template configurations,
 * categories, search, filtering, and live template gallery modal.
 */

const TEMPLATE_LAYOUTS = [
  { id: 'modern', name: 'Modern Clean', desc: 'Timeline markers & skill chips with header banner' },
  { id: 'executive', name: 'Executive Elite', desc: 'Traditional corporate serif layout with high ATS compliance' },
  { id: 'creative', name: 'Creative Minimal', desc: 'High-contrast modern designer style with top accent bar' },
  { id: 'tech', name: 'Silicon Tech', desc: 'Developer & engineering matrix layout with monospace accents' },
  { id: 'split', name: 'Nordic Split', desc: 'Full-length left colored sidebar with skills & contacts' },
  { id: 'compact', name: 'Apex Compact', desc: 'High-density single page layout for maximum content' },
  { id: 'ribbon', name: 'Metro Ribbon', desc: 'Vertical accent stripe with elegant milestone dividers' },
  { id: 'classic', name: 'Oxford Classic', desc: 'Refined editorial serif format with double line headers' }
];

const TEMPLATE_COLORS = [
  { name: 'Emerald Teal', hex: '#0d9488', light: '#f0fdfa' },
  { name: 'Sapphire Blue', hex: '#2563eb', light: '#eff6ff' },
  { name: 'Electric Cyan', hex: '#06b6d4', light: '#ecfeff' },
  { name: 'Royale Violet', hex: '#7c3aed', light: '#f5f3ff' },
  { name: 'Crimson Rose', hex: '#dc2626', light: '#fef2f2' },
  { name: 'Coral Sunset', hex: '#ea580c', light: '#fff7ed' },
  { name: 'Midnight Slate', hex: '#334155', light: '#f8fafc' },
  { name: 'Warm Amber', hex: '#d97706', light: '#fffbeb' },
  { name: 'Forest Jade', hex: '#059669', light: '#ecfdf5' },
  { name: 'Deep Indigo', hex: '#4338ca', light: '#eef2ff' },
  { name: 'Rose Gold', hex: '#e11d48', light: '#fff1f2' },
  { name: 'Carbon Black', hex: '#18181b', light: '#f4f4f5' }
];

const TEMPLATE_FONTS = [
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Modern Clean)' },
  { id: 'Outfit', name: 'Outfit (Geometric Display)' },
  { id: 'Inter', name: 'Inter (High Readability)' },
  { id: 'Poppins', name: 'Poppins (Friendly & Crisp)' },
  { id: 'Playfair Display', name: 'Playfair Display (Executive Serif)' },
  { id: 'Merriweather', name: 'Merriweather (Classic Editorial)' },
  { id: 'Space Grotesk', name: 'Space Grotesk (Tech & Cyber)' }
];

// Curated Master Template Names & Archetypes Generator
const TEMPLATE_NAMES_BASE = [
  { name: 'Silicon Valley Pro', cat: 'tech', layout: 'tech', badge: 'Trending' },
  { name: 'Executive Director', cat: 'executive', layout: 'executive', badge: 'Top ATS' },
  { name: 'Modern Innovator', cat: 'modern', layout: 'modern', badge: 'Most Popular' },
  { name: 'Nordic Creative', cat: 'creative', layout: 'creative', badge: 'Staff Pick' },
  { name: 'Vanguard Split', cat: 'modern', layout: 'split', badge: 'High Impact' },
  { name: 'Apex Compact One', cat: 'minimal', layout: 'compact', badge: '1-Page Fit' },
  { name: 'Cambridge Fellow', cat: 'ats', layout: 'classic', badge: 'Academic' },
  { name: 'Metro Ribbon Tech', cat: 'tech', layout: 'ribbon', badge: 'Featured' },
  { name: 'Wall Street Banker', cat: 'executive', layout: 'executive', badge: 'Corporate' },
  { name: 'Minimalist Monolith', cat: 'minimal', layout: 'creative', badge: 'Clean' },
  { name: 'Cloud Architect Pro', cat: 'tech', layout: 'tech', badge: 'High ATS' },
  { name: 'Fintech Leadership', cat: 'executive', layout: 'split', badge: 'Leadership' },
  { name: 'Design Systems Lead', cat: 'creative', layout: 'ribbon', badge: 'Creative' },
  { name: 'Full-Stack Pioneer', cat: 'tech', layout: 'modern', badge: 'Popular' },
  { name: 'Oxford Scholar', cat: 'ats', layout: 'classic', badge: '99% ATS' },
  { name: 'Product Growth VP', cat: 'executive', layout: 'modern', badge: 'Executive' },
  { name: 'Geneva Diplomat', cat: 'ats', layout: 'executive', badge: 'Classic' },
  { name: 'Cyberpunk Engineer', cat: 'tech', layout: 'tech', badge: 'Unique' },
  { name: 'Aura Minimalist', cat: 'minimal', layout: 'compact', badge: 'Fast Track' },
  { name: 'Quantum Dev Matrix', cat: 'tech', layout: 'split', badge: 'Editor Choice' },
  { name: 'Manhattan Finance', cat: 'executive', layout: 'classic', badge: 'Finance' },
  { name: 'Studio Art Director', cat: 'creative', layout: 'creative', badge: 'Portfolio' },
  { name: 'Berlin Startup Founder', cat: 'modern', layout: 'modern', badge: 'Founder' },
  { name: 'Consulting Principal', cat: 'executive', layout: 'ribbon', badge: 'Consulting' },
  { name: 'Tokyo High-Density', cat: 'minimal', layout: 'compact', badge: 'Condensed' },
  { name: 'London Barrister', cat: 'ats', layout: 'classic', badge: 'Legal' },
  { name: 'AI Research Scientist', cat: 'tech', layout: 'tech', badge: 'AI Ready' }
];

// Generate 108 Diverse, Rich Templates
function generateTemplatesCatalog() {
  const catalog = [];
  let idCounter = 1;

  TEMPLATE_NAMES_BASE.forEach((base, baseIndex) => {
    // Each base creates 4 distinct variants across colors and fonts
    for (let variant = 0; variant < 4; variant++) {
      const colorIndex = (baseIndex * 4 + variant) % TEMPLATE_COLORS.length;
      const fontIndex = (baseIndex + variant) % TEMPLATE_FONTS.length;
      const color = TEMPLATE_COLORS[colorIndex];
      const font = TEMPLATE_FONTS[fontIndex];

      const suffix = variant === 0 ? '' : variant === 1 ? 'Prime' : variant === 2 ? 'Studio' : 'Edge';
      const fullName = suffix ? `${base.name} ${suffix}` : base.name;

      const downloadsCount = (10 + ((baseIndex * 7 + variant * 3) % 40) + '.' + ((baseIndex + variant * 5) % 9) + 'k');
      const atsScore = 95 + ((baseIndex + variant) % 5);

      catalog.push({
        id: `tpl-${String(idCounter).padStart(3, '0')}`,
        index: idCounter,
        name: fullName,
        category: base.cat,
        layout: base.layout,
        colorHex: color.hex,
        colorName: color.name,
        colorLight: color.light,
        font: font.id,
        fontName: font.name,
        atsScore: atsScore,
        downloads: downloadsCount,
        badge: variant === 0 ? base.badge : variant === 1 ? 'Trending' : variant === 2 ? 'Popular' : 'Verified',
        description: `Tailored for ${base.cat} careers with ${base.layout} layout in ${color.name} palette.`
      });

      idCounter++;
    }
  });

  return catalog;
}

const TEMPLATES_DATABASE = generateTemplatesCatalog();

// Template Catalog Controller
const TemplateCatalogApp = {
  templates: TEMPLATES_DATABASE,
  currentCategory: 'all',
  currentSearch: '',
  currentColor: 'all',
  currentSort: 'popular',
  displayLimit: 12, // Paginated initial display

  init() {
    this.renderCards();
    this.bindEvents();
    this.updateCounter();
  },

  getFilteredTemplates() {
    return this.templates.filter(item => {
      // Category filter
      if (this.currentCategory !== 'all' && item.category !== this.currentCategory) {
        return false;
      }
      // Color filter
      if (this.currentColor !== 'all' && item.colorHex.toLowerCase() !== this.currentColor.toLowerCase()) {
        return false;
      }
      // Search filter
      if (this.currentSearch) {
        const query = this.currentSearch.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        const matchLayout = item.layout.toLowerCase().includes(query);
        const matchColor = item.colorName.toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchLayout && !matchColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.currentSort === 'ats') {
        return b.atsScore - a.atsScore;
      } else if (this.currentSort === 'new') {
        return b.index - a.index;
      } else {
        // Popular / Default
        return a.index - b.index;
      }
    });
  },

  renderCards() {
    const container = document.getElementById('catalogCardsGrid');
    if (!container) return;

    const filtered = this.getFilteredTemplates();
    const visibleItems = filtered.slice(0, this.displayLimit);

    if (visibleItems.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No templates found</h3>
          <p>Try clearing your search query or choosing another category.</p>
          <button type="button" class="btn btn-secondary btn-sm" onclick="TemplateCatalogApp.resetFilters()" style="margin-top: 1rem;">
            Reset Filters
          </button>
        </div>
      `;
      this.updateLoadMoreButton(filtered.length);
      this.updateCounter(0, filtered.length);
      return;
    }

    container.innerHTML = visibleItems.map(item => this.createCardHTML(item)).join('');
    this.updateLoadMoreButton(filtered.length);
    this.updateCounter(visibleItems.length, filtered.length);
  },

  createCardHTML(item) {
    return `
      <div class="template-card" data-id="${item.id}">
        <div class="template-ribbon" style="background: ${item.colorHex};">
          ${item.badge}
        </div>

        <div class="template-card-preview" style="background: ${item.colorLight};">
          <!-- Mini Preview Canvas with Dynamic Archetypes -->
          <div class="template-mini-paper layout-${item.layout}" style="font-family: '${item.font}', sans-serif;">
            ${this.getMiniPaperContent(item)}
          </div>
        </div>

        <div class="template-card-info">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.35rem;">
            <h3 class="template-card-title">${item.name}</h3>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary);">ATS ${item.atsScore}%</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.85rem; font-size: 0.775rem; color: var(--text-muted);">
            <span class="color-indicator-dot" style="background: ${item.colorHex}; width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
            <span>${item.colorName}</span>
            <span>•</span>
            <span>${item.downloads} uses</span>
          </div>

          <p class="template-card-desc" style="font-size: 0.8125rem; margin-bottom: 1rem;">
            ${item.description}
          </p>

          <div style="display: grid; grid-template-columns: 1fr auto; gap: 0.5rem; margin-top: auto;">
            <button type="button" class="btn btn-primary btn-sm" onclick="TemplateCatalogApp.selectTemplate('${item.id}')">
              Use Template →
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="TemplateCatalogApp.previewModal('${item.id}')" title="Preview full size">
              👁️
            </button>
          </div>
        </div>
      </div>
    `;
  },

  getMiniPaperContent(item) {
    if (item.layout === 'executive' || item.layout === 'classic') {
      return `
        <div class="mini-header" style="text-align: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 4px;">
          <div class="mini-name" style="letter-spacing: 0.05em;">CANDIDATE NAME</div>
          <div class="mini-role" style="font-style: italic; color: ${item.colorHex};">Senior Executive Leader</div>
        </div>
        <div class="mini-line" style="width: 90%; margin: 4px auto 2px auto;"></div>
        <div class="mini-line" style="width: 75%; margin: 0 auto 5px auto;"></div>
        <div style="font-size: 6px; font-weight: 700; color: #0f172a; border-bottom: 0.5px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 3px;">EXPERIENCE</div>
        <div class="mini-line" style="width: 100%;"></div>
        <div class="mini-line" style="width: 85%;"></div>
        <div class="mini-line" style="width: 65%;"></div>
      `;
    } else if (item.layout === 'split') {
      return `
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 6px; height: 100%;">
          <div style="background: ${item.colorLight}; border-right: 1.5px solid ${item.colorHex}; padding-right: 4px;">
            <div style="width: 22px; height: 22px; border-radius: 50%; background: ${item.colorHex}; margin-bottom: 4px;"></div>
            <div style="font-size: 5px; font-weight: 700; color: ${item.colorHex}; margin-bottom: 2px;">SKILLS</div>
            <div class="mini-line" style="width: 90%; background: ${item.colorHex}; opacity: 0.4;"></div>
            <div class="mini-line" style="width: 75%; background: ${item.colorHex}; opacity: 0.4;"></div>
          </div>
          <div>
            <div class="mini-name" style="color: #0f172a;">CANDIDATE</div>
            <div class="mini-role" style="color: ${item.colorHex};">Specialist</div>
            <div class="mini-line" style="width: 100%; margin-top: 4px;"></div>
            <div class="mini-line" style="width: 80%;"></div>
            <div class="mini-line" style="width: 60%;"></div>
          </div>
        </div>
      `;
    } else if (item.layout === 'tech') {
      return `
        <div style="border-left: 2px solid ${item.colorHex}; padding-left: 4px; margin-bottom: 5px;">
          <div class="mini-name">&gt; CANDIDATE_DEV</div>
          <div class="mini-role" style="color: ${item.colorHex};">Systems & Cloud Architect</div>
        </div>
        <div class="mini-chip-row">
          <span class="mini-chip" style="background: ${item.colorLight}; color: ${item.colorHex};">Go</span>
          <span class="mini-chip" style="background: ${item.colorLight}; color: ${item.colorHex};">K8s</span>
          <span class="mini-chip" style="background: ${item.colorLight}; color: ${item.colorHex};">Rust</span>
        </div>
        <div class="mini-line" style="width: 100%; margin-top: 5px;"></div>
        <div class="mini-line" style="width: 75%;"></div>
      `;
    } else {
      // Modern Clean & Compact default
      return `
        <div class="mini-header" style="border-bottom: 1.5px solid ${item.colorHex};">
          <div class="mini-name">ALEX MORGAN</div>
          <div class="mini-role" style="color: ${item.colorHex};">Product & Tech Specialist</div>
        </div>
        <div class="mini-line" style="width: 90%; margin-top: 4px;"></div>
        <div class="mini-line" style="width: 70%;"></div>
        <div class="mini-chip-row" style="margin-top: 4px;">
          <span class="mini-chip" style="background: ${item.colorLight}; color: ${item.colorHex};">React</span>
          <span class="mini-chip" style="background: ${item.colorLight}; color: ${item.colorHex};">TypeScript</span>
          <span class="mini-chip" style="background: ${item.colorLight}; color: ${item.colorHex};">Cloud</span>
        </div>
        <div class="mini-line" style="width: 100%; margin-top: 6px;"></div>
        <div class="mini-line" style="width: 80%;"></div>
      `;
    }
  },

  bindEvents() {
    // Category tabs
    document.querySelectorAll('.catalog-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.catalog-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.dataset.cat;
        this.displayLimit = 12; // Reset pagination
        this.renderCards();
      });
    });

    // Search input
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentSearch = e.target.value.trim();
        this.displayLimit = 12;
        this.renderCards();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderCards();
      });
    }

    // Color Swatches Filter
    document.querySelectorAll('.catalog-color-filter').forEach(dot => {
      dot.addEventListener('click', (e) => {
        document.querySelectorAll('.catalog-color-filter').forEach(d => d.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentColor = e.currentTarget.dataset.color;
        this.displayLimit = 12;
        this.renderCards();
      });
    });

    // Load More Button
    const loadMoreBtn = document.getElementById('catalogLoadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.displayLimit += 12;
        this.renderCards();
      });
    }
  },

  updateLoadMoreButton(totalCount) {
    const btn = document.getElementById('catalogLoadMoreBtn');
    if (!btn) return;
    if (this.displayLimit >= totalCount) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-flex';
      btn.textContent = `Load More Templates (${totalCount - this.displayLimit} remaining) ↓`;
    }
  },

  updateCounter(visible = null, total = null) {
    const counter = document.getElementById('catalogResultsCounter');
    if (!counter) return;

    if (total === null) {
      const filtered = this.getFilteredTemplates();
      total = filtered.length;
      visible = Math.min(this.displayLimit, total);
    }
    counter.textContent = `Showing ${visible} of ${total} Templates`;
  },

  resetFilters() {
    this.currentCategory = 'all';
    this.currentSearch = '';
    this.currentColor = 'all';
    this.currentSort = 'popular';
    this.displayLimit = 12;

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.catalog-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === 'all');
    });

    document.querySelectorAll('.catalog-color-filter').forEach(d => {
      d.classList.toggle('active', d.dataset.color === 'all');
    });

    this.renderCards();
  },

  // Apply template and launch builder
  selectTemplate(templateId) {
    const tpl = this.templates.find(t => t.id === templateId);
    if (!tpl) return;

    // Apply layout, color, and font
    if (window.ResumeTemplates) {
      window.ResumeTemplates.setTemplate(tpl.layout);
      window.ResumeTemplates.setAccentColor(tpl.colorHex);
    }

    // Apply font to resume paper
    document.documentElement.style.setProperty('--resume-font', `'${tpl.font}', sans-serif`);

    if (typeof openBuilder === 'function') {
      openBuilder(tpl.layout);
    }

    if (window.showToast) {
      window.showToast(`Applied "${tpl.name}" template in ${tpl.colorName}!`, 'success');
    }

    this.closeModal();
  },

  // Full-size Preview Modal
  previewModal(templateId) {
    const tpl = this.templates.find(t => t.id === templateId);
    if (!tpl) return;

    const modal = document.getElementById('templatePreviewModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalTplTitle');
    const badgeEl = document.getElementById('modalTplBadge');
    const metaEl = document.getElementById('modalTplMeta');

    if (titleEl) titleEl.textContent = tpl.name;
    if (badgeEl) {
      badgeEl.textContent = tpl.badge;
      badgeEl.style.backgroundColor = tpl.colorHex;
    }
    if (metaEl) {
      metaEl.textContent = `Category: ${tpl.category.toUpperCase()} • Layout: ${tpl.layout.toUpperCase()} • ATS Score: ${tpl.atsScore}% • Font: ${tpl.fontName || tpl.font}`;
    }

    const previewPaper = document.getElementById('modalPreviewPaper');
    if (previewPaper && window.ResumeTemplates) {
      const resumeData = (window.ResumeApp && window.ResumeApp.data && window.ResumeApp.data.personal && window.ResumeApp.data.personal.fullName)
        ? window.ResumeApp.data
        : (typeof SAMPLE_RESUME_DATA !== 'undefined' ? SAMPLE_RESUME_DATA : { personal: { fullName: 'Alex Morgan' }, experience: [], education: [], skills: [] });

      previewPaper.className = `resume-paper template-${tpl.layout}`;
      previewPaper.style.setProperty('--resume-accent', tpl.colorHex);
      previewPaper.style.setProperty('--resume-accent-light', tpl.colorLight);
      previewPaper.style.setProperty('--resume-font', `'${tpl.font}', sans-serif`);
      previewPaper.innerHTML = window.ResumeTemplates.render(resumeData);
    }

    const selectBtn = document.getElementById('modalSelectTplBtn');
    if (selectBtn) {
      selectBtn.onclick = () => this.selectTemplate(tpl.id);
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Scroll modal body to top
    const modalBody = modal.querySelector('.template-modal-preview-body');
    if (modalBody) modalBody.scrollTop = 0;
  },

  closeModal() {
    const modal = document.getElementById('templatePreviewModal');
    if (modal) {
      modal.classList.remove('open');
    }
    document.body.style.overflow = ''; // Restore page scrolling
  }
};

window.TemplateCatalogApp = TemplateCatalogApp;

document.addEventListener('DOMContentLoaded', () => {
  TemplateCatalogApp.init();

  // Close preview modal button (X icon in header)
  const closeBtn = document.getElementById('modalPreviewClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => TemplateCatalogApp.closeModal());
  }

  // Close preview modal button (footer button)
  const footerCloseBtn = document.getElementById('modalFooterCloseBtn');
  if (footerCloseBtn) {
    footerCloseBtn.addEventListener('click', () => TemplateCatalogApp.closeModal());
  }

  // Backdrop overlay click to close
  const previewModalEl = document.getElementById('templatePreviewModal');
  if (previewModalEl) {
    previewModalEl.addEventListener('click', (e) => {
      if (e.target === previewModalEl) {
        TemplateCatalogApp.closeModal();
      }
    });
  }

  // Keyboard 'Escape' key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const modal = document.getElementById('templatePreviewModal');
      if (modal && modal.classList.contains('open')) {
        TemplateCatalogApp.closeModal();
      }
    }
  });
});

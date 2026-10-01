# 🚀 ResumeCraft Pro - Modern Resume Builder Web Application

Ek modern, responsive aur feature-rich **Resume Builder Web Application** jo pure **HTML5, Vanilla CSS3, aur JavaScript (ES6+)** me banayi gayi hai. Isme bina kisi heavy backend setup ke **Registration**, **Login / Authentication**, **Interactive Resume Builder (Dynamic Sections)**, **Real-time Live Preview**, aur **One-Click PDF Export** ki complete functionality integrated hai.

---

## ✨ Mukhya Features (Key Features)

1. **🔐 User Registration & Login (Client-Side Authentication)**
   - Form validation & accessible autofill attributes (`username`, `current-password`, `new-password`).
   - Show/Hide password toggle.
   - Session persistence in `localStorage`.
   - Top navbar me user profile avatar badge aur dropdown.
   - **⚡ 1-Click Quick Demo Login** (`demo@builder.com` / `password123`) for instant testing.

2. **🛠️ Dynamic Resume Builder**
   - **Personal Details**: Full Name, Job Title, Email, Phone, Location, Portfolio, LinkedIn, GitHub, aur Profile Photo upload (with preview & remove).
   - **Professional Summary**: Rich textarea with guidance.
   - **Work Experience**: Dynamic Add/Delete items (Position, Company, Location, Start Date, End Date, Currently Working checkbox, multiline bullet points).
   - **Education**: Dynamic Add/Delete items (Degree, University, Dates, Studying checkbox, CGPA).
   - **Skills & Technologies**: Interactive Tag-Input system (type and press Enter/Comma to create chips with remove button).
   - **Projects**: Title, Tech Stack, Live link, impact bullets.
   - **Certifications**: Certificate name, issuer, issue date.

3. **🎨 3 Professional Resume Templates & Color Theming**
   - **Modern Clean**: Stylish header, timeline markers, skill chips.
   - **Executive Elite**: Traditional serif typography, ATS friendly, corporate layout.
   - **Creative Minimal**: High-density tech portfolio format.
   - **Palette Switcher**: 6 curated colors (Sapphire Blue, Emerald Teal, Royale Violet, Crimson Rose, Midnight Slate, Warm Amber).

4. **📥 Instant PDF Export & Print**
   - Direct high-resolution A4 PDF download using `html2pdf.js`.
   - Browser Native Print (`window.print()`) with print CSS (`@media print`, zero margins, clean page-break).

5. **💾 Backup, Restore & Auto-Save**
   - LocalStorage auto-save draft functionality (refresh karne par data wipe nahi hoga).
   - User Account resume save.
   - Export to JSON backup and Import from JSON.
   - ✨ **"Sample Data"** button to load a realistic Senior Full Stack Engineer resume in 1-second.

6. **🌙 Dark / Light Mode**
   - Sleek glassmorphic theme toggle with saved preferences.

---

## 💻 Local Testing (Apne Computer Par Kaise Run Karein)

Aap is project ko kisi bhi modern browser me direct ya lightweight server ke zariye chala sakte hain:

### Option 1: Direct File Open
`index.html` file par double click karein ya right-click karke Chrome/Edge me open karein.

### Option 2: Live Server / Local Web Server (Recommended)
Agar aapke paas VS Code hai, toh **Live Server** extension se run karein, ya terminal me:

```bash
# Using Python
python -m http.server 3000

# OR using npx serve
npx serve .
```
Fir browser me `http://localhost:3000` kholein.

---

## 🌐 Vercel Par Deploy Karne Ka Step-by-Step Tarika

Aap is application ko Vercel par 2 aasan tareeko se deploy kar sakte hain:

### Tareeka 1: GitHub ke Zariye (Sabse Aasan & Recommended)

1. **GitHub Repository Banayein:**
   - [github.com](https://github.com) par jayein aur ek nayi repository banayein (e.g. `resume-builder`).
   - Apne project folder me terminal khol kar git initialize karein:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of ResumeCraft Pro"
     git branch -M main
     git remote add origin https://github.com/AAPKA_USERNAME/resume-builder.git
     git push -u origin main
     ```

2. **Vercel par Import Karein:**
   - [vercel.com](https://vercel.com) par jayein aur apne GitHub account se **Sign In** ya **Sign Up** karein.
   - Dashboard par **"Add New..."** -> **"Project"** button par click karein.
   - Apni GitHub repository (`resume-builder`) ke samne **"Import"** par click karein.
   - **Project Name** check karein (Framework Preset: **Other** rahega, koi build command ki zaroorat nahi hai kyonki yeh pure static web app hai).
   - **"Deploy"** button par click karein!

3. **Live URL Ready:**
   - 20-30 seconds me aapki application live ho jayegi aur aapko ek free URL mil jayega jaise:  
     `https://resume-builder-yourname.vercel.app`

---

### Tareeka 2: Vercel CLI ke Zariye (Direct Terminal se 1 Minute me)

1. Agar aapne pehle se Vercel CLI install nahi kiya hai, toh terminal me run karein:
   ```bash
   npm install -g vercel
   ```

2. Apne project directory (`c:\CodeHolic\ResumeBuilder`) me terminal khol kar run karein:
   ```bash
   vercel
   ```

3. Terminal aapse kuch simple sawaal puchega:
   - `Set up and deploy “c:\CodeHolic\ResumeBuilder”?` -> Type `y` aur press Enter.
   - `Which scope do you want to deploy to?` -> Apna Vercel account select karein.
   - `Link to existing project?` -> Type `n` aur press Enter.
   - `What’s your project’s name?` -> Press Enter (default name).
   - `In which directory is your code located?` -> Press Enter (`./`).

4. Deployment complete hote hi terminal aapko live URL de dega! Production deploy ke liye:
   ```bash
   vercel --prod
   ```

---

## 📁 Project Structure

```
ResumeBuilder/
├── css/
│   ├── style.css       # App theme, layouts, glassmorphism, responsive grid
│   ├── templates.css   # Resume templates (Modern, Executive, Creative)
│   └── print.css       # A4 print optimization & PDF styling
├── js/
│   ├── auth.js         # User registration, login, session persistence
│   ├── templates.js    # Template renderers & color scheme engine
│   ├── export.js       # PDF generation, JSON export/import, sample data
│   └── app.js          # Core reactive state, dynamic repeaters, live sync
├── index.html          # Main HTML structure with auth modal & live preview
├── vercel.json         # Vercel caching & routing headers
└── README.md           # Documentation & deployment guide
```

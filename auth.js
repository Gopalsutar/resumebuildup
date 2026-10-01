/**
 * RESUME BUILDER PRO - AUTH MODULE
 * Manages user registration, login, session persistence, and auth UI states.
 */

const AUTH_STORAGE_KEY = 'rb_users';
const SESSION_STORAGE_KEY = 'rb_current_user';

// Toast Notification Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Get all registered users
function getUsers() {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading users from localStorage', e);
    return [];
  }
}

// Save users list
function saveUsers(users) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users to localStorage', e);
  }
}

// Get currently logged-in user
function getCurrentUser() {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

// Set current session user
function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
  updateAuthUI();
}

// Register a new user
function registerUser(name, email, password) {
  name = name.trim();
  email = email.trim().toLowerCase();

  if (!name || !email || !password) {
    showToast('Please fill in all required fields.', 'error');
    return false;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters long.', 'error');
    return false;
  }

  const users = getUsers();
  const exists = users.find(u => u.email === email);
  if (exists) {
    showToast('This email is already registered. Please sign in instead.', 'error');
    return false;
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name,
    email,
    password, // In real backend use bcrypt; client-side simulation
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });

  showToast(`Welcome, ${newUser.name}! Account created successfully.`, 'success');
  closeAuthModal();
  return true;
}

// Login an existing user
function loginUser(email, password) {
  email = email.trim().toLowerCase();
  
  if (!email || !password) {
    showToast('Email and password are required.', 'error');
    return false;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showToast('Invalid email or password. Please try again.', 'error');
    return false;
  }

  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  showToast(`Welcome back, ${user.name}!`, 'success');
  closeAuthModal();

  // Load user's saved resume if available
  if (typeof loadUserResume === 'function') {
    loadUserResume(user.id);
  }

  return true;
}

// Logout user
function logoutUser() {
  const user = getCurrentUser();
  setCurrentUser(null);
  showToast('You have been signed out successfully.', 'info');
  
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.remove('show');
}

// Quick Demo Login for instant testing
function loginDemoUser() {
  let users = getUsers();
  let demo = users.find(u => u.email === 'demo@builder.com');
  
  if (!demo) {
    demo = {
      id: 'user_demo_101',
      name: 'Alex Morgan',
      email: 'demo@builder.com',
      password: 'password123',
      createdAt: new Date().toISOString()
    };
    users.push(demo);
    saveUsers(users);
  }

  setCurrentUser({ id: demo.id, name: demo.name, email: demo.email });
  showToast('Signed in as Demo User (Alex Morgan).', 'success');
  closeAuthModal();

  // Load sample resume data if available
  if (typeof loadSampleData === 'function') {
    loadSampleData();
  }
}

// Modal open/close handlers
function openAuthModal(defaultTab = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;

  switchAuthTab(defaultTab);
  modal.classList.add('open');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('tabBtnLogin');
  const regTab = document.getElementById('tabBtnRegister');
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.classList.add('active');
    regForm.classList.remove('active');
  } else {
    loginTab.classList.remove('active');
    regTab.classList.add('active');
    loginForm.classList.remove('active');
    regForm.classList.add('active');
  }
}

// Update Top Navbar UI depending on logged-in state
function updateAuthUI() {
  const user = getCurrentUser();
  const authBtn = document.getElementById('navAuthBtn');
  const userMenu = document.getElementById('navUserMenu');
  const userNameElem = document.getElementById('navUserName');
  const userAvatarElem = document.getElementById('navUserAvatar');

  if (user) {
    if (authBtn) authBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
    if (userNameElem) userNameElem.textContent = user.name;
    if (userAvatarElem) {
      const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      userAvatarElem.textContent = initials || 'U';
    }
  } else {
    if (authBtn) authBtn.style.display = 'inline-flex';
    if (userMenu) userMenu.style.display = 'none';
  }
}

// Initialize Auth Events
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();

  // Nav Auth Button
  const navAuthBtn = document.getElementById('navAuthBtn');
  if (navAuthBtn) {
    navAuthBtn.addEventListener('click', () => openAuthModal('login'));
  }

  // Close modal button & backdrop click
  const closeBtn = document.getElementById('authModalClose');
  const modalOverlay = document.getElementById('authModal');
  if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeAuthModal();
    });
  }

  // Switch tabs
  const tabBtnLogin = document.getElementById('tabBtnLogin');
  const tabBtnRegister = document.getElementById('tabBtnRegister');
  if (tabBtnLogin) tabBtnLogin.addEventListener('click', () => switchAuthTab('login'));
  if (tabBtnRegister) tabBtnRegister.addEventListener('click', () => switchAuthTab('register'));

  // Form Submissions
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPassword').value;
      loginUser(email, pass);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const pass = document.getElementById('regPassword').value;
      registerUser(name, email, pass);
    });
  }

  // Demo user quick login
  const demoLoginBtn = document.getElementById('demoLoginBtn');
  if (demoLoginBtn) demoLoginBtn.addEventListener('click', loginDemoUser);

  // User Dropdown toggle
  const userBadge = document.getElementById('userBadge');
  const userDropdown = document.getElementById('userDropdown');
  if (userBadge && userDropdown) {
    userBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      userDropdown.classList.remove('show');
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);

  // Password visibility toggles
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        this.textContent = '👁️‍🗨️';
      } else {
        input.type = 'password';
        this.textContent = '👁️';
      }
    });
  });
});

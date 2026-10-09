/**
 * Arun Shijo - Portfolio Application Logic
 * Coordinates GUI view, interactive terminal, mode switching,
 * welcome modal, and copy interactions.
 */

(function () {
  const D = window.PORTFOLIO_DATA;

  // DOM Elements
  const welcomeModal = document.getElementById("welcome-modal");
  const standardView = document.getElementById("standard-view");
  const terminalView = document.getElementById("terminal-view");
  const modeSwitchPill = document.getElementById("mode-switch-pill");
  const terminalSwitchPill = document.getElementById("terminal-switch-pill");
  const toastContainer = document.getElementById("toast-container");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const rigaTimeElements = document.querySelectorAll(".riga-time-display");

  let currentMode = "standard";

  // Initialize Application
  function initApp() {
    renderStandardPortfolioContent();
    setupLiveRigaClock();
    setupModeHandling();
    setupMobileMenu();
    setupScrollSpy();
    setupInteractiveWidgets();

    // Check Lucide
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    // Initialize Terminal
    if (window.initTerminal) {
      window.initTerminal();
    }
  }

  // Live Riga Time Display (EET/EEST)
  function setupLiveRigaClock() {
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Riga",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      rigaTimeElements.forEach(el => {
        el.textContent = `${timeStr} (Riga Time, GMT+3)`;
      });
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Mode Switch Management
  function setupModeHandling() {
    // Check URL parameters first: ?mode=terminal or ?mode=standard
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get("mode");

    // Check localStorage
    const savedMode = localStorage.getItem("arun_portfolio_mode");

    if (modeParam === "terminal" || modeParam === "standard") {
      setMode(modeParam);
      hideWelcomeModal();
    } else if (savedMode) {
      setMode(savedMode);
      hideWelcomeModal();
    } else {
      // First-time visitor: display welcome prompt
      showWelcomeModal();
    }

    // Modal Option Selectors
    const chooseStandardBtn = document.getElementById("choose-standard");
    const chooseTerminalBtn = document.getElementById("choose-terminal");

    if (chooseStandardBtn) {
      chooseStandardBtn.addEventListener("click", () => {
        setMode("standard");
        localStorage.setItem("arun_portfolio_mode", "standard");
        hideWelcomeModal();
      });
    }

    if (chooseTerminalBtn) {
      chooseTerminalBtn.addEventListener("click", () => {
        setMode("terminal");
        localStorage.setItem("arun_portfolio_mode", "terminal");
        hideWelcomeModal();
      });
    }

    // Header Mode Switches
    if (modeSwitchPill) {
      modeSwitchPill.addEventListener("click", () => {
        setMode("terminal");
      });
    }

    if (terminalSwitchPill) {
      terminalSwitchPill.addEventListener("click", () => {
        setMode("standard");
      });
    }

    // Global Keyboard Shortcuts (N for Normal, T for Terminal)
    // Only fires if user is not actively typing inside terminal-input or another field
    document.addEventListener("keydown", (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (activeTag === "input" || activeTag === "textarea" || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "n") {
        setMode("standard");
        hideWelcomeModal();
      } else if (key === "t") {
        setMode("terminal");
        hideWelcomeModal();
      }
    });

    // Expose global switcher for terminal commands
    window.switchPortfolioMode = function (targetMode) {
      setMode(targetMode);
    };
  }

  function showWelcomeModal() {
    if (welcomeModal) {
      welcomeModal.classList.remove("hidden");
      welcomeModal.classList.add("flex");
    }
  }

  function hideWelcomeModal() {
    if (welcomeModal) {
      welcomeModal.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => {
        welcomeModal.classList.add("hidden");
        welcomeModal.classList.remove("flex", "opacity-0", "pointer-events-none");
      }, 300);
    }
  }

  function setMode(mode) {
    currentMode = mode;

    if (mode === "terminal") {
      if (standardView) standardView.classList.add("hidden");
      if (terminalView) {
        terminalView.classList.remove("hidden");
        terminalView.classList.add("flex");
      }
      document.body.classList.add("terminal-active");
      // Focus terminal input
      if (window.terminalInstance) {
        setTimeout(() => window.terminalInstance.focusInput(), 100);
      }
      // Update page title
      document.title = "arun@riga-support:~$ | IT Support Specialist";
    } else {
      if (terminalView) {
        terminalView.classList.add("hidden");
        terminalView.classList.remove("flex");
      }
      if (standardView) {
        standardView.classList.remove("hidden");
      }
      document.body.classList.remove("terminal-active");
      document.title = "Arun Shijo — IT Support Specialist | Riga, Latvia";

      // Refresh icons in case
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    }
  }

  // Render Standard GUI Portfolio from PORTFOLIO_DATA
  function renderStandardPortfolioContent() {
    renderSkillsGrid();
    renderExperienceTimeline();
    renderEducationCards();
    renderLanguagesSection();
    renderAdditionalInfo();
  }

  // 1. Skills Matrix
  function renderSkillsGrid() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    let html = "";
    D.skills.categories.forEach(cat => {
      html += `
<div class="skill-card spot-card p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between">
  <div>
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
        <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
      </div>
      <div>
        <h3 class="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">${cat.title}</h3>
        <p class="text-xs text-zinc-400 mt-0.5 line-clamp-1">${cat.description}</p>
      </div>
    </div>
    <ul class="space-y-2 mt-4">
      ${cat.items.map(item => `
        <li class="flex items-center gap-2.5 text-sm text-zinc-300">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
          <span>${item}</span>
        </li>
      `).join("")}
    </ul>
  </div>
  <div class="mt-6 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
    <span>${cat.items.length} competencies</span>
    <span class="text-emerald-400/70 group-hover:text-emerald-400 transition-colors">Verified</span>
  </div>
</div>`;
    });

    container.innerHTML = html;
  }

  // 2. Experience Timeline
  function renderExperienceTimeline() {
    const container = document.getElementById("experience-container");
    if (!container) return;

    let html = "";
    D.experience.forEach((job, idx) => {
      html += `
<div class="relative pl-8 sm:pl-10 pb-12 last:pb-0 group">
  <!-- Timeline vertical connector -->
  <div class="absolute left-3 top-3 bottom-0 w-px bg-zinc-800 group-last:hidden"></div>
  
  <!-- Timeline node indicator -->
  <div class="absolute left-1 top-1.5 w-5 h-5 rounded-full bg-zinc-900 border-2 border-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
    <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
  </div>

  <!-- Job Card -->
  <div class="spot-card p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 shadow-xl">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
      <div>
        <div class="flex flex-wrap items-center gap-2.5">
          <h3 class="text-lg sm:text-xl font-bold text-zinc-100">${job.role}</h3>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">${job.badge}</span>
        </div>
        <div class="text-emerald-400 font-semibold text-sm sm:text-base mt-1 flex items-center gap-2">
          <span>${job.company}</span>
          <span class="text-zinc-600">·</span>
          <span class="text-zinc-400 font-normal text-xs sm:text-sm">📍 ${job.location}</span>
        </div>
      </div>
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 font-mono text-xs self-start sm:self-auto">
        <i data-lucide="calendar" class="w-3.5 h-3.5 text-emerald-400"></i>
        <span>${job.period}</span>
      </div>
    </div>

    <p class="text-zinc-300 text-sm leading-relaxed mb-4 font-sans">${job.description}</p>

    <!-- Responsibilities -->
    <div class="space-y-2 mb-5">
      <div class="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">Key Responsibilities & Impact:</div>
      <ul class="space-y-2 text-sm text-zinc-300">
        ${job.responsibilities.map(r => `
          <li class="flex items-start gap-2.5">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
            <span class="leading-relaxed">${r}</span>
          </li>
        `).join("")}
      </ul>
    </div>

    <!-- Tech Badges -->
    <div class="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/70">
      ${job.technologies.map(t => `
        <span class="px-2.5 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 text-xs font-mono hover:border-emerald-500/50 transition-colors">${t}</span>
      `).join("")}
    </div>
  </div>
</div>`;
    });

    container.innerHTML = html;
  }

  // 3. Education
  function renderEducationCards() {
    const container = document.getElementById("education-container");
    if (!container) return;

    let html = "";
    D.education.forEach(edu => {
      html += `
<div class="spot-card p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
        <i data-lucide="graduation-cap" class="w-6 h-6"></i>
      </div>
      <span class="px-3 py-1 rounded-full bg-zinc-800 text-cyan-400 border border-zinc-700 font-mono text-xs font-medium">${edu.period}</span>
    </div>
    <div class="mb-2">
      <span class="px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800 text-[11px] font-mono">${edu.badge}</span>
    </div>
    <h3 class="text-lg font-bold text-zinc-100">${edu.degree}</h3>
    <div class="text-sm text-cyan-400 font-medium mt-1">${edu.institution}</div>
    <div class="text-xs text-zinc-400 mt-0.5">📍 ${edu.location}</div>
    <ul class="space-y-1.5 mt-4 text-xs text-zinc-400 list-disc pl-4 marker:text-cyan-500">
      ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
    </ul>
  </div>
</div>`;
    });

    container.innerHTML = html;
  }

  // 4. Languages
  function renderLanguagesSection() {
    const container = document.getElementById("languages-container");
    if (!container) return;

    let html = "";
    D.languages.forEach(lang => {
      html += `
<div class="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300">
  <div class="flex items-center justify-between mb-2">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
        ${lang.name.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <h4 class="font-bold text-zinc-100 text-base">${lang.name}</h4>
        <span class="text-xs text-zinc-400 font-mono">${lang.badge}</span>
      </div>
    </div>
    <span class="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300 font-mono text-xs font-semibold">${lang.level}</span>
  </div>
  <p class="text-xs text-zinc-400 mt-2 leading-relaxed">${lang.description}</p>
</div>`;
    });

    container.innerHTML = html;
  }

  // 5. Additional Information & Driving Licence
  function renderAdditionalInfo() {
    const container = document.getElementById("additional-container");
    if (!container) return;

    let html = `
<div class="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-emerald-500/30 shadow-lg relative overflow-hidden">
  <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
  <div class="flex items-start gap-4">
    <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
      <i data-lucide="car" class="w-6 h-6"></i>
    </div>
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-mono font-semibold">ACTIVE & VALID</span>
        <h4 class="text-base font-bold text-zinc-100">${D.profile.licence}</h4>
      </div>
      <p class="text-sm text-zinc-300 mt-1 leading-relaxed">${D.profile.licenceDetails}</p>
      <div class="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-zinc-400">
        <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Field & On-site Support Ready</span>
        <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Hardware Transit Capability</span>
        <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Riga & Regional Dispatch</span>
      </div>
    </div>
  </div>
</div>`;

    container.innerHTML = html;
  }

  // Interactive Widgets: Copy-to-clipboard, scrollspy, filter tabs
  function setupInteractiveWidgets() {
    // Copy Buttons (email, phone, etc.)
    document.addEventListener("click", (e) => {
      const copyBtn = e.target.closest("[data-copy]");
      if (copyBtn) {
        const textToCopy = copyBtn.getAttribute("data-copy");
        const label = copyBtn.getAttribute("data-copy-label") || "Copied to clipboard!";
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(label);
          }).catch(() => {
            showToast(`Copied: ${textToCopy}`);
          });
        }
      }

      // Print Resume Action
      if (e.target.closest("#print-cv-btn")) {
        window.print();
      }

      // Reset Welcome Choice
      if (e.target.closest("#reset-preference-btn")) {
        localStorage.removeItem("arun_portfolio_mode");
        showWelcomeModal();
      }
    });

    // Skill Filter Tabs
    const filterTabs = document.querySelectorAll(".skill-filter-tab");
    filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        filterTabs.forEach(t => t.classList.remove("active", "bg-emerald-500", "text-black"));
        filterTabs.forEach(t => t.classList.add("bg-zinc-800", "text-zinc-300"));

        tab.classList.remove("bg-zinc-800", "text-zinc-300");
        tab.classList.add("active", "bg-emerald-500", "text-black");

        const filter = tab.getAttribute("data-filter");
        const cards = document.querySelectorAll("#skills-container .skill-card");

        cards.forEach((card, idx) => {
          const cat = D.skills.categories[idx];
          if (filter === "all" || cat.id === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  // Toast Notification System
  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "px-4 py-3 rounded-xl bg-zinc-900 border border-emerald-500/50 text-zinc-100 text-xs font-mono shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-2 opacity-0";
    toast.innerHTML = `
      <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    });

    // Dismiss
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  // Mobile Menu Setup
  function setupMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenu.classList.contains("hidden");
      if (isExpanded) {
        mobileMenu.classList.remove("hidden");
      } else {
        mobileMenu.classList.add("hidden");
      }
    });

    // Close on navigation link click
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // ScrollSpy for Nav Links
  function setupScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav-link");

    window.addEventListener("scroll", () => {
      let currentSectionId = "";
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${currentSectionId}`) {
          link.classList.add("text-emerald-400", "bg-zinc-800/80");
          link.classList.remove("text-zinc-400");
        } else {
          link.classList.remove("text-emerald-400", "bg-zinc-800/80");
          link.classList.add("text-zinc-400");
        }
      });
    });
  }

  // Boot on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

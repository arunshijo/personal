/**
 * Arun Shijo - Interactive IT Terminal Simulator
 * Inspired by Linux/Unix shells & vaisakh.dev terminal mode.
 * Safe frontend simulation - does NOT execute arbitrary system commands.
 */

(function () {
  const D = window.PORTFOLIO_DATA;

  // Terminal state
  const state = {
    history: [],
    historyIndex: -1,
    currentInput: ""
  };

  const COMMANDS = {
    help: {
      desc: "List all available terminal commands",
      usage: "help"
    },
    whoami: {
      desc: "Print current user identity and professional summary",
      usage: "whoami"
    },
    about: {
      desc: "Display detailed professional background and profile",
      usage: "about"
    },
    skills: {
      desc: "List verified technical skills across all domains",
      usage: "skills"
    },
    experience: {
      desc: "Display professional employment history (TELUS Digital, Goodluck IT)",
      usage: "experience"
    },
    education: {
      desc: "Display academic qualifications (MSc ISMA, BSc Calicut)",
      usage: "education"
    },
    contact: {
      desc: "Show verified contact channels (Email, Phone, LinkedIn)",
      usage: "contact"
    },
    languages: {
      desc: "Display spoken and professional languages",
      usage: "languages"
    },
    licence: {
      desc: "Display driving licence status (Latvian licence)",
      usage: "licence"
    },
    ls: {
      desc: "List virtual directory files",
      usage: "ls [-l]"
    },
    cat: {
      desc: "Read virtual file contents (e.g. cat skills.txt)",
      usage: "cat <filename>"
    },
    pwd: {
      desc: "Print current working directory",
      usage: "pwd"
    },
    neofetch: {
      desc: "Show system specs and IT summary card",
      usage: "neofetch"
    },
    ipconfig: {
      desc: "Simulate network interface and IP configuration",
      usage: "ipconfig (or ifconfig)"
    },
    ping: {
      desc: "Test network connectivity to a simulated host",
      usage: "ping <hostname>"
    },
    date: {
      desc: "Display current date and Riga local time",
      usage: "date"
    },
    uptime: {
      desc: "Show workstation uptime and support availability",
      usage: "uptime"
    },
    history: {
      desc: "View command history list",
      usage: "history"
    },
    clear: {
      desc: "Clear the terminal screen",
      usage: "clear (or cls)"
    },
    gui: {
      desc: "Switch to standard graphical portfolio",
      usage: "gui (or exit, portfolio, normal)"
    }
  };

  const ALL_COMMAND_NAMES = [
    "help", "whoami", "about", "skills", "experience", "exp",
    "education", "edu", "contact", "languages", "licence", "driving",
    "ls", "dir", "cat", "pwd", "neofetch", "sysinfo",
    "ipconfig", "ifconfig", "ping", "date", "uptime",
    "history", "clear", "cls", "gui", "exit", "portfolio", "normal", "sudo", "echo"
  ];

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderWelcomeBanner() {
    return `
<div class="term-banner select-none">
<pre class="term-ascii text-emerald-400 font-mono text-xs sm:text-sm leading-tight">
    ___                      ______  __     _     
   /   |  _______  ______   / ___/ / /_   (_)____ 
  / /| | / ___/ / / / __ \\  \\__ \\/ __ \\ / / __ \\
 / ___ |/ /  / /_/ / / / / ___/ / / / // / /_/ / 
/_/  |_/_/   \\__,_/_/ /_/ /____/_/ /_//_/\\____/  
</pre>
  <div class="mt-2 text-zinc-300 font-mono text-xs sm:text-sm">
    <span class="text-emerald-400 font-semibold">${D.profile.name}</span> — 
    <span class="text-cyan-400">${D.profile.primaryTitle}</span>
  </div>
  <div class="text-zinc-400 font-mono text-xs mt-1">
    📍 ${D.profile.location} · 🚗 ${D.profile.licence} · 🎓 MSc Computer Science
  </div>
  <div class="term-tip text-zinc-400 text-xs mt-3 p-2 rounded bg-zinc-900/80 border border-zinc-800">
    Type <span class="text-emerald-400 font-bold">help</span> to view commands, or 
    <span class="text-cyan-400 font-bold">gui</span> to switch to the standard portfolio.
    Try <span class="text-emerald-400 font-bold">skills</span>, <span class="text-emerald-400 font-bold">experience</span>, or <span class="text-emerald-400 font-bold">neofetch</span>.
  </div>
</div>`;
  }

  // Command handlers
  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return "";

    // Save to history
    state.history.push(trimmed);
    state.historyIndex = state.history.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
      case "?":
        return handleHelp();

      case "whoami":
        return handleWhoami();

      case "about":
      case "bio":
        return handleAbout();

      case "skills":
      case "skill":
        return handleSkills(args);

      case "experience":
      case "exp":
      case "work":
      case "jobs":
        return handleExperience();

      case "education":
      case "edu":
      case "degrees":
        return handleEducation();

      case "contact":
      case "reach":
      case "email":
        return handleContact();

      case "languages":
      case "lang":
        return handleLanguages();

      case "licence":
      case "license":
      case "driving":
        return handleLicence();

      case "ls":
      case "dir":
        return handleLs(args);

      case "cat":
        return handleCat(args);

      case "pwd":
        return `<div class="term-out text-zinc-300">/home/arun/portfolio</div>`;

      case "neofetch":
      case "sysinfo":
        return handleNeofetch();

      case "ipconfig":
      case "ifconfig":
        return handleIpconfig();

      case "ping":
        return handlePing(args);

      case "date":
        return handleDate();

      case "uptime":
        return handleUptime();

      case "history":
        return handleHistory();

      case "echo":
        return `<div class="term-out text-zinc-200">${escapeHtml(args.join(" "))}</div>`;

      case "sudo":
        return `<div class="term-out text-red-400">arun is not in the sudoers file. This incident will be reported to the IT Support Administrator.</div>`;

      case "clear":
      case "cls":
        return "__CLEAR__";

      case "gui":
      case "exit":
      case "portfolio":
      case "normal":
      case "quit":
        if (window.switchPortfolioMode) {
          setTimeout(() => window.switchPortfolioMode("standard"), 150);
          return `<div class="term-out text-emerald-400">Switching to Standard Portfolio Mode...</div>`;
        }
        return `<div class="term-out text-emerald-400">Please click "GUI Mode" at the top.</div>`;

      default:
        return handleUnknownCommand(cmd);
    }
  }

  function handleHelp() {
    let out = `<div class="term-out space-y-2">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">AVAILABLE COMMANDS</div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs">`;

    for (const [name, meta] of Object.entries(COMMANDS)) {
      out += `
    <div class="flex items-baseline">
      <span class="text-cyan-400 font-semibold w-24 shrink-0 font-mono">${name}</span>
      <span class="text-zinc-400 font-sans">${escapeHtml(meta.desc)}</span>
    </div>`;
    }

    out += `
  </div>
  <div class="text-zinc-500 text-xs pt-1 border-t border-zinc-800">
    Tip: Use <kbd class="px-1 py-0.5 bg-zinc-800 text-zinc-300 rounded text-[10px]">Tab</kbd> for auto-completion, 
    <kbd class="px-1 py-0.5 bg-zinc-800 text-zinc-300 rounded text-[10px]">↑</kbd> 
    <kbd class="px-1 py-0.5 bg-zinc-800 text-zinc-300 rounded text-[10px]">↓</kbd> for command history.
  </div>
</div>`;
    return out;
  }

  function handleWhoami() {
    return `
<div class="term-out space-y-2">
  <div class="flex items-center gap-2">
    <span class="px-2 py-0.5 text-xs rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-mono">STATUS: ACTIVE</span>
    <span class="text-xs text-zinc-400 font-mono">USER: arun (uid=1000)</span>
  </div>
  <div class="text-base text-zinc-100 font-bold">${D.profile.name}</div>
  <div class="text-cyan-400 text-sm font-mono">${D.profile.primaryTitle}</div>
  <div class="text-zinc-300 text-xs">📍 ${D.profile.location}</div>
  <p class="text-zinc-400 text-xs leading-relaxed max-w-2xl">${escapeHtml(D.profile.shortBio)}</p>
  <div class="flex flex-wrap gap-2 pt-1 text-xs font-mono">
    <a href="mailto:${D.profile.email}" class="text-emerald-400 underline hover:text-emerald-300">📧 ${D.profile.email}</a>
    <span class="text-zinc-600">|</span>
    <a href="tel:${D.profile.phoneClean}" class="text-emerald-400 underline hover:text-emerald-300">📞 ${D.profile.phone}</a>
    <span class="text-zinc-600">|</span>
    <a href="${D.profile.linkedin}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">🔗 LinkedIn Profile</a>
  </div>
</div>`;
  }

  function handleAbout() {
    return `
<div class="term-out space-y-3 max-w-3xl">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">ABOUT ARUN SHIJO</div>
  <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed">${escapeHtml(D.profile.longBio)}</p>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
    <div class="p-2 rounded bg-zinc-900/70 border border-zinc-800">
      <div class="text-zinc-400 text-[11px] uppercase tracking-wider font-mono">Location & Relocation</div>
      <div class="text-zinc-200 font-semibold mt-0.5">Riga, Latvia (Resident & Active)</div>
    </div>
    <div class="p-2 rounded bg-zinc-900/70 border border-zinc-800">
      <div class="text-zinc-400 text-[11px] uppercase tracking-wider font-mono">Mobility & Field Support</div>
      <div class="text-zinc-200 font-semibold mt-0.5">${D.profile.licence} (Valid)</div>
    </div>
    <div class="p-2 rounded bg-zinc-900/70 border border-zinc-800">
      <div class="text-zinc-400 text-[11px] uppercase tracking-wider font-mono">Highest Academic Qualification</div>
      <div class="text-zinc-200 font-semibold mt-0.5">MSc Computer Science — ISMA University (2023–2025)</div>
    </div>
    <div class="p-2 rounded bg-zinc-900/70 border border-zinc-800">
      <div class="text-zinc-400 text-[11px] uppercase tracking-wider font-mono">Enterprise Experience</div>
      <div class="text-zinc-200 font-semibold mt-0.5">TELUS Digital & Goodluck IT Solutions</div>
    </div>
  </div>
</div>`;
  }

  function handleSkills() {
    let out = `<div class="term-out space-y-3">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1 flex items-center justify-between">
    <span>TECHNICAL SKILLS MATRIX (Source: CV)</span>
    <span class="text-zinc-500 font-mono text-xs font-normal">${D.skills.all.length} Verified Competencies</span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">`;

    D.skills.categories.forEach(cat => {
      out += `
    <div class="p-2.5 rounded bg-zinc-900/70 border border-zinc-800/80">
      <div class="text-cyan-400 font-mono font-semibold text-xs mb-1.5 flex items-center gap-1.5">
        <span class="text-emerald-400">#</span> ${escapeHtml(cat.title)}
      </div>
      <ul class="space-y-1 text-xs text-zinc-300 font-mono">
        ${cat.items.map(item => `<li class="flex items-center gap-1.5"><span class="text-emerald-500 text-[10px]">●</span> ${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>`;
    });

    out += `
  </div>
</div>`;
    return out;
  }

  function handleExperience() {
    let out = `<div class="term-out space-y-4 max-w-3xl">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">PROFESSIONAL EMPLOYMENT HISTORY</div>`;

    D.experience.forEach((job, idx) => {
      out += `
  <div class="p-3 rounded bg-zinc-900/80 border border-zinc-800 space-y-2">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <div>
        <span class="text-base font-bold text-zinc-100">${escapeHtml(job.role)}</span>
        <span class="text-emerald-400 font-mono text-xs ml-1">@ ${escapeHtml(job.company)}</span>
      </div>
      <span class="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">${escapeHtml(job.period)}</span>
    </div>
    <div class="text-xs text-zinc-400 flex items-center gap-3 font-mono">
      <span>📍 ${escapeHtml(job.location)}</span>
      <span class="text-zinc-600">|</span>
      <span class="text-cyan-400">${escapeHtml(job.badge)}</span>
    </div>
    <p class="text-xs text-zinc-300 leading-relaxed">${escapeHtml(job.description)}</p>
    <div class="space-y-1 pt-1">
      <div class="text-[11px] font-mono text-zinc-500 uppercase">Core Responsibilities:</div>
      <ul class="text-xs text-zinc-300 space-y-1 font-sans pl-3 list-disc marker:text-emerald-500">
        ${job.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
      </ul>
    </div>
    <div class="flex flex-wrap gap-1.5 pt-2">
      ${job.technologies.map(t => `<span class="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-[11px] font-mono border border-zinc-700/60">${escapeHtml(t)}</span>`).join("")}
    </div>
  </div>`;
    });

    out += `</div>`;
    return out;
  }

  function handleEducation() {
    let out = `<div class="term-out space-y-3 max-w-2xl">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">ACADEMIC QUALIFICATIONS</div>`;

    D.education.forEach(edu => {
      out += `
  <div class="p-3 rounded bg-zinc-900/80 border border-zinc-800 space-y-1.5">
    <div class="flex items-baseline justify-between gap-2">
      <span class="text-sm font-bold text-zinc-100">${escapeHtml(edu.degree)}</span>
      <span class="text-xs font-mono text-emerald-400">${escapeHtml(edu.period)}</span>
    </div>
    <div class="text-xs text-cyan-400 font-mono">${escapeHtml(edu.institution)} · ${escapeHtml(edu.location)}</div>
    <ul class="text-xs text-zinc-400 space-y-0.5 pt-1 font-sans list-disc pl-4 marker:text-zinc-600">
      ${edu.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
    </ul>
  </div>`;
    });

    out += `</div>`;
    return out;
  }

  function handleContact() {
    return `
<div class="term-out space-y-3 max-w-xl">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">CONTACT & COMMUNICATION CHANNELS</div>
  <div class="space-y-2 text-xs font-mono">
    <div class="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
      <span class="text-zinc-400">Email:</span>
      <a href="mailto:${D.profile.email}" class="text-emerald-400 underline font-semibold hover:text-emerald-300">${D.profile.email}</a>
    </div>
    <div class="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
      <span class="text-zinc-400">Phone / WhatsApp:</span>
      <a href="tel:${D.profile.phoneClean}" class="text-emerald-400 underline font-semibold hover:text-emerald-300">${D.profile.phone}</a>
    </div>
    <div class="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
      <span class="text-zinc-400">LinkedIn:</span>
      <a href="${D.profile.linkedin}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline font-semibold hover:text-cyan-300">${D.profile.linkedin}</a>
    </div>
    <div class="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
      <span class="text-zinc-400">Location:</span>
      <span class="text-zinc-200">${D.profile.location} (EET/EEST timezone)</span>
    </div>
  </div>
  <div class="text-zinc-500 text-xs">
    Feel free to reach out directly via email or LinkedIn for recruitment inquiries.
  </div>
</div>`;
  }

  function handleLanguages() {
    let out = `<div class="term-out space-y-2 max-w-xl">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">LANGUAGES</div>
  <div class="space-y-2 text-xs">`;

    D.languages.forEach(lang => {
      out += `
    <div class="p-2 rounded bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
      <div>
        <span class="font-bold text-zinc-100">${escapeHtml(lang.name)}</span>
        <span class="text-zinc-500 font-mono text-[11px] ml-2">(${escapeHtml(lang.badge)})</span>
      </div>
      <span class="font-mono text-emerald-400 font-semibold">${escapeHtml(lang.level)}</span>
    </div>`;
    });

    out += `</div></div>`;
    return out;
  }

  function handleLicence() {
    return `
<div class="term-out space-y-2 max-w-xl">
  <div class="text-emerald-400 font-bold border-b border-zinc-800 pb-1">DRIVING LICENCE & MOBILITY</div>
  <div class="p-3 rounded bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-xs">
    <div class="flex items-center gap-2">
      <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[11px] border border-emerald-800">VALID</span>
      <span class="font-bold text-zinc-100">${D.profile.licence}</span>
    </div>
    <p class="text-zinc-400 leading-relaxed font-sans pt-1">${escapeHtml(D.profile.licenceDetails)}</p>
  </div>
</div>`;
  }

  function handleLs(args) {
    const files = Object.keys(D.virtualFiles);
    if (args.includes("-l") || args.includes("-la")) {
      let out = `<div class="term-out text-xs font-mono space-y-1 text-zinc-300">
  <div class="text-zinc-500">total ${files.length}</div>`;
      files.forEach(f => {
        const size = D.virtualFiles[f].join("\n").length;
        out += `<div>-rw-r--r-- 1 arun staff ${String(size).padStart(5, " ")} Jun 2026 <span class="text-cyan-400 font-semibold">${f}</span></div>`;
      });
      out += `</div>`;
      return out;
    }

    return `
<div class="term-out text-xs font-mono flex flex-wrap gap-4 text-cyan-400">
  ${files.map(f => `<span class="hover:underline cursor-pointer file-link" data-filename="${f}">📄 ${f}</span>`).join("")}
</div>
<div class="text-zinc-500 text-xs mt-1">Tip: Run <code class="text-emerald-400">cat &lt;filename&gt;</code> to read any file.</div>`;
  }

  function handleCat(args) {
    if (!args.length) {
      return `<div class="term-out text-yellow-400 text-xs font-mono">Usage: cat &lt;filename&gt; (e.g. cat skills.txt or cat README.md)</div>`;
    }

    const filename = args[0];
    const fileLines = D.virtualFiles[filename];

    if (!fileLines) {
      const available = Object.keys(D.virtualFiles).join(", ");
      return `<div class="term-out text-red-400 text-xs font-mono">cat: ${escapeHtml(filename)}: No such file.<br><span class="text-zinc-400">Available files: ${available}</span></div>`;
    }

    return `
<div class="term-out p-3 rounded bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed">${escapeHtml(fileLines.join("\n"))}</div>`;
  }

  function handleNeofetch() {
    return `
<div class="term-out font-mono text-xs flex flex-col md:flex-row gap-6 p-3 rounded bg-zinc-900/80 border border-zinc-800 max-w-2xl">
  <pre class="text-emerald-400 leading-tight shrink-0 select-none">
       /\\
      /  \\
     / /\\ \\     arun@riga-support
    / /__\\ \\    -----------------
   / /    \\ \\   OS: Arch Linux x86_64
  /_/      \\_\\  Host: IT Support Station
                Kernel: 6.8.9-support-lts
                Uptime: 24/7 Available
                Shell: bash 5.2.26
                Resolution: 1920x1080
                DE: GNOME 46
                WM: Mutter
                Terminal: arun-support-cli
                CPU: AMD Ryzen 7 / Core i7
                Memory: 32768MiB (Optimal)
  </pre>
  <div class="space-y-1 text-zinc-300 flex-1">
    <div><span class="text-emerald-400 font-bold">Name:</span> ${D.profile.name}</div>
    <div><span class="text-emerald-400 font-bold">Role:</span> ${D.profile.primaryTitle}</div>
    <div><span class="text-emerald-400 font-bold">Location:</span> ${D.profile.location}</div>
    <div><span class="text-emerald-400 font-bold">Education:</span> MSc Computer Science (ISMA)</div>
    <div><span class="text-emerald-400 font-bold">Key Skills:</span> Win10/11, Linux, M365, Hardware</div>
    <div><span class="text-emerald-400 font-bold">Languages:</span> English (Fluent), Latvian (Basic)</div>
    <div><span class="text-emerald-400 font-bold">Licence:</span> Valid Latvian driving licence</div>
    <div class="pt-2 flex gap-1.5 select-none">
      <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
      <span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
      <span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
      <span class="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span>
      <span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
      <span class="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
    </div>
  </div>
</div>`;
  }

  function handleIpconfig() {
    return `
<div class="term-out font-mono text-xs text-zinc-300 space-y-2 p-3 rounded bg-zinc-900/80 border border-zinc-800 max-w-xl">
  <div class="text-emerald-400 font-bold">Riga IT Support Workstation Network Configuration</div>
  <div class="border-t border-zinc-800 pt-1">
    <div class="text-cyan-400 font-semibold">Ethernet adapter eth0:</div>
    <div class="pl-4 space-y-0.5 text-zinc-400">
      <div>Connection-specific DNS Suffix  . : riga.it.local</div>
      <div>IPv4 Address. . . . . . . . . . . : <span class="text-zinc-200">192.168.1.142</span></div>
      <div>Subnet Mask . . . . . . . . . . . : <span class="text-zinc-200">255.255.255.0</span></div>
      <div>Default Gateway . . . . . . . . . : <span class="text-zinc-200">192.168.1.1</span></div>
      <div>DHCP Server . . . . . . . . . . . : <span class="text-zinc-200">192.168.1.1 (Lease Active)</span></div>
      <div>DNS Servers . . . . . . . . . . . : <span class="text-zinc-200">1.1.1.1, 8.8.8.8</span></div>
    </div>
  </div>
  <div class="text-zinc-500 text-[11px] pt-1">
    * Technical capabilities verified: TCP/IP, DNS, DHCP, Network Troubleshooting.
  </div>
</div>`;
  }

  function handlePing(args) {
    const target = args[0] || "google.com";
    return `
<div class="term-out font-mono text-xs text-zinc-300 space-y-1">
  <div>PING ${escapeHtml(target)} (172.217.16.206): 56 data bytes</div>
  <div>64 bytes from 172.217.16.206: icmp_seq=0 ttl=116 time=14.2 ms</div>
  <div>64 bytes from 172.217.16.206: icmp_seq=1 ttl=116 time=13.8 ms</div>
  <div>64 bytes from 172.217.16.206: icmp_seq=2 ttl=116 time=14.1 ms</div>
  <div>64 bytes from 172.217.16.206: icmp_seq=3 ttl=116 time=13.9 ms</div>
  <div class="text-emerald-400 pt-1">--- ${escapeHtml(target)} ping statistics --- 4 packets transmitted, 4 packets received, 0.0% packet loss</div>
</div>`;
  }

  function handleDate() {
    const now = new Date();
    const formatted = now.toLocaleString("en-GB", {
      timeZone: "Europe/Riga",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    return `<div class="term-out text-xs font-mono text-zinc-300">Riga, Latvia Time: <span class="text-emerald-400 font-semibold">${formatted} EEST</span></div>`;
  }

  function handleUptime() {
    return `<div class="term-out text-xs font-mono text-zinc-300">up 365 days, 99.9% support SLA uptime, 0 errors, load average: 0.12, 0.08, 0.05</div>`;
  }

  function handleHistory() {
    if (!state.history.length) {
      return `<div class="term-out text-xs font-mono text-zinc-500">No command history yet.</div>`;
    }
    return `
<div class="term-out text-xs font-mono space-y-0.5">
  ${state.history.map((cmd, idx) => `<div><span class="text-zinc-500 w-8 inline-block">${idx + 1}</span> <span class="text-zinc-200">${escapeHtml(cmd)}</span></div>`).join("")}
</div>`;
  }

  function handleUnknownCommand(cmd) {
    // Find closest command suggestion
    let suggestion = "";
    const lower = cmd.toLowerCase();
    for (const valid of ALL_COMMAND_NAMES) {
      if (valid.startsWith(lower) || valid.includes(lower)) {
        suggestion = valid;
        break;
      }
    }

    return `
<div class="term-out text-xs font-mono space-y-1">
  <div class="text-red-400">command not found: <span class="font-bold text-red-300">${escapeHtml(cmd)}</span></div>
  ${suggestion ? `<div class="text-yellow-400">Did you mean <span class="font-bold text-yellow-300 underline cursor-pointer quick-cmd" data-cmd="${suggestion}">${suggestion}</span>?</div>` : ""}
  <div class="text-zinc-500">Type <span class="text-emerald-400 font-bold">help</span> to view all available commands.</div>
</div>`;
  }

  // Terminal UI Controller
  class TerminalUI {
    constructor() {
      this.container = document.getElementById("terminal-screen");
      this.outputContainer = document.getElementById("terminal-output");
      this.input = document.getElementById("terminal-input");
      this.promptLabel = document.getElementById("terminal-prompt");
      this.init();
    }

    init() {
      if (!this.input || !this.outputContainer) return;

      // Print initial banner
      this.outputContainer.innerHTML = renderWelcomeBanner();

      // Handle keydown on input
      this.input.addEventListener("keydown", (e) => this.onKeyDown(e));

      // Click anywhere in screen focuses input
      if (this.container) {
        this.container.addEventListener("click", () => {
          this.input.focus();
        });
      }

      // Delegate click on command chips and links
      document.addEventListener("click", (e) => {
        const cmdBtn = e.target.closest("[data-cmd]");
        if (cmdBtn) {
          const cmd = cmdBtn.getAttribute("data-cmd");
          if (cmd) {
            this.runDirectCommand(cmd);
          }
          return;
        }

        const fileLink = e.target.closest(".file-link");
        if (fileLink) {
          const file = fileLink.getAttribute("data-filename");
          if (file) {
            this.runDirectCommand(`cat ${file}`);
          }
        }
      });
    }

    onKeyDown(e) {
      if (e.key === "Enter") {
        const val = this.input.value;
        this.input.value = "";
        this.processLine(val);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (state.history.length > 0) {
          if (state.historyIndex > 0) {
            state.historyIndex--;
          }
          this.input.value = state.history[state.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          this.input.value = state.history[state.historyIndex] || "";
        } else {
          state.historyIndex = state.history.length;
          this.input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.handleTabCompletion();
      } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        this.clearScreen();
      }
    }

    handleTabCompletion() {
      const val = this.input.value.trim();
      if (!val) return;

      const parts = val.split(/\s+/);
      if (parts.length === 1) {
        // Completing command
        const prefix = parts[0].toLowerCase();
        const matches = ALL_COMMAND_NAMES.filter(c => c.startsWith(prefix));
        if (matches.length === 1) {
          this.input.value = matches[0] + " ";
        } else if (matches.length > 1) {
          this.appendOutput(`<div class="term-line text-zinc-500 font-mono text-xs">${matches.join("  ")}</div>`);
        }
      } else if (parts.length === 2 && parts[0].toLowerCase() === "cat") {
        // Completing virtual files
        const prefix = parts[1].toLowerCase();
        const files = Object.keys(D.virtualFiles);
        const matches = files.filter(f => f.toLowerCase().startsWith(prefix));
        if (matches.length === 1) {
          this.input.value = `cat ${matches[0]}`;
        } else if (matches.length > 1) {
          this.appendOutput(`<div class="term-line text-zinc-500 font-mono text-xs">${matches.join("  ")}</div>`);
        }
      }
    }

    processLine(rawLine) {
      const trimmed = rawLine.trim();

      // Render executed command line
      const commandLineHtml = `
<div class="term-line flex items-center gap-2 font-mono text-xs mt-2">
  <span class="text-emerald-400 font-semibold select-none">arun@riga-support:~$</span>
  <span class="text-zinc-100 font-medium">${escapeHtml(trimmed)}</span>
</div>`;
      this.appendOutput(commandLineHtml);

      if (!trimmed) {
        this.scrollToBottom();
        return;
      }

      const result = executeCommand(trimmed);

      if (result === "__CLEAR__") {
        this.clearScreen();
      } else if (result) {
        this.appendOutput(result);
      }

      this.scrollToBottom();
    }

    runDirectCommand(cmdString) {
      if (!this.input) return;
      this.input.value = cmdString;
      this.input.focus();
      this.processLine(cmdString);
      this.input.value = "";
    }

    appendOutput(html) {
      if (!this.outputContainer) return;
      const div = document.createElement("div");
      div.innerHTML = html;
      this.outputContainer.appendChild(div);
    }

    clearScreen() {
      if (!this.outputContainer) return;
      this.outputContainer.innerHTML = "";
    }

    scrollToBottom() {
      if (this.container) {
        this.container.scrollTop = this.container.scrollHeight;
      }
    }

    focusInput() {
      if (this.input) {
        this.input.focus();
      }
    }
  }

  // Initialize terminal when DOM is ready
  window.initTerminal = function () {
    window.terminalInstance = new TerminalUI();
  };
})();

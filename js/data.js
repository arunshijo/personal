/**
 * Arun Shijo - Professional Portfolio Data
 * Single Source of Truth based strictly on verified CV data.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Arun Shijo",
    initials: "AS",
    titles: ["IT Support Specialist", "IT Support Technician"],
    primaryTitle: "IT Support Specialist | IT Support Technician",
    location: "Riga, Latvia",
    city: "Riga",
    country: "Latvia",
    email: "arunshijo789@gmail.com",
    phone: "+371 28774002",
    phoneClean: "+37128774002",
    linkedin: "https://www.linkedin.com/in/arunshijo/",
    availability: "Available for IT Support Opportunities in Riga / Hybrid / Remote",
    shortBio: "Customer-focused and detail-oriented IT Support Specialist with an MSc in Computer Science and hands-on enterprise support experience across Riga, Latvia and India. Specialized in incident management, hardware/software troubleshooting, Microsoft 365 administration, and user-centric help desk resolution.",
    longBio: "I am an IT Support Specialist based in Riga, Latvia, with a solid academic foundation comprising an MSc in Computer Science from ISMA University and a BSc in Computer Science from the University of Calicut. My professional background spans enterprise product support at TELUS Digital in Riga and hands-on IT support technician experience at Goodluck IT Solutions. I excel at diagnosing hardware, desktop, laptop, printer, and network issues (TCP/IP, DNS, DHCP), configuring Microsoft 365 and Google Workspace environments, managing ticketing systems and CRM workflows, and providing empathetic, high-standard technical support for both local and remote users.",
    licence: "Valid Latvian driving licence",
    licenceDetails: "Holds a valid Latvian driving licence, enabling prompt on-site technical dispatches, field support, equipment transit, and IT infrastructure servicing across Riga and surrounding areas."
  },

  skills: {
    categories: [
      {
        id: "os",
        title: "Operating Systems & Environments",
        icon: "monitor",
        description: "Core workstation platforms, deployment, configuration, and troubleshooting",
        items: ["Windows 10", "Windows 11", "Linux"]
      },
      {
        id: "hardware",
        title: "Hardware & Endpoint Support",
        icon: "cpu",
        description: "Hands-on diagnostic, assembly, repair, and peripheral maintenance",
        items: [
          "Hardware troubleshooting",
          "Desktop and laptop configuration",
          "Printer support",
          "Peripheral diagnostics & repair"
        ]
      },
      {
        id: "cloud",
        title: "Cloud & Productivity Suites",
        icon: "cloud",
        description: "Enterprise collaboration tools, user accounts, and tenant administration",
        items: [
          "Microsoft 365",
          "Microsoft Office",
          "Outlook",
          "Teams",
          "OneDrive",
          "SharePoint",
          "Google Workspace"
        ]
      },
      {
        id: "itsm",
        title: "ITSM & Help Desk Operations",
        icon: "headphones",
        description: "Ticketing workflows, SLA adherence, incident resolution, and client communication",
        items: [
          "Help desk support",
          "Incident management",
          "Ticketing systems",
          "Remote technical support",
          "Technical documentation",
          "CRM systems"
        ]
      },
      {
        id: "networking",
        title: "Networking & Protocols",
        icon: "network",
        description: "Local connectivity, IP address management, and network troubleshooting",
        items: [
          "TCP/IP",
          "DNS",
          "DHCP",
          "Network connectivity troubleshooting"
        ]
      }
    ],
    // Flat list of all official skills from CV
    all: [
      "Windows 10/11",
      "Linux",
      "Hardware troubleshooting",
      "Desktop and laptop configuration",
      "Printer support",
      "Microsoft 365",
      "Microsoft Office",
      "Outlook",
      "Teams",
      "OneDrive",
      "SharePoint",
      "Help desk support",
      "Incident management",
      "Ticketing systems",
      "Remote technical support",
      "Technical documentation",
      "TCP/IP",
      "DNS",
      "DHCP",
      "Google Workspace",
      "CRM systems"
    ]
  },

  experience: [
    {
      id: "telus-digital",
      role: "Product Support Specialist",
      company: "TELUS Digital",
      location: "Riga, Latvia",
      period: "May 2025 – June 2026",
      current: false,
      badge: "Enterprise Support",
      description: "Delivered tier-focused product and technical support for enterprise software solutions, ensuring rigorous SLA compliance, rapid issue escalation, and high user satisfaction.",
      responsibilities: [
        "Delivered technical product support to enterprise users, troubleshooting application errors, configuration anomalies, and workflow bottlenecks.",
        "Managed incident lifecycles through ticketing and CRM systems, tracking issues from initial report through root-cause resolution.",
        "Provided comprehensive remote technical assistance to end-users with clear, step-by-step guidance.",
        "Collaborated with cross-functional engineering and operations teams to escalate critical service tickets and verify fixes.",
        "Authored structured technical documentation, incident resolution logs, and knowledge-base guides to streamline resolution times across the team."
      ],
      technologies: [
        "Product Support",
        "Ticketing Systems",
        "CRM Systems",
        "Incident Management",
        "Remote Technical Support",
        "Technical Documentation",
        "Microsoft 365"
      ]
    },
    {
      id: "goodluck-it",
      role: "IT Support Technician",
      company: "Goodluck IT Solutions",
      location: "Calicut, India",
      period: "November 2022 – February 2023",
      current: false,
      badge: "Hardware & Help Desk",
      description: "Provided hands-on desktop, hardware, network, and software help desk support for client workstations, peripherals, and office infrastructure.",
      responsibilities: [
        "Performed hands-on hardware troubleshooting, component diagnostics, workstation assembly, and preventive maintenance on desktops and laptops.",
        "Configured and maintained operating systems across Windows 10/11 and Linux environments.",
        "Set up and maintained office peripherals, including network printers, scanners, and multi-function workstations.",
        "Assisted end-users with Microsoft Office, Outlook email configuration, Teams, OneDrive, SharePoint, and Google Workspace.",
        "Diagnosed basic local network issues involving TCP/IP parameters, DNS settings, and DHCP leases.",
        "Delivered prompt remote and on-site technical support to minimize business downtime."
      ],
      technologies: [
        "Windows 10/11",
        "Linux",
        "Hardware Troubleshooting",
        "Desktop & Laptop Configuration",
        "Printer Support",
        "TCP/IP, DNS, DHCP",
        "Microsoft 365",
        "Google Workspace"
      ]
    }
  ],

  education: [
    {
      degree: "MSc Computer Science",
      field: "Master of Science in Computer Science",
      institution: "ISMA University",
      location: "Riga, Latvia",
      period: "2023 – 2025",
      badge: "Master's Degree",
      highlights: [
        "Advanced study in computing systems, network infrastructures, and modern IT environments.",
        "Completed in Riga, Latvia, strengthening both technical depth and European professional immersion."
      ]
    },
    {
      degree: "BSc Computer Science",
      field: "Bachelor of Science in Computer Science",
      institution: "University of Calicut",
      location: "India",
      period: "2019 – 2022",
      badge: "Bachelor's Degree",
      highlights: [
        "Foundational computer science curriculum covering computer architecture, operating systems, data communications, and algorithmic problem-solving."
      ]
    }
  ],

  languages: [
    {
      name: "English",
      level: "Fluent",
      badge: "Full Professional",
      description: "Fluent written and spoken communication for global client interactions, technical writing, and corporate collaboration."
    },
    {
      name: "Latvian",
      level: "Basic",
      badge: "Elementary (A1-A2)",
      description: "Working knowledge of everyday phrases, workplace terminology, and basic conversational communication in Riga."
    },
    {
      name: "Italian",
      level: "Basic",
      badge: "Elementary",
      description: "Basic language comprehension and introductory communication skills."
    }
  ],

  additional: [
    {
      title: "Driving Licence",
      value: "Valid Latvian driving licence",
      icon: "car",
      description: "Full legal driving entitlement in Latvia, enabling rapid on-site IT calls, dispatch visits, and hardware transport."
    },
    {
      title: "Location & Relocation",
      value: "Riga, Latvia",
      icon: "map-pin",
      description: "Locally resident in Riga, immediately available for on-site, hybrid, or remote positions."
    }
  ],

  // Terminal Virtual Filesystem
  virtualFiles: {
    "README.md": [
      "# Arun Shijo — IT Support Specialist | IT Support Technician",
      "Location: Riga, Latvia",
      "Email: arunshijo789@gmail.com | Phone: +371 28774002",
      "LinkedIn: https://www.linkedin.com/in/arunshijo/",
      "",
      "## Welcome to my interactive IT Support shell.",
      "This environment simulates an administrative support console.",
      "Type 'help' to view all available commands.",
      "Type 'gui' or press [N] to switch to the standard graphical portfolio."
    ],
    "about.txt": [
      "=== ABOUT ARUN SHIJO ===",
      "Name: Arun Shijo",
      "Title: IT Support Specialist | IT Support Technician",
      "Location: Riga, Latvia",
      "",
      "Dedicated IT Support Specialist holding an MSc in Computer Science from ISMA University.",
      "Brings hands-on enterprise product support experience from TELUS Digital (Riga) and",
      "IT technician experience from Goodluck IT Solutions.",
      "Proficient across Windows 10/11, Linux, hardware diagnostics, Microsoft 365 administration,",
      "ticketing workflows, remote technical support, and TCP/IP, DNS, DHCP networking.",
      "",
      "Additional: Holds a valid Latvian driving licence for on-site dispatch flexibility."
    ],
    "skills.txt": [
      "=== TECHNICAL SKILLS MATRIX ===",
      "",
      "[Operating Systems]",
      "  - Windows 10",
      "  - Windows 11",
      "  - Linux",
      "",
      "[Hardware & Endpoints]",
      "  - Hardware troubleshooting",
      "  - Desktop and laptop configuration",
      "  - Printer support",
      "  - Peripheral diagnostics",
      "",
      "[Cloud & Collaboration]",
      "  - Microsoft 365, Microsoft Office",
      "  - Outlook, Teams, OneDrive, SharePoint",
      "  - Google Workspace",
      "",
      "[ITSM & Help Desk Operations]",
      "  - Help desk support",
      "  - Incident management",
      "  - Ticketing systems",
      "  - Remote technical support",
      "  - Technical documentation",
      "  - CRM systems",
      "",
      "[Networking]",
      "  - TCP/IP",
      "  - DNS",
      "  - DHCP"
    ],
    "experience.txt": [
      "=== PROFESSIONAL EXPERIENCE ===",
      "",
      "1. PRODUCT SUPPORT SPECIALIST",
      "   Company:  TELUS Digital",
      "   Location: Riga, Latvia",
      "   Dates:    May 2025 – June 2026",
      "   Key Highlights:",
      "     * Provided technical product support for enterprise client platforms.",
      "     * Managed incident tickets and workflow cases via ticketing and CRM systems.",
      "     * Handled remote support, troubleshooting, and user issue resolution.",
      "     * Authored technical documentation and SOP resolution guides.",
      "",
      "2. IT SUPPORT TECHNICIAN",
      "   Company:  Goodluck IT Solutions",
      "   Location: Calicut, India",
      "   Dates:    November 2022 – February 2023",
      "   Key Highlights:",
      "     * Hands-on hardware diagnostics, repair, and workstation configuration.",
      "     * Configured Windows 10/11 and Linux client environments.",
      "     * Deployed and maintained office printers and peripherals.",
      "     * Supported Microsoft 365, Office suites, and Google Workspace.",
      "     * Resolved network connectivity issues (TCP/IP, DNS, DHCP)."
    ],
    "education.txt": [
      "=== EDUCATION ===",
      "",
      "1. MSc Computer Science (2023 – 2025)",
      "   ISMA University — Riga, Latvia",
      "",
      "2. BSc Computer Science (2019 – 2022)",
      "   University of Calicut — India"
    ],
    "contact.txt": [
      "=== CONTACT CHANNELS ===",
      "Name:     Arun Shijo",
      "Location: Riga, Latvia",
      "Email:    arunshijo789@gmail.com",
      "Phone:    +371 28774002",
      "LinkedIn: https://www.linkedin.com/in/arunshijo/"
    ],
    "languages.txt": [
      "=== LANGUAGES ===",
      "English: Fluent (Full professional proficiency)",
      "Latvian: Basic  (Elementary / A1-A2, resident in Riga)",
      "Italian: Basic  (Elementary)"
    ],
    "licence.txt": [
      "=== DRIVING LICENCE ===",
      "Status: Valid Latvian driving licence (Active)",
      "Suitability: Ready for on-site support, equipment transit, and field calls across Latvia."
    ]
  }
};

// Freeze for integrity
if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_DATA);
}

// Export for Node environments if required
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}

/* ===== Initialize EmailJS ===== */
(function() {
    emailjs.init("hlf4vibdNVOLMu0OP");
})();

/* ===== DOM Elements ===== */
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const typingText = document.getElementById('typingText');

/* Terminal DOM */
const termBody = document.getElementById('terminalBody');
const termInput = document.getElementById('terminalInput');
const termPrompt = document.getElementById('terminalPrompt');

// ===== Theme Management =====
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
};

const updateThemeIcon = (theme) => {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ===== Navigation =====
// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

const updateActiveLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
};

// Navbar scroll effect
const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

/* ===== Typing Animation ===== */
const roles = [
    "Full-Stack Developer",
    ".NET · Python · Node.js · Next.js · Flutter",
    ".NET Specialist",
    "Flutter Developer",
    "Python/Django Expert",
    "Co-Founder at Veltric Solutions"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typeRole = () => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing new role
    }
    
    setTimeout(typeRole, typingSpeed);
};

// ===== Counter Animation =====
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// ===== Skill Bars Animation =====
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.classList.contains('stat-value')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('skills-bars')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.scroll-animate').forEach(el => {
    scrollObserver.observe(el);
});

document.querySelectorAll('.stat-value').forEach(el => {
    scrollObserver.observe(el);
});

document.querySelector('.skills-bars')?.addEventListener('animationend', animateSkillBars);

// ===== Particles Background =====
const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: var(--accent-primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
};

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Back to Top =====
const toggleBackToTop = () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
};

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Contact Form =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    try {
        // Send email using EmailJS
        await emailjs.send('service_6uv80hy', 'template_5pv3bpc', {
            from_name: formData.from_name,
            from_email: formData.from_email,
            message: `Subject: ${formData.subject}\n\nFrom: ${formData.from_email}\n\n${formData.message}`
        });
        
        // Show success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Failed to send email:', error);
        
        // Show error
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// ===== Parallax Effect =====
const parallaxElements = document.querySelectorAll('.parallax');

const handleParallax = () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
};

// ===== Mouse Move Effects =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move gradient background slightly
    const gradientBg = document.querySelector('.gradient-bg');
    if (gradientBg) {
        gradientBg.style.transform = `translate(${-50 + mouseX * 10}%, ${-50 + mouseY * 10}%)`;
    }
});

// ===== Project Card Tilt Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

/* ===== Terminal Emulator (zsh-like) ===== */
const Terminal = (() => {
    const state = {
        cwd: '~',
        user: 'albi',
        host: 'portfolio',
        history: [],
        historyIndex: -1,
        files: {
            '~': ['projects', 'resume.pdf', 'README.md', 'skills.txt'],
            '~/projects': ['veltric-solutions', 'test-platform', 'mobile-banking-app', 'ecommerce-platform']
        },
        fileContents: {
            'README.md': `Albi Idrizi — Full-Stack Developer & Co-Founder at Veltric Solutions
Specialties: .NET, Python, Node.js, Next.js, Flutter, Azure, SQL Server, PostgreSQL, MongoDB
Portfolio: https://github.com/aidrizi23  ·  Company: https://veltric.net`,
            'skills.txt': `.NET · Python · Node.js · Next.js · Flutter`
        }
    };

    const prompt = () => `${state.user}@${state.host}:${state.cwd}%`;

    const print = (text = '', cls = '') => {
        if (!termBody) return;
        const out = document.createElement('div');
        out.className = `terminal-output${cls ? ' ' + cls : ''}`;
        out.textContent = text;
        termBody.appendChild(out);
        termBody.scrollTop = termBody.scrollHeight;
    };

    const printLines = (lines = [], cls = '') => {
        lines.forEach(l => print(l, cls));
    };

    const setPrompt = () => {
        if (termPrompt) termPrompt.textContent = prompt();
    };

    const pathJoin = (base, seg) => {
        if (seg === '~' || seg === '') return '~';
        if (seg.startsWith('~/')) return seg;
        if (seg.startsWith('/')) return seg; // we keep virtual root simple
        if (base === '~') return `~/${seg}`;
        return `${base}/${seg}`;
    };

    const ls = (pathArg) => {
        const path = pathArg ? resolvePath(pathArg) : state.cwd;
        const list = state.files[path];
        if (!list) {
            print(`ls: cannot access '${pathArg || path}': No such file or directory`, 'error');
            return;
        }
        print(list.join('  '));
    };

    const resolvePath = (p) => {
        if (!p || p === '~') return '~';
        if (p.startsWith('~/')) return p;
        if (p === '..') {
            if (state.cwd === '~') return '~';
            const parts = state.cwd.split('/');
            parts.pop();
            return parts.join('/') || '~';
        }
        if (p === '.') return state.cwd;
        return pathJoin(state.cwd, p);
    };

    const cd = (dir) => {
        if (!dir || dir === '~') {
            state.cwd = '~';
            return;
        }
        const newPath = resolvePath(dir);
        if (state.files[newPath]) {
            state.cwd = newPath;
        } else {
            print(`cd: no such file or directory: ${dir}`, 'error');
        }
    };

    const cat = (file) => {
        if (!file) {
            print('cat: missing file operand', 'error');
            return;
        }
        const abs = file === 'README.md' || file === 'skills.txt'
            ? file
            : file.replace(/^~\//, '');

        const content = state.fileContents[abs];
        if (content) {
            print(content);
        } else {
            print(`cat: ${file}: No such file`, 'error');
        }
    };

    const manMap = {
        help: 'help — list available commands',
        clear: 'clear — clear the screen',
        echo: 'echo — print arguments',
        ls: 'ls [path] — list directory contents',
        cd: 'cd [dir] — change directory',
        pwd: 'pwd — print working directory',
        whoami: 'whoami — print effective user',
        uname: 'uname -a — print system information',
        date: 'date — print or set the system date and time',
        cat: 'cat [file] — print file contents',
        curl: 'curl [url] — fetch a URL (mock)',
        exit: 'exit — exit the terminal (mock)',
        projects: 'projects — list highlighted projects',
        skills: 'skills — show key skills'
    };

    const commands = {
        help: () => {
            print('Available commands:');
            print(Object.keys(manMap).sort().join('  '), 'muted');
        },
        clear: () => {
            if (!termBody) return;
            termBody.innerHTML = '';
        },
        echo: (...args) => print(args.join(' ')),
        pwd: () => print(state.cwd === '~' ? '/home/albi' : state.cwd.replace('~', '/home/albi')),
        ls: (arg) => ls(arg),
        cd: (arg) => cd(arg),
        whoami: () => print('albi'),
        uname: (...args) => {
            if (args[0] === '-a') {
                print('Linux portfolio 6.8.0 x86_64 GNU/Linux');
            } else {
                print('Linux');
            }
        },
        date: () => print(new Date().toString()),
        cat: (file) => cat(file),
        curl: (url) => {
            if (!url) return print('curl: try: curl https://veltric.net', 'error');
            print(`Fetching ${url} ...`);
            setTimeout(() => {
                if (/veltric\.net/.test(url)) {
                    print('200 OK');
                    print('<html><title>Veltric Solutions</title><body>Visit https://veltric.net</body></html>', 'muted');
                } else {
                    print('Simulated response (network disabled in demo).', 'muted');
                }
            }, 400);
        },
        exit: () => print('Use the site navigation to continue.'),
        man: (cmd) => {
            if (!cmd) return print('What manual page do you want?', 'error');
            const txt = manMap[cmd];
            if (txt) print(txt);
            else print(`No manual entry for ${cmd}`, 'error');
        },
        projects: () => {
            printLines([
                '- Veltric Solutions — https://veltric.net',
                '- Test Program Platform — .NET 8, SQL Server',
                '- Mobile Banking App — Flutter, Firebase',
                '- Second Hand E-commerce — .NET Core, Stripe'
            ]);
        },
        skills: () => {
            print('.NET · Python · Node.js · Next.js · Flutter');
        }
    };

    const run = (input) => {
        if (!input) return;
        state.history.push(input);
        state.historyIndex = state.history.length;
        const [cmd, ...args] = input.trim().split(/\s+/);
        if (cmd in commands) {
            commands[cmd](...args);
        } else {
            print(`${cmd}: command not found`, 'error');
        }
    };

    const handleKey = (e) => {
        if (!termInput) return;
        // History navigation
        if (e.key === 'ArrowUp') {
            if (state.historyIndex > 0) {
                state.historyIndex--;
                termInput.value = state.history[state.historyIndex] || '';
                e.preventDefault();
            }
        } else if (e.key === 'ArrowDown') {
            if (state.historyIndex < state.history.length) {
                state.historyIndex++;
                termInput.value = state.history[state.historyIndex] || '';
                e.preventDefault();
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            // Ctrl+L clear
            e.preventDefault();
            commands.clear();
        } else if (e.key === 'Enter') {
            const value = termInput.value;
            // Print prompt + command
            const line = document.createElement('div');
            line.className = 'terminal-line';
            const promptEl = document.createElement('span');
            promptEl.className = 'terminal-prompt';
            promptEl.textContent = prompt();
            const cmdEl = document.createElement('span');
            cmdEl.className = 'terminal-output';
            cmdEl.textContent = value;
            line.appendChild(promptEl);
            line.appendChild(cmdEl);
            termBody.appendChild(line);
            run(value);
            termInput.value = '';
            termBody.scrollTop = termBody.scrollHeight;
        }
    };

    const focusInput = () => termInput && termInput.focus();

    const boot = () => {
        if (!termBody || !termInput || !termPrompt) return;
        // Welcome message
        print('Welcome to the portfolio terminal (zsh). Type "help" to get started.');
        print('Highlight: .NET · Python · Node.js · Next.js · Flutter');
        setPrompt();
        termInput.addEventListener('keydown', handleKey);
        // Focus on click anywhere inside terminal
        termBody.parentElement?.addEventListener('click', focusInput);
        focusInput();
    };

    return { boot, setPrompt };
})();

/* ===== Loading Animation ===== */
window.addEventListener('load', () => {
    // Hide loader if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
    
    // Start animations
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
            }, index * 100);
        });
        
        document.querySelectorAll('.animate-slide-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);

    // Boot terminal once page loaded
    Terminal.boot();
});

// ===== Event Listeners =====
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveLink();
    toggleBackToTop();
    handleParallax();
});

window.addEventListener('resize', () => {
    // Handle resize events
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createParticles();
    typeRole();
    updateActiveLink();
    
    // Add scroll-animate class to elements
    const animateElements = [
        '.about-content',
        '.timeline-item',
        '.skill-category',
        '.project-card',
        '.contact-info',
        '.contact-form'
    ];
    
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-animate');
            scrollObserver.observe(el);
        });
    });
    
    // Observe skills bars section
    const skillsBarsSection = document.querySelector('.skills-bars');
    if (skillsBarsSection) {
        scrollObserver.observe(skillsBarsSection);
    }

    // Keep terminal prompt in sync on theme or other dynamic changes if needed
    Terminal.setPrompt?.();
});

// ===== Performance Optimization =====
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update animations here
    ticking = false;
}

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        requestTick();
    });
}, { passive: true });

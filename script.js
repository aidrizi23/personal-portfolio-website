// Terminal Emulator and Website Functionality
document.addEventListener('DOMContentLoaded', () => {
  // =============== Terminal Functionality ===============
  const terminal = document.getElementById('terminalBody');
  let commandHistory = [];
  let historyIndex = -1;
  
  // Array of quotes by famous programmers and technologists
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "Good code is its own best documentation. - Steve McConnell",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
    "Clean code always looks like it was written by someone who cares. - Robert C. Martin"
  ];

  // Welcome message when terminal loads
  function initializeTerminal() {
    addOutput("Welcome to Albi's portfolio terminal. Type 'help' for available commands.", false);
    addNewLine();
  }

  // Function to get a random quote
  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // Function to add a new input line to the terminal
  function addNewLine() {
    const newLine = document.createElement('div');
    newLine.className = 'terminal-line';
    newLine.innerHTML = `
      <span class="terminal-prompt">albi@portfolio:~$</span>
      <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
    `;
    terminal.appendChild(newLine);
    const input = newLine.querySelector('.terminal-input');
    input.focus();
    
    // Scroll to bottom of terminal
    terminal.scrollTop = terminal.scrollHeight;
    
    return input;
  }

  // Function to add output to the terminal
  function addOutput(output, addNewInputLine = true) {
    if (output) {
      // Handle multi-line output
      const lines = output.split('\n');
      
      lines.forEach(line => {
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line output-line';
        newLine.innerHTML = `<span class="terminal-output">${line}</span>`;
        terminal.appendChild(newLine);
      });
    }
    
    if (addNewInputLine) {
      addNewLine();
    }
    
    // Scroll to bottom of terminal
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Function to handle terminal input
  function processInput(input) {
    // Add to command history if not empty
    if (input && !commandHistory.includes(input)) {
      commandHistory.push(input);
      historyIndex = commandHistory.length;
    }

    // Parse command and arguments
    const args = input.split(' ');
    const command = args[0].toLowerCase();
    
    switch(command) {
      case 'help':
        return `Available commands:
help - Show this help message
clear - Clear the terminal
about - Show information about me
quote - Display a random programming quote
whoami - Display who I am
skills - List my technical skills
projects - List my projects
contact - Show contact information
echo <text> - Display the provided text
rev <text> - Reverse the provided text
date - Show current date and time
refresh - Reload the page
github - Open my GitHub profile
linkedin - Open my LinkedIn profile
weather <city> - Show weather for a city (simulated)
calc <expression> - Calculate a simple math expression`;
      
      case 'clear':
        terminal.innerHTML = '';
        return '';
      
      case 'about':
        return `I'm Albi Idrizi, a backend .NET developer specializing in building scalable solutions and robust APIs.
I'm passionate about clean architecture, microservices, and cloud-native applications.
Currently focusing on .NET 6+ development with C# and Azure.`;
      
      case 'quote':
        return getRandomQuote();
      
      case 'whoami':
        return 'Albi Idrizi - .NET Backend Developer';
      
      case 'skills':
        return `.NET Core/6+, C#, ASP.NET, REST APIs
SQL Server, Entity Framework, LINQ
Azure, Docker, Microservices
Python, Django, Go
Git, CI/CD, Agile Methodologies`;
      
      case 'echo':
        return args.slice(1).join(' ');
      
      case 'rev':
        return reverseString(args.slice(1).join(' '));
      
      case 'date':
        return new Date().toLocaleString();
      
      case 'refresh':
        location.reload();
        return '';
      
      case 'github':
        window.open('https://github.com/aidrizi23', '_blank');
        return 'Opening GitHub profile...';
      
      case 'linkedin':
        window.open('https://linkedin.com/in/albi-idrizi', '_blank');
        return 'Opening LinkedIn profile...';
      
      case 'projects':
        return `My projects:
1. Test Program Platform - Local test taking platform with .NET 8
2. Second Hand Ecommerce Store - Backend for second hand products
3. Nest Albania - Real Estate agency management application
4. Personal Portfolio Website - This website
5. Python Web Scraper - Web scraper for Century21 properties

Type 'project <number>' for more details`;

      case 'project':
        const projectNum = parseInt(args[1]);
        if (isNaN(projectNum) || projectNum < 1 || projectNum > 5) {
          return 'Please provide a valid project number (1-5)';
        }
        
        const projects = [
          'Test Program Platform: Local test taking platform built with .NET 8, MVC pattern, Dependency Injection and Identity Services.',
          'Second Hand Ecommerce Store: Open source backend project for a functional ecommerce store for second hand products.',
          'Nest Albania: Real Estate agency management web application with integrated analytics tools.',
          'Personal Portfolio Website: This website built with HTML, CSS, and vanilla JavaScript.',
          'Python Web Scraper: Web scraper for Albanian properties on Century21 website.'
        ];
        
        return projects[projectNum - 1];
      
      case 'contact':
        return `Email: albiidrizi27@gmail.com
GitHub: github.com/aidrizi23
You can also use the contact form below to send me a message.`;
      
      case 'weather':
        if (!args[1]) return 'Please specify a city. Example: weather London';
        const city = args.slice(1).join(' ');
        const temps = [15, 18, 20, 22, 25, 17, 19, 21, 24, 16];
        const temp = temps[Math.floor(Math.random() * temps.length)];
        const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Clear'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        return `Weather in ${city}: ${temp}°C, ${condition}`;
      
      case 'calc':
        if (!args[1]) return 'Please provide an expression. Example: calc 5+5';
        const expr = args.slice(1).join('');
        try {
          // Simple safe evaluation for basic math
          // Note: This is a simplified version and not secure for production
          const sanitized = expr.replace(/[^0-9+\-*/.()]/g, '');
          const result = Function('"use strict";return (' + sanitized + ')')();
          return `${expr} = ${result}`;
        } catch (e) {
          return 'Invalid expression';
        }
        
      case '':
        return '';
        
      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  }

  // Function to reverse characters in a string
  function reverseString(str) {
    return str.split('').reverse().join('');
  }

  // Event delegation for terminal input
  terminal.addEventListener('keydown', (e) => {
    const inputElement = e.target;
    
    if (!inputElement.classList.contains('terminal-input')) return;
    
    if (e.key === 'Enter') {
      const input = inputElement.value.trim();
      inputElement.disabled = true; // Disable the current input line
      
      // Replace input with span to match styling
      const inputLine = inputElement.parentElement;
      inputLine.innerHTML = `
        <span class="terminal-prompt">albi@portfolio:~$</span>
        <span class="terminal-text">${input}</span>
      `;
      
      const output = processInput(input);
      addOutput(output);
    } 
    // Command history navigation
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputElement.value = commandHistory[historyIndex];
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputElement.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputElement.value = '';
      }
    }
    // Tab completion (simplified)
    else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'clear', 'about', 'quote', 'whoami', 'skills', 
                        'echo', 'rev', 'date', 'refresh', 'github', 'linkedin', 
                        'projects', 'project', 'contact', 'weather', 'calc'];
      const input = inputElement.value.toLowerCase();
      
      for (const cmd of commands) {
        if (cmd.startsWith(input)) {
          inputElement.value = cmd + ' ';
          break;
        }
      }
    }
  });

  // Initialize terminal
  initializeTerminal();

  // =============== Mobile Menu ===============
  // Create mobile menu button if it doesn't exist
  if (!document.querySelector('.mobile-menu-btn')) {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
      nav.insertBefore(mobileMenuBtn, navLinks);
      
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });
      
      // Close mobile menu when clicking on a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }
  }

  // =============== Smooth Scroll ===============
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // =============== Animation on Scroll ===============
  // Simple animation for elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .about, .contact');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  }
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});

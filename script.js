// Array of quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
];

const terminal = document.getElementById('terminalBody');

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
        <input type="text" class="terminal-input" autofocus>
    `;
    terminal.appendChild(newLine);
    newLine.querySelector('.terminal-input').focus();
    // this will make it so that the input fiels that we just created will be focused 
    // so each time i create a new input field i will automatically be able to type in it
}

// Function to handle terminal input
function processInput(input) {
    if (input === 'help')
        return 'Available commands: help, clear, about, quote, whoami, skills, echo <text>, rev <text>';
    if (input === 'clear') {
        terminal.innerHTML = ''; 
        return ''; 
    }
    if (input === 'about')
        return 'This is a simple terminal emulator created using HTML, CSS, and JavaScript.';
    if (input === 'quote')
        return getRandomQuote();

    if (input === 'whoami')
        return 'I am Albi, a backend .NET developer.'; 

    if (input === 'skills')
        return 'C#, .NET, ASP.NET, SQL, JavaScript, HTML, CSS, Git, Azure DevOps, Docker';

    // adding an echo command
    if (input.startsWith('echo ')) {
        return input.substring(5);
    }
   
    if (input.startsWith('rev ')) {
        return reverseString(input.substring(4));
    }

    if (input === 'poweroff') {
        const newWindow = window.open('', '_self');
        newWindow.close();
        return 'Goodbye!';
    }

    if(input === 'refresh') {
        location.reload();
        return '';
    }
    return `Command not found: ${input || ''}`;
}

// Function to add output to the terminal
function addOutput(output) {
    if (output) {
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        newLine.innerHTML = `<span class="terminal-output">${output}</span>`;
        terminal.appendChild(newLine);

        // this will add a terminal line without the terminal prompt cuz thats how it is lol
    }
    addNewLine(); // Add a new input line
}


// function to reverse characters in a string 
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}



// chatgpt code from here on
// Event delegation for terminal input
terminal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const inputElement = e.target;
        if (inputElement.classList.contains('terminal-input')) {
            const input = inputElement.value.trim();
            const output = processInput(input);
            inputElement.disabled = true; // Disable the current input line
            addOutput(output);
        }
    }
});

// When the document is loaded, add a new line to the terminal
document.addEventListener('DOMContentLoaded', () => {
    addNewLine();
});

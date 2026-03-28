// Intersection Observer for fade-up animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed nav
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navbar background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        nav.style.height = '70px';
    } else {
        nav.style.boxShadow = 'none';
        nav.style.height = '80px';
    }
});

// Custom Follower Cursor
const cursor = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;
    
    cursorX = cursorX + (distX * 0.15);
    cursorY = cursorY + (distY * 0.15);
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Contextual Cursor Colors
    const scrollPos = window.scrollY + 200;
    const sections = ['hero', 'skills', 'education', 'projects', 'contact'];
    
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                if (id === 'education') cursor.style.background = 'var(--purple)';
                else if (id === 'projects') cursor.style.background = 'var(--blue)';
                else cursor.style.background = 'var(--neon)';
                
                cursor.style.boxShadow = `0 0 20px ${cursor.style.background}`;
            }
        }
    });

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Timeline Track Animation
window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline');
    const track = document.querySelector('.timeline-track');
    
    if (timeline && track) {
        const scrolled = window.scrollY + (window.innerHeight / 2);
        const timelineTop = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        
        if (scrolled > timelineTop) {
            let progress = ((scrolled - timelineTop) / timelineHeight) * 100;
            track.style.height = `${Math.min(progress, 100)}%`;
            track.style.opacity = 1;
        }
    }
});

// 3D Tilt Effect for Project Cards
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Cursor expansion on interactive elements
const interactables = document.querySelectorAll('a, .btn, .skill-card, .project-card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(3)';
        cursor.style.background = 'rgba(100, 255, 218, 0.3)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'var(--neon)';
    });
});

// Digital Rain (Matrix) Animation
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const characters = '01';
const fontSize = 16;
const columns = width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawRain() {
    ctx.fillStyle = 'rgba(3, 3, 3, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#64ffda';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawRain, 33);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Terminal Typer Logic
const terminalText = [
    "git status",
    "On branch career",
    "Your branch is up to date...",
    "",
    "deba --version",
    "Debadatta Panda v2.0.26",
    "",
    "ls -la /projects",
    "drwxr-xr-x  evatrail",
    "drwxr-xr-x  ecommerce",
    "",
    "Initializing innovation...",
    "Ready."
];

const typerElement = document.getElementById('terminal-typer');
let linePosition = 0;
let charPosition = 0;

function typeTerminal() {
    if (linePosition < terminalText.length) {
        let currentString = terminalText[linePosition];
        
        if (charPosition < currentString.length) {
            typerElement.innerHTML += currentString.charAt(charPosition);
            charPosition++;
            setTimeout(typeTerminal, 30);
        } else {
            typerElement.innerHTML += "<br>";
            linePosition++;
            charPosition = 0;
            setTimeout(typeTerminal, 500);
        }
    }
}

// Start typing when section reaches view
const terminalObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        setTimeout(typeTerminal, 1000);
        terminalObserver.disconnect();
    }
}, { threshold: 0.1 });

const terminalNode = document.querySelector('.terminal');
if (terminalNode) terminalObserver.observe(terminalNode);



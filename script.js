// Feather Icons
feather.replace();

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Typing Effect
const typingElement = document.getElementById('typing-effect');
const words = ["Full Stack Developer", "Data Scientist", "Machine Learning Engineer", "Software Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    const currentChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);

    typingElement.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1200);
    }
}

// Scroll Reveal Animation
const scrollElements = document.querySelectorAll('.scroll-reveal');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};
const displayScrollElement = (element) => {
    element.classList.add('visible');
};
const hideScrollElement = (element) => {
    element.classList.remove('visible');
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
}

// --- 3D PARTICLE FIELD ---
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 2000;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 1.5,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animateParticles() {
    if (renderer) {
        requestAnimationFrame(animateParticles);
        renderParticles();
    }
}

function renderParticles() {
    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    if (particles) {
        particles.rotation.x = time * 0.2;
        particles.rotation.y = time * 0.2;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

// --- Project Data and Population ---
const projectsData = [
    { title: "ResuMentor", description: "A full-stack web application to automate and personalize the job application process using GenAI.", github: "https://github.com/Nishantr846/ResuMentorFlaskApp", live: "https://resumentor.onrender.com/", tech: "Flask / LangChain", image: "icons/Resumentor.png" },
    { title: "GreenGlow", description: "Plant care and disease detection platform that uses a CNN model to diagnose plant diseases with 97% accuracy.", github: "https://github.com/Nishantr846/GreenGlow", live: "https://greenglow-your-plants-guide.onrender.com/", tech: "Python / CNN", image: "icons/GreenGlow.png" },
    { title: "Sortify", description: "Interactive web application that visualizes various sorting algorithms in real-time to help understand their behavior.", github: "https://github.com/Nishantr846/Sortify", live: "https://nishantr846.github.io/Sortify/index.html", tech: "HTML / CSS / JS", image: "icons/sortify2.png" },
    { title: "IntelVids", description: "AI-powered video summarization platform that automatically condenses YouTube video content into concise bullet points.", github: "https://github.com/Nishantr846/IntelVids-YouTube-Video-Summarizer", live: null, tech: "GenAI / NLP", image: "icons/IntelVids.png" },
    { title: "ChronoMind", description: "A Streamlit-based web app that helps you maintain a daily journal and automatically generates weekly summaries using AI.", github: "https://github.com/Nishantr846/ChronoMind---Daily-Journal-Summarizer", live: "https://chronomind.streamlit.app/", tech: "Streamlit / GenAI", image: "icons/ChronoMind.png" },
    { title: "Twitter Sentiment Analysis", description: "Web application that analyzes the sentiment of tweets using TextBlob by fetching from the Twitter API.", github: "https://github.com/Nishantr846/Sentiment-Analysis-using-Textblob", live: "https://sentiment-analysis-kiit.streamlit.app/", tech: "Python / NLP", image: "icons/Sentiment.png" },
    { title: "Portfolio Website", description: "A responsive portfolio website built with HTML, CSS, and JavaScript, featuring a clean design and smooth animations.", github: "https://github.com/Nishantr846/Portfolio-Website", live: "https://nishantr846.github.io/Portfolio-Website/index.html", tech: "HTML / CSS / JS", image: "icons/Portfolio_ss.png" },
    { title: "Movie Recommender", description: "A machine learning system that suggests movies based on genres, keywords, cast, and crew.", github: "https://github.com/Nishantr846/Movies_Recommendation_System", live: null, tech: "ML / Python", image: "icons/movie.png" },
    { title: "Disease Prediction System", description: "A system that predicts health conditions based on symptoms using Machine Learning.", github: "https://github.com/Nishantr846/Multiple-Diseases-Prediction", live: "https://multiple-diseases-prediction-mahhqe7owqju2jh3raewvn.streamlit.app/", tech: "Streamlit / ML", image: "icons/multi_disease.png" },
    { title: "Dictionary App", description: "A web-based dictionary that provides definitions, phonetics, and examples using a Dictionary API.", github: "https://github.com/Nishantr846/Dictionary", live: "https://nishantr846.github.io/Dictionary/", tech: "JS / API", image: "icons/dictionary.png" },
    { title: "Weather App", description: "A web app that shows temperature, weather, and other details of a city using the Open Meteo API.", github: "https://github.com/Nishantr846/Weather", live: "https://nishantr846.github.io/Weather/", tech: "JS / API", image: "icons/Weather.png" }
];

function populateProjects() {
    const projectsGrid = document.querySelector('#projects .grid');
    projectsGrid.innerHTML = projectsData.map(p => `
                <div class="glass-card overflow-hidden flex flex-col">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold mb-2">${p.title}</h3>
                        <p class="text-slate-400 mb-4 flex-grow">${p.description}</p>
                        <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                            <div class="flex items-center gap-2">
                                <a href="${p.github}" target="_blank" class="text-slate-400 hover:text-sky-400 transition-colors"><i data-feather="github"></i></a>
                                ${p.live ? `<a href="${p.live}" target="_blank" class="text-slate-400 hover:text-sky-400 transition-colors"><i data-feather="external-link"></i></a>` : ''}
                            </div>
                            <span class="text-xs font-mono text-sky-400">${p.tech}</span>
                        </div>
                    </div>
                </div>
            `).join('');
    feather.replace();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initializations
    if (typingElement) setTimeout(type, 1000);
    initParticles();
    animateParticles();
    populateProjects();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check

    document.getElementById('view-work-btn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
});
// Three.js Setup
let scene, camera, renderer, particles, floatingObjects = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init3D() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Particle System
    createParticleSystem();

    // Floating 3D Objects
    createFloatingObjects();

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Mouse movement
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function createParticleSystem() {
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        // Color gradient based on position
        colors[i] = 0.4 + Math.random() * 0.6;     // R
        colors[i + 1] = 0.4 + Math.random() * 0.6; // G
        colors[i + 2] = 0.95;                       // B
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Store for animation
    window.particleSystem = particleSystem;
}

function createFloatingObjects() {
    const geometries = [
        new THREE.IcosahedronGeometry(5, 0),
        new THREE.OctahedronGeometry(4, 0),
        new THREE.TetrahedronGeometry(6, 0),
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.ConeGeometry(4, 8, 5)
    ];

    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x6366f1,
        emissiveIntensity: 0.1,
        shininess: 100,
        specular: 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });

    for (let i = 0; i < 5; i++) {
        const geometry = geometries[i];
        const mesh = new THREE.Mesh(geometry, material.clone());
        
        mesh.position.x = (Math.random() - 0.5) * 80;
        mesh.position.y = (Math.random() - 0.5) * 80;
        mesh.position.z = (Math.random() - 0.5) * 50;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.5 + 0.5,
            floatRange: Math.random() * 10 + 5,
            offset: Math.random() * Math.PI * 2
        };
        
        scene.add(mesh);
        floatingObjects.push(mesh);
    }
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particle system
    if (window.particleSystem) {
        window.particleSystem.rotation.x += 0.0005;
        window.particleSystem.rotation.y += 0.0005;
    }

    // Camera movement based on mouse
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate floating objects
    const time = Date.now() * 0.001;
    floatingObjects.forEach((obj) => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;
        
        obj.position.y += Math.sin(time * obj.userData.floatSpeed + obj.userData.offset) * 0.1;
        
        // Color shift based on scroll
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        obj.material.emissive = new THREE.Color().setHSL(0.7 - scrollProgress * 0.3, 0.8, 0.5);
    });

    renderer.render(scene, camera);
}

// Initialize 3D scene when page loads
window.addEventListener('load', () => {
    init3D();
    
    // Hide loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    themeIcon.textContent = isLightMode ? '☀️' : '🌙';
    
    // Update 3D object colors based on theme
    floatingObjects.forEach(obj => {
        obj.material.opacity = isLightMode ? 0.2 : 0.3;
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // GSAP animations for enhanced effects
            if (entry.target.classList.contains('timeline-item')) {
                gsap.from(entry.target.querySelector('.timeline-content'), {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
            
            if (entry.target.classList.contains('skill-card')) {
                gsap.from(entry.target, {
                    rotationY: 90,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.5
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and elements
document.querySelectorAll('section, .timeline-item, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// 3D tilt effect for project cards
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
        
        gsap.to(card, {
            rotationY: rotateY,
            rotationX: rotateX,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const text = subtitle.textContent;
// subtitle.textContent = '';

gsap.to(subtitle, {
    duration: 2,
    // text: text,
    ease: "none",
    delay: 1.5
});

// Active section highlighting in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // WebGL-based section transitions
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Update 3D scene based on scroll
    if (scene) {
        scene.fog = new THREE.Fog(0x0f172a, 50, 100 - scrollProgress * 50);
        
        // Move floating objects based on scroll
        floatingObjects.forEach((obj, i) => {
            obj.position.z = -20 + scrollProgress * 40 + i * 5;
        });
    }
});

// Profile frame particle effect
function createProfileParticles() {
    const profileFrame = document.querySelector('.profile-particles');
    if (!profileFrame) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#6366f1';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        profileFrame.appendChild(particle);
    }
}

createProfileParticles();

// Enhanced scroll-based animations
gsap.registerPlugin(ScrollTrigger);

// Timeline items with stagger
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Skill cards with 3D rotation
gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        rotationY: 180,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.7)"
    });
});
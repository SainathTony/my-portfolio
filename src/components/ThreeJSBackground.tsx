import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

interface ThreeJSBackgroundProps {
  darkMode: boolean;
  scrollProgress?: number;
}

const ThreeJSBackground: React.FC<ThreeJSBackgroundProps> = ({ darkMode, scrollProgress = 0 }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const geometricShapesRef = useRef<THREE.Group | null>(null);
  const wavesRef = useRef<THREE.Mesh | null>(null);
  const animationFrameId = useRef<number>(0);
  const sceneRefValue = useRef<THREE.Scene | null>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const timeRef = useRef<number>(0);

  // Create wave geometry
  const createWaveGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 50, 100, 100);
    const positions = geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      positions[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2;
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    timeRef.current += 0.01;
    
    // Animate particles with more sophisticated motion
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const originalPositions = particlesRef.current.userData.originalPositions as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        // Create wave-like motion
        positions[i] = x + Math.sin(timeRef.current + x * 0.01) * 0.5;
        positions[i + 1] = y + Math.cos(timeRef.current + y * 0.01) * 0.3;
        positions[i + 2] = z + Math.sin(timeRef.current + z * 0.01) * 0.2;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = timeRef.current * 0.1;
    }
    
    // Animate geometric shapes
    if (geometricShapesRef.current) {
      geometricShapesRef.current.children.forEach((child, index) => {
        child.rotation.x = timeRef.current * (0.5 + index * 0.1);
        child.rotation.y = timeRef.current * (0.3 + index * 0.05);
        child.position.y = Math.sin(timeRef.current + index) * 0.5;
      });
    }
    
    // Animate wave geometry
    if (wavesRef.current) {
      const geometry = wavesRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.1 + timeRef.current) * Math.cos(y * 0.1 + timeRef.current) * 1.5;
      }
      
      geometry.attributes.position.needsUpdate = true;
      wavesRef.current.rotation.z = timeRef.current * 0.05;
    }
    
    // Camera parallax based on scroll
    if (cameraRef.current) {
      cameraRef.current.position.y = scrollProgress * 10;
      cameraRef.current.rotation.x = scrollProgress * 0.1;
    }
    
    if (rendererRef.current && cameraRef.current && sceneRefValue.current) {
      rendererRef.current.render(sceneRefValue.current, cameraRef.current);
    }
  }, [scrollProgress]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!sceneRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRefValue.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    sceneRef.current.innerHTML = ''; // Clear any existing canvas
    sceneRef.current.appendChild(renderer.domElement);
    
    // Store refs
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create enhanced particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    const originalPosArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      
      posArray[i] = x;
      posArray[i + 1] = y;
      posArray[i + 2] = z;
      
      originalPosArray[i] = x;
      originalPosArray[i + 1] = y;
      originalPosArray[i + 2] = z;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: darkMode ? 0x6366f1 : 0x3b82f6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData.originalPositions = originalPosArray;
    scene.add(particles);
    particlesRef.current = particles;
    particleMaterialRef.current = particleMaterial;
    
    // Add geometric shapes
    const shapesGroup = new THREE.Group();
    
    // Create floating geometric shapes
    const shapes = [
      { geometry: new THREE.IcosahedronGeometry(0.5, 0), position: [-10, 5, -5] },
      { geometry: new THREE.OctahedronGeometry(0.7, 0), position: [10, -3, -8] },
      { geometry: new THREE.TetrahedronGeometry(0.6, 0), position: [-8, -5, -10] },
      { geometry: new THREE.DodecahedronGeometry(0.4, 0), position: [12, 8, -6] }
    ];
    
    shapes.forEach((shape) => {
      const material = new THREE.MeshBasicMaterial({
        color: darkMode ? 0x6366f1 : 0x3b82f6,
        transparent: true,
        opacity: 0.1,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(shape.geometry, material);
      mesh.position.set(shape.position[0], shape.position[1], shape.position[2]);
      shapesGroup.add(mesh);
    });
    
    scene.add(shapesGroup);
    geometricShapesRef.current = shapesGroup;
    
    // Add animated wave plane
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x1e1e2e : 0xf0f0f0,
      transparent: true,
      opacity: 0.03,
      wireframe: true
    });
    
    const waveMesh = new THREE.Mesh(createWaveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 4;
    waveMesh.position.z = -15;
    scene.add(waveMesh);
    wavesRef.current = waveMesh;
    
    // Start animation loop
    animate();
    
    // Add window resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      // Cancel animation frame
      cancelAnimationFrame(animationFrameId.current);
      
      // Remove event listener
      window.removeEventListener('resize', handleResize);
      
      // Clean up Three.js resources
      if (renderer) {
        if (sceneRef.current && renderer.domElement) {
          sceneRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      
      if (particles) {
        scene.remove(particles);
        particleGeometry.dispose();
        particleMaterial.dispose();
      }
      
      // Clear refs
      rendererRef.current = null;
      cameraRef.current = null;
      particlesRef.current = null;
      particleMaterialRef.current = null;
      geometricShapesRef.current = null;
      wavesRef.current = null;
    };
  }, [darkMode, animate, handleResize]);
  
  // Update colors when darkMode changes
  useEffect(() => {
    if (particleMaterialRef.current) {
      particleMaterialRef.current.color.set(darkMode ? 0x6366f1 : 0x3b82f6);
    }
    
    if (geometricShapesRef.current) {
      geometricShapesRef.current.children.forEach(child => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.color.set(darkMode ? 0x6366f1 : 0x3b82f6);
      });
    }
    
    if (wavesRef.current) {
      const material = wavesRef.current.material as THREE.MeshBasicMaterial;
      material.color.set(darkMode ? 0x1e1e2e : 0xf0f0f0);
    }
  }, [darkMode]);
  
  return (
    <div 
      ref={sceneRef} 
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    />
  );
};

export default React.memo(ThreeJSBackground);

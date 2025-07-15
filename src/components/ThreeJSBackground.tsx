import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import * as THREE from "three";

// Types
type SceneRefs = {
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  particles: THREE.Points | null;
  particleMaterial: THREE.PointsMaterial | null;
  shapes: THREE.Group | null;
  waves: THREE.Mesh | null;
  animationFrameId: number | null;
};

interface ShapeConfig {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
}

interface ThreeJSBackgroundProps {
  darkMode: boolean;
  scrollProgress?: number;
}

const ThreeJSBackground: React.FC<ThreeJSBackgroundProps> = ({
  darkMode,
  scrollProgress = 0,
}) => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<SceneRefs>({
    scene: null,
    renderer: null,
    camera: null,
    particles: null,
    particleMaterial: null,
    shapes: null,
    waves: null,
    animationFrameId: null,
  });
  const timeRef = useRef<number>(0);
  const originalPosArrayRef = useRef<Float32Array | null>(null);
  const isMounted = useRef<boolean>(false);

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
    const { camera, renderer } = sceneRefs.current;
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }, []);

  // Animation loop
  const updateAnimation = useCallback(() => {
    if (!isMounted.current) return;

    timeRef.current = timeRef.current || 0;
    timeRef.current += 0.01;

    const { particles, shapes, waves, camera, renderer, scene } =
      sceneRefs.current;

    // Animate particles
    if (particles?.geometry) {
      const positions = particles.geometry.attributes.position
        .array as Float32Array;
      const originalPositions = originalPosArrayRef.current;

      if (originalPositions) {
        for (let i = 0; i < positions.length; i += 3) {
          const x = originalPositions[i];
          const y = originalPositions[i + 1];
          const z = originalPositions[i + 2];

          positions[i] = x + Math.sin(timeRef.current + x * 0.01) * 0.5;
          positions[i + 1] = y + Math.cos(timeRef.current + y * 0.01) * 0.3;
          positions[i + 2] = z + Math.sin(timeRef.current + z * 0.01) * 0.2;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = timeRef.current * 0.1;
      }
    }

    // Animate geometric shapes
    if (shapes) {
      shapes.children.forEach((child, index) => {
        child.rotation.x = timeRef.current * (0.5 + index * 0.1);
        child.rotation.y = timeRef.current * (0.3 + index * 0.05);
        child.position.y = Math.sin(timeRef.current + index) * 0.5;
      });
    }

    // Animate wave geometry
    if (waves?.geometry) {
      const { position } = waves.geometry.attributes;
      if (position) {
        const posArray = position.array as Float32Array;
        for (let i = 0; i < posArray.length; i += 3) {
          const x = posArray[i];
          const y = posArray[i + 1];
          posArray[i + 2] =
            Math.sin(x * 0.1 + timeRef.current) *
            Math.cos(y * 0.1 + timeRef.current) *
            1.5;
        }
        position.needsUpdate = true;
      }
      waves.rotation.z = timeRef.current * 0.05;
    }

    // Camera parallax based on scroll
    if (camera) {
      camera.position.y = scrollProgress * 10;
      camera.rotation.x = scrollProgress * 0.1;
    }

    // Render the scene
    if (renderer && camera && scene) {
      renderer.render(scene, camera);
    }

    // Continue the animation loop
    sceneRefs.current.animationFrameId = requestAnimationFrame(updateAnimation);
  }, [scrollProgress]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    isMounted.current = true;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear container and append renderer
    const container = containerRef.current;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    const originalPosArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      const value = (Math.random() - 0.5) * 20;
      posArray[i] = value;
      originalPosArray[i] = value;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(posArray), 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: darkMode ? 0x6366f1 : 0x3b82f6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    originalPosArrayRef.current = originalPosArray;
    scene.add(particles);

    // Add geometric shapes
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Create floating geometric shapes
    const shapeConfigs: ShapeConfig[] = [
      {
        geometry: new THREE.IcosahedronGeometry(0.5, 0),
        position: [-10, 5, -5],
      },
      {
        geometry: new THREE.OctahedronGeometry(0.7, 0),
        position: [10, -3, -8],
      },
      {
        geometry: new THREE.TetrahedronGeometry(0.6, 0),
        position: [-8, -5, -10],
      },
      {
        geometry: new THREE.DodecahedronGeometry(0.4, 0),
        position: [8, 4, -12],
      },
    ];

    shapeConfigs.forEach((shape) => {
      const material = new THREE.MeshBasicMaterial({
        color: darkMode ? 0x6366f1 : 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(shape.geometry, material);
      mesh.position.set(...shape.position);
      shapesGroup.add(mesh);
    });

    // Add wave geometry
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x4f46e5 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const waveMesh = new THREE.Mesh(createWaveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 4;
    waveMesh.position.z = -15;
    scene.add(waveMesh);

    // Store references
    sceneRefs.current = {
      scene,
      renderer,
      camera,
      particles,
      particleMaterial,
      shapes: shapesGroup,
      waves: waveMesh,
      animationFrameId: null,
    };

    // Start animation
    updateAnimation();

    // Handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      isMounted.current = false;

      // Cancel animation frame
      if (sceneRefs.current.animationFrameId !== null) {
        cancelAnimationFrame(sceneRefs.current.animationFrameId);
      }

      // Remove event listeners
      window.removeEventListener("resize", handleResize);

      // Cleanup Three.js resources
      const { scene: currentScene, renderer: currentRenderer } =
        sceneRefs.current;

      if (currentRenderer) {
        currentRenderer.dispose();
      }

      if (currentScene) {
        // Dispose all geometries and materials
        currentScene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }

      // Clear the container
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      // Reset refs
      sceneRefs.current = {
        scene: null,
        renderer: null,
        camera: null,
        particles: null,
        particleMaterial: null,
        shapes: null,
        waves: null,
        animationFrameId: null,
      };
    };
  }, [darkMode, handleResize, updateAnimation, createWaveGeometry]);

  // Update colors when darkMode changes
  useEffect(() => {
    const { particleMaterial, shapes, waves } = sceneRefs.current;
    const color = darkMode ? 0x6366f1 : 0x3b82f6;
    const waveColor = darkMode ? 0x1e1e2e : 0xf0f0f0;

    if (particleMaterial) {
      particleMaterial.color.set(color);
    }

    if (shapes) {
      shapes.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshBasicMaterial
        ) {
          child.material.color.set(color);
        }
      });
    }

    if (waves?.material) {
      const material = waves.material as THREE.MeshBasicMaterial;
      material.color.set(waveColor);
    }
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ThreeJSBackground, (prevProps, nextProps) => {
  // Only re-render if darkMode changes
  return (
    prevProps.darkMode === nextProps.darkMode &&
    Math.abs(
      (prevProps.scrollProgress || 0) - (nextProps.scrollProgress || 0),
    ) < 0.01
  );
});

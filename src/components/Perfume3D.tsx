import { useRef, useState, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, OrbitControls, ContactShadows, useFBX } from '@react-three/drei';
import * as THREE from 'three';

// Simple Error Boundary for 3D components
class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// This component handles the loading of your uploaded .glb file
// To use it: 
// 1. Upload your file to /public/model.glb
// 2. The path matches '/model.glb'
function LoadedModel() {
  // fbx file is incompatible with THREE.FBXLoader, causing "Unknown property type" errors.
  // We fall back to the procedural bottle layout. 
  // For custom models, please use a .glb or .gltf format from Meshy AI.
  
  return <ProceduralBottle />;
}

function ProceduralBottle() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <boxGeometry args={[1, 1.5, 0.6]} />
          <meshPhysicalMaterial 
            color={hovered ? "#caf0f8" : "#ffffff"} 
            transmission={0.9} 
            thickness={0.5}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#001219" roughness={0.1} metalness={0.8} />
        </mesh>

        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.4]} />
          <meshStandardMaterial 
            color="#94d2bd" 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Perfume3D() {
  return (
    <div className="w-full h-[600px] bg-transparent">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={<ProceduralBottle />}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          
          <ErrorBoundary fallback={<ProceduralBottle />}>
            <LoadedModel />
          </ErrorBoundary>
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

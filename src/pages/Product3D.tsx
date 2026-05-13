import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls, useGLTF, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, Component, ReactNode, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

function ProductModel() {
  const { scene } = useGLTF('/product/Meshy_AI_Bleu_de_Chanel_0506122301_texture.glb');
  
  return (
    <primitive object={scene} scale={2} position={[0, -1, 0]} />
  );
}

export default function Product3D() {
  return (
    <div className="min-h-screen bg-kaori-teal text-white flex flex-col">
      {/* Spacer for fixed navbar */}
      <div className="pt-24 md:pt-32" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-kaori-mint/20 via-transparent to-transparent" />
        </div>
        
        <div className="w-full max-w-5xl aspect-square md:aspect-video rounded-3xl overflow-hidden glass-card relative z-10">
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={1} />
              
              <ErrorBoundary fallback={<ProceduralBottle />}>
                <ProductModel />
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
                enableZoom={true} 
                autoRotate 
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2 + 0.1}
                minPolarAngle={0}
              />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
               <p className="text-[10px] uppercase tracking-widest text-kaori-mint font-bold">Interactive 3D Preview</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center max-w-2xl mx-auto z-10">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest mb-6 uppercase">Product View</h1>
          <p className="text-white/60 font-light leading-relaxed">
            Explore the intricate details of our signature vessel. Every curve and form is meticulously designed to echo the elements of nature.
          </p>
        </div>
      </main>
    </div>
  );
}

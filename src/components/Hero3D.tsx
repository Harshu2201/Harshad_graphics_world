import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, TorusKnot, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

const AnimatedKnot = () => {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.25;
      ref.current.rotation.y += delta * 0.35;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <TorusKnot ref={ref} args={[1.1, 0.35, 220, 32]} scale={1}>
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={2}
        />
      </TorusKnot>
    </Float>
  );
};

const Orb = ({ position, color, scale = 0.5 }: { position: [number, number, number]; color: string; scale?: number }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere position={position} args={[scale, 32, 32]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.2} />
    </Sphere>
  </Float>
);

const Hero3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
          <AnimatedKnot />
          <Orb position={[-2.5, 1.5, -1]} color="#3b82f6" scale={0.35} />
          <Orb position={[2.7, -1.2, -1]} color="#ec4899" scale={0.28} />
          <Orb position={[2, 1.8, -2]} color="#7c3aed" scale={0.22} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;

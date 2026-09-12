import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Lightformer, MeshDistortMaterial, TorusKnot, Environment } from "@react-three/drei";
import { useRef } from "react";
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
      <TorusKnot ref={ref} args={[1.15, 0.3, 160, 24]} scale={1}>
        <MeshDistortMaterial
          color="#2563eb"
          emissive="#7c3aed"
          emissiveIntensity={0.16}
          roughness={0.22}
          metalness={0.82}
          distort={0.16}
          speed={1.2}
        />
      </TorusKnot>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <div className="hero-3d absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }} dpr={[1, 1.35]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 6]} intensity={1.5} color="#ffffff" />
        <group scale={0.92} position={[0, 0.1, -0.5]}>
          <AnimatedKnot />
        </group>
        <Environment>
          <Lightformer intensity={2} position={[0, 5, 1]} scale={[8, 8, 1]} />
          <Lightformer intensity={1.2} color="#93c5fd" position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
};

export default Hero3D;

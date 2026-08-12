import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  TorusKnot,
  Environment,
  Stars,
  Icosahedron,
  Torus,
} from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group, Mesh } from "three";

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

/** Slowly spinning wireframe shell around the knot. */
const WireShell = () => {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.12;
      ref.current.rotation.z += delta * 0.08;
    }
  });
  return (
    <Icosahedron ref={ref} args={[2.2, 1]}>
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.18} />
    </Icosahedron>
  );
};

/** Tilted glowing orbit rings. */
const OrbitRings = () => {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.25;
      ref.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });
  return (
    <group ref={ref}>
      <Torus args={[2.6, 0.012, 8, 160]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color="#ec4899" transparent opacity={0.5} />
      </Torus>
      <Torus args={[3.1, 0.01, 8, 160]} rotation={[Math.PI / 1.7, 0.4, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </Torus>
    </group>
  );
};

const Orb = ({ position, color, scale = 0.5 }: { position: [number, number, number]; color: string; scale?: number }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere position={position} args={[scale, 32, 32]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.2} />
    </Sphere>
  </Float>
);

/** Smooth pointer parallax for the whole scene. */
const ParallaxRig = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    const k = Math.min(1, delta * 2.5);
    ref.current.rotation.y += (pointer.x * 0.25 - ref.current.rotation.y) * k;
    ref.current.rotation.x += (-pointer.y * 0.18 - ref.current.rotation.x) * k;
  });
  return <group ref={ref}>{children}</group>;
};

const Hero3D = () => {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className="hero-3d absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
          <ParallaxRig>
            <group scale={small ? 0.62 : 1}>
            <AnimatedKnot />
            <WireShell />
            <OrbitRings />
            <Orb position={[-2.5, 1.5, -1]} color="#3b82f6" scale={0.35} />
            <Orb position={[2.7, -1.2, -1]} color="#ec4899" scale={0.28} />
            <Orb position={[2, 1.8, -2]} color="#7c3aed" scale={0.22} />
            <Orb position={[-2.2, -1.7, -2]} color="#22d3ee" scale={0.18} />
            </group>
          </ParallaxRig>
          <Stars radius={40} depth={30} count={900} factor={3} saturation={0} fade speed={0.6} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;

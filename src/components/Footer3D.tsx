import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

const SpinningCore = () => {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x += delta * 0.12;
    }
  });
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
      <Icosahedron ref={ref} args={[1.1, 1]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const Ribbons = () => {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.4;
      ref.current.rotation.x = Math.cos(clock.elapsedTime * 0.18) * 0.3;
    }
  });
  return (
    <group ref={ref}>
      <Torus args={[1.9, 0.008, 8, 140]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshBasicMaterial color="#ec4899" transparent opacity={0.55} />
      </Torus>
      <Torus args={[2.4, 0.006, 8, 140]} rotation={[Math.PI / 1.6, 0.5, 0]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.45} />
      </Torus>
    </group>
  );
};

const Dust = () => {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.06;
  });
  const dots: [number, number, number][] = [
    [-2.8, 0.9, -1],
    [2.9, -0.7, -1.5],
    [1.8, 1.3, -2],
    [-2, -1.2, -2],
    [0.4, 1.9, -2.5],
  ];
  return (
    <group ref={ref}>
      {dots.map((p, i) => (
        <Float key={i} speed={2 + i * 0.2} floatIntensity={2} rotationIntensity={1}>
          <Sphere position={p} args={[0.06 + (i % 3) * 0.03, 16, 16]}>
            <meshStandardMaterial
              color={i % 2 ? "#3b82f6" : "#ec4899"}
              emissive={i % 2 ? "#3b82f6" : "#ec4899"}
              emissiveIntensity={0.9}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

/** Ambient 3D layer for the footer. Decorative only. */
const Footer3D = () => (
  <div className="hero-3d absolute inset-0 pointer-events-none" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={1} color="#3b82f6" />
        <pointLight position={[-6, -4, -3]} intensity={0.7} color="#ec4899" />
        <group scale={0.85}>
          <SpinningCore />
          <Ribbons />
          <Dust />
        </group>
        <Stars radius={30} depth={20} count={400} factor={2.5} fade speed={0.5} />
      </Suspense>
    </Canvas>
  </div>
);

export default Footer3D;

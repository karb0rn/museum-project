import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

export default function ModelViewer({ children }) {
  const controlsRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleStart = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }

    clearTimeout(timeoutRef.current);
  };

  const handleEnd = () => {
    timeoutRef.current = setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = true;
      }
    }, 2000);
  };

  return (
    <div className="h-[600px] w-full overflow-hidden border border-stone-200 bg-stone-100">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={2} />

        <directionalLight
          position={[8, 8, 8]}
          intensity={3}
          castShadow
        />

        <directionalLight
          position={[-8, 5, 5]}
          intensity={2}
        />

        <directionalLight
          position={[0, -8, 5]}
          intensity={1}
        />

        <hemisphereLight
          intensity={1}
          groundColor="#888888"
        />

        {/* Model */}
        {children}

        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1}
          maxDistance={20}
          onStart={handleStart}
          onEnd={handleEnd}
        />
      </Canvas>
    </div>
  );
}
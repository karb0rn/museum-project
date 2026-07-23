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
    <div className="h-[600px] w-full bg-gray-300 rounded-xl">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <directionalLight position={[-5, 5, 5]} intensity={3} />
        <directionalLight position={[0, -5, 5]} intensity={2} />

        {children}

        <OrbitControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={0.6}
          enablePan={false}
          onStart={handleStart}
          onEnd={handleEnd}
        />
      </Canvas>
    </div>
  );
}
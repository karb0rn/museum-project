import { Center, useGLTF } from "@react-three/drei";

export default function ArtifactModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Center>
      <primitive
        object={scene}
        scale={3}
        position={[0, -0.5, 0]}
      />
    </Center>
  );
}
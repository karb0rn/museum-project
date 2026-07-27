import { Center, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

function GLTFModel({ modelPath }) {
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

function PLYModel({ modelPath }) {
  const geometry = useLoader(PLYLoader, modelPath);

  geometry.computeVertexNormals();
  geometry.center();
  geometry.computeBoundingSphere();

  geometry.computeVertexNormals();

  return (
    <Center>
      <mesh
        geometry={geometry}
        material={
          new MeshStandardMaterial({
            color: "#b0b0b0",
            roughness: 0.8,
            metalness: 0.1,
          })
        }
        scale={0.05}
        position={[0, 0, 0]}
      />
    </Center>
  );
}

export default function ArtifactModel({ modelPath }) {
  const extension = modelPath.split(".").pop().toLowerCase();

  if (extension === "ply") {
    return <PLYModel modelPath={modelPath} />;
  }

  return <GLTFModel modelPath={modelPath} />;
}
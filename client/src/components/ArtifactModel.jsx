import { Center, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
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
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.center();

  const size = new THREE.Vector3();
  geometry.boundingBox.getSize(size);

  console.log("Bounding Box:", geometry.boundingBox);
  console.log("Size:", size);

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 2 / maxDim : 1;

  return (
    <Center>
      <mesh
        geometry={geometry}
        scale={scale}
        rotation={[-Math.PI / 2, 0, 0]} // Try changing this if needed
      >
        <meshStandardMaterial
          color="red"
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
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
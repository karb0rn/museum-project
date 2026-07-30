import { Center, Html, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

function NoModel() {
  return (
    <Html center>
      <div
        style={{
          background: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          fontWeight: "bold",
          color: "#444",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        No 3D Model Available
      </div>
    </Html>
  );
}

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

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 2 / maxDim : 1;

  return (
    <Center>
      <mesh
        geometry={geometry}
        scale={scale}
        rotation={[-Math.PI / 2, 0, 0]}
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
  if (
    !modelPath ||
    typeof modelPath !== "string" ||
    modelPath.trim() === ""
  ) {
    return <NoModel />;
  }

  const cleanPath = modelPath.trim();
  const extension = cleanPath.split(".").pop().toLowerCase();

  if (extension === "ply") {
    return <PLYModel modelPath={cleanPath} />;
  }

  if (extension === "glb" || extension === "gltf") {
    return <GLTFModel modelPath={cleanPath} />;
  }

  return <NoModel />;
}

// Preload GLTF files
useGLTF.preload = useGLTF.preload || (() => { });
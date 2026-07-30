import { Center, Html, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
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

  const { clonedScene, scale } = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    clone.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const autoScale = maxDim > 0 ? 2 / maxDim : 1;

    return {
      clonedScene: clone,
      scale: autoScale,
    };
  }, [scene]);

  return (
    <Center>
      <primitive
        object={clonedScene}
        scale={scale}
      />
    </Center>
  );
}

function PLYModel({ modelPath }) {
  const geometry = useLoader(PLYLoader, modelPath);

  const { scale } = useMemo(() => {
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    geometry.center();

    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);

    return {
      scale: maxDim > 0 ? 2 / maxDim : 1,
    };
  }, [geometry]);

  return (
    <Center>
      <mesh
        geometry={geometry}
        scale={scale}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.7}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Center>
  );
}

export default function ArtifactModel({ modelPath }) {
  if (!modelPath?.trim()) {
    return <NoModel />;
  }

  const extension = modelPath
    .split("?")[0]
    .split(".")
    .pop()
    ?.toLowerCase();

  switch (extension) {
    case "ply":
      return <PLYModel modelPath={modelPath} />;

    case "glb":
    case "gltf":
      return <GLTFModel modelPath={modelPath} />;

    default:
      return <NoModel />;
  }
}
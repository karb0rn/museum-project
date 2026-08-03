import { Center, Html, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

function NoModel() {
  return (
    <Html center>
      <div className="border border-stone-300 bg-white px-5 py-3 text-xs font-medium uppercase tracking-widest text-stone-500">
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
          color="#d6cfc3"
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
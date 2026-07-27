import { Center, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
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
  console.log("Vertex Count:", geometry.attributes.position?.count);
  console.log("Normals:", geometry.attributes.normal);
  console.log("Colors:", geometry.attributes.color);
  console.log("Index:", geometry.index);

  geometry.computeBoundingBox();
  console.log("Bounding Box:", geometry.boundingBox);
  console.log(geometry);

  geometry.computeVertexNormals();
  geometry.center();
  geometry.computeBoundingSphere();

  geometry.computeVertexNormals();

  return (
    <Center>
      <points geometry={geometry} scale={0.05}>
        <pointsMaterial
          color="red"
          size={0.005}
        />
      </points>
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
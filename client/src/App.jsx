import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Admin from "./pages/Admin";
import ArtifactDetails from "./pages/ArtifactDetails";
import Home from "./pages/Home";


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/artifact/:id" element={<ArtifactDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
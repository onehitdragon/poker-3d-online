import { Box, CameraControls, Environment, GizmoHelper, GizmoViewport, PerspectiveCamera } from '@react-three/drei';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function App() {
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas style={{ height: "100vh" }}>
        <PerspectiveCamera />
        <CameraControls />
        <GizmoHelper>
          <GizmoViewport />
        </GizmoHelper>
        <Environment files="/assets/hdr/4k.hdr" background/>
        <Box />
      </Canvas>
    </Suspense>
  );
}

export default App;

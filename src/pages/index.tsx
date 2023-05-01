import DeckModel from "@/components/DeckModel";
import TableModel from "@/components/TableModel";
import { Billboard, Box, Environment, GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Plane, 
    TransformControls, Text, SpotLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useRef } from "react";
import { Euler, Vector3 } from "three";

export default function Home() {
    const {
        cameraControl,
        physicDebug,
        cameraPosistion,
        cameraRotation
    } = useControls({
        cameraControl: true,
        cameraPosistion: {
            x: 0,
            y: 1.29,
            z: 1.02
        },
        cameraRotation: {
            x: -0.45,
            y: 0,
            z: 0
        },
        physicDebug: false
    });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Canvas style={{ height: "100vh" }}>
                <Physics debug={physicDebug} gravity={[0, -1, 0]}>
                    <PerspectiveCamera
                        makeDefault
                        position={new Vector3(cameraPosistion.x, cameraPosistion.y, cameraPosistion.z)}
                        rotation={new Euler(cameraRotation.x, cameraRotation.y, cameraRotation.z)}/>
                    <OrbitControls enabled={cameraControl}/>
                    <GizmoHelper>
                        <GizmoViewport/>
                    </GizmoHelper>
                    <Perf position="bottom-left"/>
                    <Environment files="/assets/hdr/6k.hdr" background />
                    <TransformControls mode="translate">
                        <Plane args={[10, 10]} rotation={new Euler(Math.PI / 2, 0, 0)}/>
                    </TransformControls>
                    <TableModel />
                    <DeckModel />
                </Physics>
            </Canvas>
        </Suspense>
    )
}

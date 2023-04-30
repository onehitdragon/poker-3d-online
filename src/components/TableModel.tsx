import { Billboard, useGLTF, Text, Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { memo } from "react";

function TableModel(){
    const model = useGLTF("/assets/model/1.gltf");
    const { textPostion } = useControls({
        textPostion: {
            x: -0.24,
            y: 0.94,
            z: 0.49
        }
    });

    return (
        <RigidBody type="fixed" colliders={false}>
            <group>
                <primitive object={model.scene}/>
                <group position={[textPostion.x, textPostion.y, textPostion.z]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }}
                            position={[0, 0, 0]}>
                                250g
                        </Text>
                    </Billboard>
                </group>
                <group position={[-0.40, 0.94, 0.19]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }}
                            position={[0, 0, 0]}>
                                250g
                        </Text>
                    </Billboard>
                </group>
                <group position={[-0.37, 0.94, -0.31]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }}
                            position={[0, 0, 0]}>
                                250g
                        </Text>
                    </Billboard>
                </group>
                <group position={[0.03, 0.94, -0.31]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }}
                            position={[0, 0, 0]}>
                                250g
                        </Text>
                    </Billboard>
                </group>
                <group position={[0.43, 0.94, -0.21]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }}
                            position={[0, 0, 0]}>
                                250g
                        </Text>
                    </Billboard>
                </group>
                <group position={[0.43, 0.94, 0.29]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }}
                            position={[0, 0, 0]}>
                                250g
                        </Text>
                    </Billboard>
                </group>
                <group position={[0.01, 0.94, 0.09]}>
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false} // Lock the rotation on the z axis (default=false)
                        >
                        <Text fontSize={0.05} lookAt={() => {  }} color={"red"}
                            position={[0, 0, 0]}>
                                550g
                        </Text>
                    </Billboard>
                </group>
            </group>
            <CuboidCollider args={[1, 0.4, 1]} position={[0, 0.5, 0]}/>
        </RigidBody>
    );
}

export default memo(TableModel);
import { randomCard } from "@/util/deck";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Object3D, Event, Group, Vector3 } from "three";

function DeckModel(){
    const { distributeDeck } = useControls({ distributeDeck: false });
    const model = useGLTF("/assets/model/2.gltf");
    const [cards, setCards] = useState<Object3D<Event>[]>([]);
    console.log(cards.length);

    const deck = useRef<Group>(null);
    const [playerPos] = useState([
        new Vector3(0, 0, 0.5),
        new Vector3(0, 0, -0.5),
        new Vector3(-0.5, 0, 0.25),
        new Vector3(0.5, 0, -0.25),
        new Vector3(-0.5, 0, -0.25),
        new Vector3(0.5, 0, 0.25)
    ]);

    useEffect(() => {
        const playerAmount = playerPos.length;
        if(distributeDeck && deck.current !== null && cards.length){
            const amountCard = cards.length;
            const distributedCards: number[] = [];
            for(let i = 0; i < playerAmount; i++){
                for(let j = 1; j <= 2; j++){
                    const rand = randomCard(amountCard, distributedCards);
                    deck.current.children[rand].position.setX(playerPos[i].x);
                    deck.current.children[rand].position.setZ(playerPos[i].z);
                }
            }
        }
    }, [distributeDeck, cards, deck])

    useEffect(() => {
        console.log("reload");
        const deck = model.scene.children[0].children[0].children[0].children[0];
        const result: Object3D<Event>[] = [];
        deck.children.forEach((d) => {
            d.children.forEach((c) => {
                result.push(c);
            })
        });

        setCards(result);
    }, [model])

    return (
        cards.length ?
        <group ref={deck} position={[0, 1, 0]}>
            {
                cards.map((card, idx) => {
                    return (
                        <RigidBody key={card.name} position={[0, idx / 21, 0]}>
                            <primitive object={card}/>
                        </RigidBody>
                    );
                })
            }
        </group>
        :
        <></>
    );
}

export default memo(DeckModel);
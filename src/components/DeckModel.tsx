import { randomCard } from "@/util/deck";
import { useSprings, animated, useSpring } from "@react-spring/three";
import { Billboard, Float, TransformControls, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { memo, useEffect, useRef, useState } from "react";
import { Object3D, Event, Group, Vector3, Euler } from "three";

function DeckModel(){
    const { distributeDeck, startFlop } = useControls({
        distributeDeck: false,
        startFlop: false
    });
    const model = useGLTF("/assets/model/2.gltf");
    const [cards, setCards] = useState<Object3D<Event>[]>([]);
    const [flopCards, setFlopCards] = useState<Object3D<Event>[]>([]);

    const [playerPos] = useState([
        new Vector3(0, 0, 0.5),
        new Vector3(0, 0, -0.5),
        new Vector3(-0.5, 0, 0.25),
        new Vector3(0.5, 0, -0.25),
        new Vector3(-0.5, 0, -0.25),
        new Vector3(0.5, 0, 0.25)
    ]);

    useEffect(() => {
        console.log("reload");
        if(cards.length) return;

        const deck = model.scene.children[0].children[0].children[0].children[0];
        const result: Object3D<Event>[] = [];
        deck.children.forEach((d) => {
            d.children.forEach((c) => {
                result.push(c);
            })
        });

        setCards(result);
    }, [model])

    const [cardNeedAnis, setCardNeedAnis] = useState<{ name: string, index: number }[]>([]);
    const [cardAnis, api] = useSprings(
        playerPos.length,
        (i, ctrl) => {
            return {
                from: {
                    x: 0,
                    z: 0
                },
                to: [
                    {
                        x: playerPos[i].x,
                        z: playerPos[i].z
                    }
                ],
                config: {
                    mass: 5,
                    tension: 400,
                    friction: 50
                },
                loop: false,
                pause: true,
                delay: 1000 * i
            }
        }
    );
    const [viewingCards, setViewingCards] = useState<{ name: string, viewing: boolean }[]>([]);
    console.log(viewingCards);

    useEffect(() => {
        const playerAmount = playerPos.length;
        if(distributeDeck && cards.length){
            const amountCard = cards.length;
            const distributedCards: number[] = [];
            const cardNeedAniResults: { name: string, index: number }[] = [];
            for(let i = 0; i < playerAmount; i++){
                for(let j = 1; j <= 2; j++){
                    const rand = randomCard(amountCard, distributedCards);
                    distributedCards.push(rand);
                    cardNeedAniResults.push({
                        name: cards[rand].name,
                        index: i
                    });
                }
            }
            setCardNeedAnis(cardNeedAniResults);
            api.resume();
        }
    }, [distributeDeck, cards, playerPos])

    useEffect(() => {
        if(startFlop){
            const result = [];
            for(let i = 0; i < 5; i++){
                const rand = randomCard(52, []);
                result.push(cards[rand]);
            }
            setFlopCards(result);
        }
    }, [startFlop])

    return (
        cards.length ?
        <group position={[0, 1, 0]}>
            {/* flop */}
            {
                flopCards.map((flopCard, idx) => {
                    flopCard.rotation.x = -Math.PI / 2;
                    return (
                        <group key={flopCard.name} position={[-0.20 + (idx * 0.10), 0.2, 0]}>
                            <Billboard
                                follow={true}
                                lockX={false}
                                lockY={false}
                                lockZ={false}>
                                <primitive object={flopCard}/>
                            </Billboard>
                        </group>
                    );
                })
            }
            {
                cards.map((card, idx) => {
                    const cardNeedAni = cardNeedAnis.find((c) => c.name === card.name);
                    if(typeof cardNeedAni !== "undefined"){
                        const cardAni = cardAnis.find((c, idx) => idx === cardNeedAni.index);
                        if(typeof cardAni !== "undefined"){
                            const viewingCard = viewingCards.find(c => c.name === card.name);
                            return (
                                <Float key={card.name} floatingRange={[0.1, 0.2]}
                                    enabled={viewingCard ? viewingCard.viewing : false}>
                                    <animated.group
                                        position-x={cardAni.x} position-z={cardAni.z}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.object.lookAt(new Vector3(0, 0, 0));
                                            //e.object.rotation.x = -Math.PI / 2;
                                            if(viewingCard){
                                                viewingCard.viewing = !viewingCard.viewing;
                                                setViewingCards([
                                                    ...viewingCards
                                                ]);
                                            }
                                            else{
                                                setViewingCards([
                                                    ...viewingCards,
                                                    {
                                                        name: card.name,
                                                        viewing: true
                                                    }
                                                ]);
                                            }
                                        }}
                                        >
                                        <RigidBody>
                                            <primitive object={card}/>
                                        </RigidBody>
                                    </animated.group>
                                </Float>
                            );
                        }
                    }
                    return (
                        <group key={card.name} position={[0, idx / 21, 0]}
                            >
                            <RigidBody>
                                <primitive object={card}/>
                            </RigidBody>
                        </group>
                    );
                })
            }
        </group>
        :
        <></>
    );
}

export default memo(DeckModel);
import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Ball, { BallMesh } from './Ball'
import { easings, useTrail, useSprings } from '@react-spring/three'

interface BallData {
    color: string
    fromPosition: [number, number, number]
    toPosition: [number, number, number]
}

const balls: BallData[] = [
    {
        color: '#60CCFD',
        fromPosition: [-2, 0, 0],
        toPosition: [-2, -1, 0]
    },
    {
        color: '#FFB966',
        fromPosition: [-1, 0, 0],
        toPosition: [-1, 1, 0]
    },
    {
        color: '#92CF94',
        fromPosition: [0, 0, 0],
        toPosition: [0, -1, 0]
    },
    {
        color: '#F089AF',
        fromPosition: [1, 0, 0],
        toPosition: [1, 1, 0]
    }
]

export default function Scene() {
    const ball1 = useRef<BallMesh>(null)
    const ball2 = useRef<BallMesh>(null)
    const ball3 = useRef<BallMesh>(null)
    const ball4 = useRef<BallMesh>(null)

    const ballRefs = [ball1, ball2, ball3, ball4]

    // const [trails, api] = useTrail(ballRefs.length, i => ({
    //     from: {
    //         position: balls[i].fromPosition
    //     },
    //     to: [
    //         { position: balls[i].toPosition },
    //         { position: balls[i].fromPosition }
    //     ],
    //     loop: true,
    //     delay: 50 * i,
    //     config: {
    //         duration: (3 * 1000) + 50 * i,
    //         easing: easings.easeInOutCubic
    //     }
    // }))

    const [springs, api] = useSprings(ballRefs.length, i => ({
        from: {
            position: balls[i].fromPosition
        },
        to: [
            { position: balls[i].toPosition },
            { position: balls[i].fromPosition }
        ],
        loop: true,
        config: {
            duration: 3 * 1000,
            easing: easings.easeInOutCubic
        }
    }))

    return (
        <Canvas>
            <ambientLight intensity={1} />
            <directionalLight />
            <group>
                {/* {
                    trails.map(({ position }, index: number) => {
                        return (
                            <Ball
                                position={position}
                                color={balls[index].color}
                                ballRef={ballRefs[index]}
                                key={index}
                            />
                        )
                    })
                } */}
                {
                    springs.map(({ position }, index: number) => {
                        return (
                            <Ball
                                position={position}
                                color={balls[index].color}
                                ballRef={ballRefs[index]}
                                key={index}
                            />
                        )
                    })
                }
            </group>
        </Canvas>
    )
}

import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Ball, { BallMesh } from './Ball'
import { easings, useSprings } from '@react-spring/three'

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

interface SceneProps {
    duration: number
    isPaused: boolean
}

export default function Scene({
    duration,
    isPaused
}: SceneProps) {
    const ball1 = useRef<BallMesh>(null)
    const ball2 = useRef<BallMesh>(null)
    const ball3 = useRef<BallMesh>(null)
    const ball4 = useRef<BallMesh>(null)

    const ballRefs = [ball1, ball2, ball3, ball4]

    const [springs, api] = useSprings(ballRefs.length, i => ({
        from: {
            position: balls[i].fromPosition,
        },
        to: [
            { position: balls[i].toPosition },
            { position: balls[i].fromPosition },
        ],
        loop: true
    }))

    useEffect(() => {
        isPaused ? api.pause() : api.resume()
    }, [isPaused, api])

    useEffect(() => {
        api.start({
            config: {
                duration,
                easing: easings.easeInOutCubic
            }
        })
    }, [duration, api])

    return (
        <Canvas>
            <ambientLight intensity={1} />
            <directionalLight />
            <group>
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

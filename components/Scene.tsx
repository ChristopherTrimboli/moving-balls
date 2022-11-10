import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Ball from './Ball'
import { easings, useSprings } from '@react-spring/three'
import OrbitCamera from './OrbitCamera'
import { BallData } from '../pages/index'

interface SceneProps {
    duration: number
    isPaused: boolean
    is3D: boolean
    balls: BallData[]
    stagger: number
    setCurrentTime: (currentTime: number) => void
}

export default function Scene({
    duration,
    isPaused,
    is3D,
    balls,
    stagger,
    setCurrentTime
}: SceneProps) {
    const [isFullyRested, setIsFullyRested] = useState(false)

    const [springs, api] = useSprings(balls.length, i => ({
        from: {
            position: balls[i].fromPosition,
        },
        to: [
            {
                position: balls[i].toPosition,
                onStart(): void {
                    if (i === 0) {
                        setIsFullyRested(false)
                        setCurrentTime(0)
                    }
                },
            },
            {
                position: balls[i].fromPosition,
                onRest(): void {
                    if (i === balls.length - 1) {
                        setIsFullyRested(true)
                    }
                }
            },
        ],
        config: {
            duration: (duration / 2) - stagger,
            easing: easings.easeInOutCubic
        },
        delay: i > 0 ? i * stagger : 0,
        reset: isFullyRested,
        pause: isPaused,
    }), [balls, isFullyRested, isPaused, setCurrentTime, stagger, duration])

    return (
        <Canvas>
            <ambientLight intensity={1} />
            <directionalLight />
            <OrbitCamera />
            <group>
                {
                    springs.map(({ position }, index: number) => {
                        return (
                            <Ball
                                position={position}
                                color={balls[index].color}
                                is3D={is3D}
                                key={index}
                            />
                        )
                    })
                }
            </group>
        </Canvas>
    )
}

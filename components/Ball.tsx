import { Ref } from 'react'
import { animated, SpringValue } from '@react-spring/three'
import { BufferGeometry, DoubleSide, Material, Mesh } from 'three'

export type BallMesh = Mesh<BufferGeometry, Material | Material[]>
export type BallRef = Ref<BallMesh>

export interface BallProps {
    ballRef?: BallRef
    color: string
    position?: SpringValue<[number, number, number]> | [number, number, number]
    radius?: number
    segments?: number
    scale?: number
    is3D?: boolean
}

export default function Ball({
    ballRef,
    color,
    position = [0, 0, 0],
    radius = 0.25,
    segments = 100,
    scale = 1,
    is3D = false
}: BallProps) {

    return (
        <animated.mesh
            scale={scale}
            position={position}
            ref={ballRef}
        >
            {is3D ? <sphereGeometry args={[radius, segments]} /> : <circleGeometry args={[radius, segments]} />}
            <meshPhongMaterial color={color} side={DoubleSide} />
        </animated.mesh>
    )
}

import { animated, SpringValue } from '@react-spring/three'
import { DoubleSide } from 'three'

export interface BallProps {
    color: string
    position?: SpringValue<[number, number, number]> | [number, number, number]
    radius?: number
    segments?: number
    scale?: number
    is3D?: boolean
}

export default function Ball({
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
        >
            {is3D ? <sphereGeometry args={[radius, segments]} /> : <circleGeometry args={[radius, segments]} />}
            <meshPhongMaterial color={color} side={DoubleSide} />
        </animated.mesh>
    )
}

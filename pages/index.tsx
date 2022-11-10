import Head from 'next/head'
import { useEffect, useState } from 'react';
import Scene from '../components/Scene'
import Timeline from '../components/Timeline'

export interface BallData {
  color: string
  fromPosition: [number, number, number]
  toPosition: [number, number, number]
}

const balls: BallData[] = [
  {
    color: '#60CCFD',
    fromPosition: [-1.5, 0, 0],
    toPosition: [-1.5, -1, 0]
  },
  {
    color: '#FFB966',
    fromPosition: [-0.5, 0, 0],
    toPosition: [-0.5, 1, 0]
  },
  {
    color: '#92CF94',
    fromPosition: [0.5, 0, 0],
    toPosition: [0.5, -1, 0]
  },
  {
    color: '#F089AF',
    fromPosition: [1.5, 0, 0],
    toPosition: [1.5, 1, 0]
  }
]

const BASE_DURATION = 3 * 1000
const BASE_STAGGER_DURATION = 0.5 * 1000

const STAGGER_DURATION = 0.5 * 1000

function getTotalStaggerDuration(balls: BallData[], staggerDuration: number): number {
  let totalStagger = 0;
  balls.forEach((ball, index) => {
    totalStagger += (index * staggerDuration);
  })
  return totalStagger;
}

export default function Index() {
  const [duration, setDuration] = useState(BASE_DURATION + getTotalStaggerDuration(balls, STAGGER_DURATION))
  const [stagger, setStagger] = useState(BASE_STAGGER_DURATION)

  const [isPaused, setIsPaused] = useState(false)
  const [is3D, setIs3D] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const handleSetDuration = (duration: number) => {
    const multiplier = BASE_DURATION / duration
    setStagger(multiplier * BASE_STAGGER_DURATION)
    setDuration(duration)
  }

  useEffect(() => {
    if (isPaused) {
      return
    }
    const interval = setInterval(() => {
      setCurrentTime(currentTime => currentTime < duration ? currentTime + 100 : 0)
    }, 100)
    return () => clearInterval(interval)
  }, [duration, isPaused])

  return (
    <>
      <Head>
        <title>moving-balls</title>
        <meta name="description" content="react-three-fiber animated balls with timeline scrubber." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Easter egg */}
      <label htmlFor='checkbox3D'>3D</label>
      <input id="checkbox3D" checked={is3D} onChange={() => setIs3D(!is3D)} type="checkbox" />

      <Scene
        duration={duration}
        isPaused={isPaused}
        balls={balls}
        is3D={is3D}
        setCurrentTime={setCurrentTime}
        stagger={stagger}
      />

      <Timeline
        duration={duration}
        isPaused={isPaused}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onDurationChange={handleSetDuration}
        currentTime={currentTime}
      />
    </>
  )
}

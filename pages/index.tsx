import Head from 'next/head'
import { useState } from 'react';
import Scene from '../components/Scene'
import Timeline from '../components/Timeline'

export default function Index() {
  const [duration, setDuration] = useState(3 * 1000)
  const [isPaused, setIsPaused] = useState(false)
  const [is3D, setIs3D] = useState(false)

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
        is3D={is3D}
      />

      <Timeline
        duration={duration}
        isPaused={isPaused}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onDurationChange={setDuration}
      />
    </>
  )
}

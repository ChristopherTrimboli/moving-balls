import Head from 'next/head'
import { useState } from 'react';
import Scene from '../components/Scene'
import Timeline from '../components/Timeline'

export default function Index() {
  const [duration, setDuration] = useState(3 * 1000)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <>
      <Head>
        <title>moving-balls</title>
        <meta name="description" content="react-three-fiber animated balls with timeline scrubber." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Scene
        duration={duration}
        isPaused={isPaused}
      />

      <Timeline
        duration={duration}
        isPaused={isPaused}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      />
    </>
  )
}

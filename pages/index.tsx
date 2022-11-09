import Head from 'next/head'
import Scene from '../components/Scene'

export default function Home() {
  return (
    <>
      <Head>
        <title>moving-balls</title>
        <meta name="description" content="react-three-fiber animated balls with timeline scrubber." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Scene />
    </>
  )
}

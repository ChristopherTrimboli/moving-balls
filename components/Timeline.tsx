import Slider from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

const TimelineWrapper = styled.div`
    position: fixed;
    width: 100%;
    bottom: 20px;
    display: flex;
    gap: 20px;
    padding: 0 20px;
`

const PlayPauseButton = styled.div`
    padding: 0.25rem 1rem;
    width: 5rem;
    text-align: center;
    background: #fff;
    color: black;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
`

export interface TimelineProps {
    duration: number
    isPaused: boolean
    onPlay: () => void
    onPause: () => void
}

export default function Timeline({
    duration,
    isPaused,
    onPlay,
    onPause,
}: TimelineProps) {
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        if (isPaused) {
            return
        }
        const interval = setInterval(() => {
            setCurrentTime(currentTime => currentTime < duration * 2 ? currentTime + 100 : 0)
        }, 100)
        return () => clearInterval(interval)
    }, [duration, isPaused])

    const handlePlayPause = () => {
        isPaused ? onPlay() : onPause()
    }

    return (
        <TimelineWrapper>
            <PlayPauseButton onClick={handlePlayPause}>
                {isPaused ? "Play" : "Pause"}
            </PlayPauseButton>
            <Slider
                min={0}
                step={100}
                max={duration * 2}
                defaultValue={0}
                value={currentTime}
                onChange={value => console.log(value)}
                trackStyle={{
                    backgroundColor: 'red',
                    height: 15,
                    transition: 'width 0.1s ease-in-out'
                }}
                railStyle={{
                    backgroundColor: 'grey',
                    height: 15
                }}
                handleStyle={{
                    backgroundColor: 'red',
                    borderColor: 'black',
                    height: 30,
                    width: 30,
                    top: '20%',
                    transition: 'left 0.1s ease-in-out'
                }}
            />
        </TimelineWrapper>
    )
}

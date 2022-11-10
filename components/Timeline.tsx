import Slider from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css';

const TimelineWrapper = styled.div`
    position: fixed;
    align-items: center;
    width: 100%;
    bottom: 20px;
    display: flex;
    gap: 20px;
    padding: 0 20px;
`

const PlayPauseButton = styled.div`
    padding: 0.5rem 1rem;
    width: 5rem;
    text-align: center;
    background: #fff;
    color: black;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
`

const DurationWrapper = styled.div`
    display: flex;
    flex-direction: column;

`

const DurationLabel = styled.label`
    font-weight: 500;
`

const DurationInput = styled.input`
    padding: 0.5rem 1rem;
    width: 8rem;
`

export interface TimelineProps {
    duration: number
    isPaused: boolean
    currentTime: number
    onPlay: () => void
    onPause: () => void
    onDurationChange: (duration: number) => void
}

export default function Timeline({
    duration,
    isPaused,
    currentTime,
    onPlay,
    onPause,
    onDurationChange,
}: TimelineProps) {

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
                max={duration}
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
            <DurationWrapper>
                <DurationLabel>Duration (s)</DurationLabel>
                <DurationInput
                    type="number"
                    defaultValue={duration / 1000}
                    step={0.1}
                    onChange={e => onDurationChange(Number(e.target.value) * 1000)}
                />
            </DurationWrapper>

        </TimelineWrapper>
    )
}

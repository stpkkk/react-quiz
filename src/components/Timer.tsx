import { FC, useEffect } from 'react'
import { Action } from '../types'

interface TimerProps {
	secondsRemaining: number | null
	dispatch: React.Dispatch<Action>
}

const Timer: FC<TimerProps> = ({ secondsRemaining, dispatch }) => {
	const effectiveSecondsRemaining = secondsRemaining ?? 0

	const minutes = Math.floor(effectiveSecondsRemaining / 60)
	const seconds = effectiveSecondsRemaining % 60

	useEffect(() => {
		const id = setInterval(() => {
			dispatch({ type: 'tick' })
		}, 1000)

		return () => clearInterval(id)
	}, [dispatch])

	return (
		<div className='timer'>
			{minutes < 10 ? `0${minutes}` : minutes}:
			{seconds < 10 ? `0${seconds}` : seconds}
		</div>
	)
}

export default Timer

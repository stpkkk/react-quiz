import { useEffect } from 'react'
import { useQuiz } from '../context'

const Timer = () => {
	const { secondsRemaining, dispatch } = useQuiz()
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

import { FC } from 'react'
import { Action } from '../types'

interface FinishScreenProps {
	points: number
	totalPoints: number
	highscore: number
	dispatch: React.Dispatch<Action>
}

const FinishScreen: FC<FinishScreenProps> = ({
	points,
	totalPoints,
	highscore,
	dispatch,
}) => {
	const percentage = (points / totalPoints) * 100

	let emoji
	if (percentage === 100) emoji = '🥇'
	if (percentage >= 80 && percentage < 100) emoji = '🎉'
	if (percentage >= 50 && percentage < 80) emoji = '😸'
	if (percentage >= 0 && percentage < 50) emoji = '🤔'
	if (percentage === 0) emoji = '💩'

	function handleRestart() {
		dispatch({ type: 'restart' })
	}

	return (
		<>
			<p className='result'>
				<span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
				{totalPoints} ({Math.ceil(percentage)} %)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>
			<button className='btn btn-ui' type='button' onClick={handleRestart}>
				Restart Quiz
			</button>
		</>
	)
}

export default FinishScreen

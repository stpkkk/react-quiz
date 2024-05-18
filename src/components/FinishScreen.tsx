import { FC } from 'react'

interface FinishScreenProps {
	points: number
	totalPoints: number
	highscore: number
}

const FinishScreen: FC<FinishScreenProps> = ({
	points,
	totalPoints,
	highscore,
}) => {
	const percentage = (points / totalPoints) * 100

	let emoji
	if (percentage === 100) emoji = '🥇'
	if (percentage >= 80 && percentage < 100) emoji = '🎉'
	if (percentage >= 50 && percentage < 80) emoji = '😸'
	if (percentage >= 0 && percentage < 50) emoji = '🤔'
	if (percentage === 0) emoji = '💩'

	return (
		<>
			<p className='result'>
				<span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
				{totalPoints} ({Math.ceil(percentage)} %)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>
		</>
	)
}

export default FinishScreen

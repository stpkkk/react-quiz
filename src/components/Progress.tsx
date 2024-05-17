import { FC } from 'react'

interface ProgressProps {
	points: number
	index: number
	totalPoints: number
	numQuestions: number
	answer: number | null
}

const Progress: FC<ProgressProps> = ({
	points,
	index,
	totalPoints,
	numQuestions,
	answer,
}) => {
	return (
		<header className='progress'>
			<progress max={numQuestions} value={index + Number(answer !== 0)} />
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {totalPoints} points
			</p>
		</header>
	)
}
export default Progress

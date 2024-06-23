import { useQuiz } from '../context'

const Progress = () => {
	const { numQuestions, index, answer, points, maxPossiblePoints } = useQuiz()

	return (
		<header className='progress'>
			<progress max={numQuestions} value={index + Number(answer !== 0)} />
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {maxPossiblePoints} points
			</p>
		</header>
	)
}
export default Progress

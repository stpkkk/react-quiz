import { useQuiz } from '../context'

const NextButton = () => {
	const { answer, index, numQuestions, dispatch } = useQuiz()

	function handleNextQuestion() {
		dispatch({ type: 'nextQuestion' })
	}

	function handleFinish() {
		dispatch({ type: 'finish' })
	}

	if (answer === null) return null

	if (index < numQuestions - 1) {
		return (
			<button className='btn btn-ui' onClick={handleNextQuestion} type='button'>
				Next
			</button>
		)
	}

	if (index === numQuestions - 1) {
		return (
			<button className='btn btn-ui' onClick={handleFinish} type='button'>
				Finish
			</button>
		)
	}

	return null
}

export default NextButton

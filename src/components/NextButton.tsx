import { FC } from 'react'
import { Action } from '../types'

interface NextButtonProps {
	dispatch: React.Dispatch<Action>
	answer: number | null
	numQuestions: number
	index: number
}

const NextButton: FC<NextButtonProps> = ({
	dispatch,
	answer,
	numQuestions,
	index,
}) => {
	if (answer === null) return null

	function handleNextQuestion() {
		dispatch({ type: 'nextQuestion' })
	}

	function handleFinish() {
		dispatch({ type: 'finish' })
	}

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

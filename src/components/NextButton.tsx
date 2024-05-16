import { FC } from 'react'
import { Action } from '../types'

interface NextButtonProps {
	dispatch: React.Dispatch<Action>
	answer: number | null
}

const NextButton: FC<NextButtonProps> = ({ dispatch, answer }) => {
	if (answer === null) return null
	function handleNextQuestion() {
		dispatch({ type: 'nextQuestion' })
	}
	return (
		<div>
			<button className='btn btn-ui' onClick={handleNextQuestion} type='button'>
				Next
			</button>
		</div>
	)
}

export default NextButton

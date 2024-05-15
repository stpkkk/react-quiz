import { FC } from 'react'
import { Action, IQuestion } from '../types'

interface OptionsProps {
	question: IQuestion
	dispatch: React.Dispatch<Action>
	answer: number | null
}

const Options: FC<OptionsProps> = ({ question, dispatch, answer }) => {
	const hasAnswered = answer !== null
	function handleSelect(i: number) {
		dispatch({ type: 'newAnswer', payload: i })
	}

	return (
		<div className='options'>
			{question?.options.map((o, i) => (
				<button
					className={`btn btn-option ${answer === i ? 'answer' : ''} ${
						hasAnswered
							? i === question.correctOption
								? 'correct'
								: 'wrong'
							: ''
					}`}
					onClick={() => handleSelect(i)}
					disabled={hasAnswered}
					type='button'
					key={o}
				>
					{o}
				</button>
			))}
		</div>
	)
}

export default Options

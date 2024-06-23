import { FC } from 'react'
import { useQuiz } from '../context'
import { IQuestion } from '../types'

type OptionsProps = {
	question: IQuestion
}

const Options: FC<OptionsProps> = ({ question }) => {
	const { answer, dispatch } = useQuiz()
	const hasAnswered = answer !== null

	function handleSelectAnswer(i: number) {
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
					onClick={() => handleSelectAnswer(i)}
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

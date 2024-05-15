import { FC } from 'react'
import { Action, IQuestion } from '../types'
import Options from './Options'

interface QuestionProps {
	question: IQuestion
	dispatch: React.Dispatch<Action>
	answer: number | null
}

const Question: FC<QuestionProps> = ({ question, dispatch, answer }) => {
	return (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	)
}

export default Question

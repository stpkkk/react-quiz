import { FC } from 'react'
import { IQuestion } from '../types'
import Options from './Options'

interface QuestionProps {
	question: IQuestion
}

const Question: FC<QuestionProps> = ({ question }) => {
	return (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} />
		</div>
	)
}

export default Question

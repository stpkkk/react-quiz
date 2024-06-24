import { useQuiz } from '../context'
import Options from './Options'

const Question = () => {
	const { questions, index } = useQuiz()
	const question = questions.at(index)

	return question ? (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} />
		</div>
	) : (
		<div>No question loaded</div>
	)
}

export default Question

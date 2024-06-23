import { useQuiz } from '../context'

const StartScreen = () => {
	const { dispatch, numQuestions } = useQuiz()

	function handleStart() {
		dispatch({ type: 'start' })
	}

	return (
		<div className='start'>
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} questions to test your React mastery</h3>
			<button className='btn btn-ui' type='button' onClick={handleStart}>
				Let`s start!
			</button>
		</div>
	)
}

export default StartScreen

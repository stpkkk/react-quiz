import { FC } from 'react'
import { Action } from '../types'

interface StartScreenProps {
	numQuestions: number
	dispatch: React.Dispatch<Action>
}

const StartScreen: FC<StartScreenProps> = ({ numQuestions, dispatch }) => {
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

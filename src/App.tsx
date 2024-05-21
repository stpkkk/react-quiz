import { useEffect, useReducer } from 'react'
import {
	ErrorMessage,
	FinishScreen,
	Footer,
	Header,
	Loader,
	Main,
	NextButton,
	Progress,
	Question,
	StartScreen,
	Timer,
} from './components'
import { IQuestion } from './types'
import { Action } from './types'

type AppState = {
	questions: IQuestion[]
	index: number
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
	answer: number | null
	points: number
	highscore: number
	secondsRemaining: number | null
}

const SECONDS_PER_QUESTION = 30

const initialState: AppState = {
	questions: [],
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
}

function reducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' }
		case 'loading':
			return { ...state, status: 'loading' }
		case 'dataFailed':
			return { ...state, status: 'error' }
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
			}
		case 'newAnswer':
			const question = state.questions.at(state.index)
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question?.correctOption
						? state.points + question.points
						: state.points,
			}
		case 'nextQuestion':
			return { ...state, answer: null, index: state.index++ }
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			}
		case 'restart':
			return { ...initialState, questions: state.questions, status: 'ready' }
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
				status:
					state.secondsRemaining && state.secondsRemaining <= 0
						? 'finished'
						: state.status,
			}
		default:
			throw new Error('Unknown action')
	}
}

function App(): JSX.Element {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState)

	const numQuestions = questions.length
	const totalPoints = questions.reduce((acc, q) => acc + q.points, 0)

	useEffect(() => {
		fetch('http://localhost:8000/questions')
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => dispatch({ type: 'dataReceived', payload: data }))
			.catch(() => dispatch({ type: 'dataFailed' }))
	}, [dispatch])

	useEffect(() => {
		setTimeout(() => {}, 1000)
	}, [])

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <ErrorMessage />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && questions && (
					<>
						<Progress
							points={points}
							index={index}
							totalPoints={totalPoints}
							numQuestions={numQuestions}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<NextButton
								dispatch={dispatch}
								answer={answer}
								numQuestions={numQuestions}
								index={index}
							/>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						points={points}
						totalPoints={totalPoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	)
}

export default App

import { useEffect, useReducer } from 'react'
import {
	ErrorMessage,
	Header,
	Loader,
	Main,
	NextButton,
	Question,
	StartScreen,
} from './components'
import { IQuestion } from './types'
import { Action } from './types/action'

type AppState = {
	questions: IQuestion[]
	index: number
	status: 'loading' | 'error' | 'ready' | 'active'
	answer: number | null
	points: number
}

const initialState: AppState = {
	questions: [],
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
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
			return { ...state, status: 'active', index: 0, answer: null }
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
		default:
			throw new Error('Unknown action')
	}
}

function App(): JSX.Element {
	const [{ questions, status, index, answer, points }, dispatch] = useReducer(
		reducer,
		initialState
	)

	const numQuestions = questions.length

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
						<>
							<Question
								question={questions[index]}
								dispatch={dispatch}
								answer={answer}
							/>
						</>
						<NextButton dispatch={dispatch} answer={answer} />
					</>
				)}
			</Main>
		</div>
	)
}

export default App

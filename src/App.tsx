import { useEffect, useReducer } from 'react'
import { ErrorMessage, Header, Loader, Main, StartScreen } from './components'
import { Question } from './types'

type AppState = {
	questions: Question[]
	status: 'loading' | 'error' | 'ready'
}

type Action =
	| { type: 'dataReceived'; payload: Question[] }
	| { type: 'loading' }
	| { type: 'dataFailed' }

const initialState: AppState = { questions: [], status: 'loading' }

function reducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' }
		case 'loading':
			return { ...state, status: 'loading' }
		case 'dataFailed':
			return { ...state, status: 'error' }
		default:
			throw new Error('Unknown action')
	}
}

function App(): JSX.Element {
	const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

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
				{status === 'ready' && <StartScreen numQuestions={numQuestions} />}
			</Main>
		</div>
	)
}

export default App

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react'
import { Action, IQuestion } from '../types'

type QuizProviderProps = {
	children: ReactNode
}

type AppState = {
	questions: IQuestion[]
	index: number
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
	answer: number | null
	points: number
	highscore: number
	secondsRemaining: number | null
}

type QuizContextType = {
	questions: IQuestion[]
	index: number
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
	answer: number | null
	points: number
	highscore: number
	secondsRemaining: number | null
	numQuestions: number
	maxPossiblePoints: number
	dispatch: React.Dispatch<Action>
}

const SECONDS_PER_QUESTION = 30

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
			return { ...state, questions: state.questions, status: 'ready' }
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

const QuizContext = createContext<QuizContextType | undefined>(undefined)

function QuizProvider({ children }: QuizProviderProps) {
	const initialState: AppState = {
		questions: [],
		status: 'loading',
		index: 0,
		answer: null,
		points: 0,
		highscore: 0,
		secondsRemaining: null,
	}

	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState)

	const numQuestions = questions.length
	const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0)

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

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				numQuestions,
				maxPossiblePoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

function useQuiz() {
	const context = useContext(QuizContext)

	if (context === undefined)
		throw new Error('QuizContext was used outside of the AuthProvider')
	return context
}

export { QuizProvider, useQuiz }

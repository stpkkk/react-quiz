import { IQuestion } from './question'

export type Action =
	| { type: 'dataReceived'; payload: IQuestion[] }
	| { type: 'loading' }
	| { type: 'dataFailed' }
	| { type: 'setActive' }
	| { type: 'start'; payload?: IQuestion }
	| { type: 'newAnswer'; payload: number }
	| { type: 'nextQuestion'; payload?: number }

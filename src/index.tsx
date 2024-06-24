import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QuizProvider } from './context'
import { useMockAdapter } from './api'

const RootApp = () => {
	useMockAdapter()

	return (
		<QuizProvider>
			<App />
		</QuizProvider>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<RootApp />
	</React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QuizProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<QuizProvider>
			<App />
		</QuizProvider>
	</React.StrictMode>
)

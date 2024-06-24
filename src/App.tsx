import { useEffect } from 'react'
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
} from './components'
import { useQuiz } from './context'

function App(): JSX.Element {
	const { status } = useQuiz()

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <ErrorMessage />}
				{status === 'ready' && <StartScreen />}
				{status === 'active' && (
					<>
						<Progress />
						<Question />
						<Footer>
							<NextButton />
							{/* <Timer /> */}
						</Footer>
					</>
				)}
				{status === 'finished' && <FinishScreen />}
			</Main>
		</div>
	)
}

export default App

import { FC } from 'react'
import { IQuestion } from '../types'

interface OptionsProps {
	question: IQuestion
}

const Options: FC<OptionsProps> = ({ question }) => {
	return (
		<div className='options'>
			{question?.options.map(o => (
				<button className='btn btn-option' type='button' key={o}>
					{o}
				</button>
			))}
		</div>
	)
}

export default Options

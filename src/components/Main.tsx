import React, { FC } from 'react'

interface MainProps {
	children: React.ReactNode
}

const Main: FC<MainProps> = ({ children }) => {
	return <main className='main'>{children}</main>
}

export default Main

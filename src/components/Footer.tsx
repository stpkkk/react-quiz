import { FC, ReactNode } from 'react'

interface FooterProps {
	children: ReactNode
}

const Footer: FC<FooterProps> = ({ children }) => {
	return <footer>{children}</footer>
}

export default Footer

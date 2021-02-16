import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

export default function Layout({ props, children }) {
	return (
		<Container>
			<CssBaseLine />
			{children}
		</Container>
	)
}

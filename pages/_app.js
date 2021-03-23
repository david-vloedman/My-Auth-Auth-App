import { Provider } from 'react-redux'
// local imports
import Layout from '../components/layout/Layout'
import { ThemeProvider } from '@material-ui/core/styles'
import defaultTheme from '../components/themes/default'
import { initStore } from '../store'

function MyApp({ Component, pageProps }) {
	const store = initStore()

	return (
		<Provider store={store}>
			<style jsx global>{`
				@font-face {
					font-family: 'Bebas Neue';
					src: url('/fonts/Bebas_Neue/BebasNeue-Regular.ttf');
					font-weight: normal;
					font-style: normal;
					font-display: swap;
				}
				@font-face {
					font-family: 'Open Sans';
					src: url('/fonts/Open_Sans/OpenSans-Regular.ttf');
					font-weight: normal;
					font-style: normal;
					font-display: swap;
				}					

			`}</style>
			<ThemeProvider theme={defaultTheme}>
				<Layout user={pageProps}>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</Provider>
	)
}

export default MyApp

import { Provider } from 'react-redux'
// local imports
import Layout from '../components/layout/Layout'
import { initStore } from '../store'

function MyApp({ Component, pageProps }) {
	const store = initStore()

	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp

import { Provider } from 'react-redux'
// local imports
import Layout from '../components/layout/Layout'
import { initStore } from '../store'

function MyApp({ Component, pageProps }) {
	const { user } = pageProps

	const store = user
		? initStore({ user: user, layout: { loggedIn: true, showDrawer: false } })
		: initStore({ layout: { loggedIn: false, showDrawer: false } })

	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp

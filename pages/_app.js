import { Provider } from 'react-redux'
// local imports
import Layout from '../components/layout/Layout'
import { initStore } from '../store'

function MyApp({ Component, pageProps }) {
	
	const store = initStore()
	// const store = user
	// 	? initStore({ user: user, layout: { loggedIn: true, showDrawer: false } })
	// 	: initStore({ layout: { loggedIn: false, showDrawer: false } })
console.log(pageProps)
	return (
		<Provider store={store}>
			<Layout user={pageProps}>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp

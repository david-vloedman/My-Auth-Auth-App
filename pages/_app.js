import { Provider } from 'react-redux'
import { useState, useEffect, createContext } from 'react'
import { trigger, mutate } from 'swr'
import cookie from 'js-cookie'
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

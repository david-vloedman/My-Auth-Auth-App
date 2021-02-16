import {Provider} from "react-redux"
import {initStore} from "../store"
import Layout from '../components/layout/Layout'
function MyApp({ Component, pageProps }) {
  
  const store = initStore({})
  

  return (
    <Provider store={store}>
      
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </Provider>
    )
    
}

export default MyApp
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../redux/store'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    import('bootstrap/dist/js/bootstrap')
  })
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

import React from 'react'
import '../styles/globals.css';
import Auth from '../components/security/Auth'
import { wrapper } from '../store/store';


function App({ router, pageProps, Component }) {

  return (
    <>
      {
        Component.auth ?
          <Auth>
            <Component key={router.route} {...pageProps} />
          </Auth> :
          <Component key={router.route} {...pageProps} />
      }
    </>
  )
}

export default App
// export default wrapper.withRedux(App)

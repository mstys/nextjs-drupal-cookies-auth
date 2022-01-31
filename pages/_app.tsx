import React from 'react'
import '../styles/globals.css';
import Auth from '../components/security/Auth'


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

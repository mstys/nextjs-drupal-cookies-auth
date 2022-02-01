import React from 'react'
import '../styles/globals.css';
import Auth from '../components/security/Auth'
import Header from '../components/Header';


function App({ router, pageProps, Component }) {
  return (
    <>
      <Header />
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

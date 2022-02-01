import React from 'react'
import App from 'next/app'
import '../styles/globals.css';
import Auth from '../components/security/Auth'
import Header from '../components/Header';

function CustomApp({ router, pageProps, Component, cookies }) {
  return (
    <>
      <Header />
      {
        Component.auth ?
          <Auth cookies={cookies}>
            <Component key={router.route} {...pageProps} />
          </Auth> :
          <Component key={router.route} {...pageProps} />
      }
    </>
  )
}

CustomApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  let cookies = {};
  if (process.browser === false) {
    cookies = appContext.ctx.req?.cookies;
  }

  return { ...appProps, cookies }
}

export default CustomApp

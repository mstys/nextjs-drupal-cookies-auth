import React, { useEffect, useState } from 'react'
import { apiLink } from '../../helpers'
import { getAuthCookie, getUserCookie } from '../../helpers'
import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner';

export default function Auth({ children, cookies }) {
  const authCookie = getAuthCookie(cookies);
  const userDataCookie = getUserCookie(cookies);
  const date = new Date().getTime();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  const onRouteChangeStart = () => {
    setLoading(true);
    setAuthorized(false);
  };

  useEffect(() => {
    authCheck();

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, [])

  const authCheck = () => {
    console.log('authCookie2', authCookie)
    console.log('userDataCookie2', userDataCookie)
    console.log('date auth', date)
    if (authCookie && userDataCookie) {
      // verify session
      fetch(`${apiLink}/user/${userDataCookie}?_format=json`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 403 || response.status === 404) {
            Promise.reject('User unauthorized');
            setAuthorized(false);
          
            // delete old cookies
            document.cookie = "COOKIE_NAME=; Max-Age=0; path=/; domain=" + location.hostname;
            router.push('/login?session_expired=true');
          } else {
            setAuthorized(true);
          }
        })
        .finally(() => {
          setLoading(false);
        })
        .catch(error => { console.log(error) })
    } else {
      setAuthorized(false);
      router.push('/login');
    }
  }


  if (!loading) return authorized ? children : <Spinner />
  else return <Spinner />
}
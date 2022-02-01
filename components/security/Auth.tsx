import React, { useEffect, useState } from 'react'
import { apiLink } from '../../helpers'
import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner';

import { userService } from '../../services';


export default function Auth({ children, ...props }) {
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
    if (userService.userValue) {
      // refresh session
      fetch(`${apiLink}/user/${userService.userValue?.uid}?_format=json`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-Token': userCert?.userData?.csrf_token
        },
      })
        .then(response => {
          if (response.status === 403 || response.status === 404) {
            Promise.reject('User unauthorized');
            setAuthorized(false);
            userService.logout();
            router.push('/login');
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
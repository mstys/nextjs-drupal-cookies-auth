export const apiLink = process.env.API_URL;

// get drupal sesssion cookie 
export const getAuthCookie = (cookies: Record<string, string>) => {
  const key = Object.keys(cookies).filter((key: string) => key.includes('SESS'))[0];
  return cookies[key]
}

// get cookie with user ID
export const getUserCookie = (cookies: Record<string, string>) => {
  return cookies['USER_DATA']
}
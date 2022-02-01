export const apiLink = process.env.API_URL;

// get cookie with user ID
export const getUserCookie = (cookies: Record<string, string>) => {
  return cookies['USER_DATA']
}
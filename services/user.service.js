import { apiLink } from "../helpers";
import Cookies from "js-cookie";

export const userService = {
  login,
  logout,
};

async function login(email, password) {
  try {
    const request = await fetch(`${apiLink}/user/login?_format=json`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: email,
        pass: password,
      }),
    });

    const json = await request.json();

    if (request.ok) {
      Cookies.set("USER_DATA", json.current_user.uid);
      return json;
    } else {
      throw json.message;
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function logout() {
  try {
    const request = await fetch(`${apiLink}/user/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (request.ok) {
      //remove cookies, redirect
    }
  } catch (e) {
    throw new Error(e);
  }

  // move up if drupal server use SSL!
  Cookies.remove("USER_DATA");
  window.location.href = "/";
}

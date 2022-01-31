import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import { apiLink } from "../helpers";

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
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
      userSubject.next(json.current_user);
      localStorage.setItem("user", JSON.stringify(json.current_user));

      return json;
    } else {
      throw json.message;
    }
  } catch (e) {
    throw new Error(e);
  }
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

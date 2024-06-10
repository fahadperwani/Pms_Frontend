export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(token, user) {
  return { type: LOGIN, user, token };
}
export function logout() {
  return { type: LOGOUT };
}

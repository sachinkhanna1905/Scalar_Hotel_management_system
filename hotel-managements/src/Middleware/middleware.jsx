import jwt_decode from "jwt-decode";
export function getCurrentUser(token) {
  try {
    return jwt_decode(token);
  } catch (ex) {
    return null;
  }
}

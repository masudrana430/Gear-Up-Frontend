import Cookies from "js-cookie";
import { ROLE_COOKIE, TOKEN_COOKIE } from "./cookies";

export { ROLE_COOKIE, TOKEN_COOKIE } from "./cookies";

export const tokenStorage = {
  get: () => (typeof window === "undefined" ? undefined : Cookies.get(TOKEN_COOKIE)),
  set: (token: string, role: string) => {
    Cookies.set(TOKEN_COOKIE, token, { expires: 7, sameSite: "lax", secure: location.protocol === "https:" });
    Cookies.set(ROLE_COOKIE, role, { expires: 7, sameSite: "lax", secure: location.protocol === "https:" });
  },
  clear: () => {
    Cookies.remove(TOKEN_COOKIE);
    Cookies.remove(ROLE_COOKIE);
  },
};

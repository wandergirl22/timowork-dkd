// Authorization
import storage from "@/utils/storage";
const TOKEN_KEY = "LIKEDE_TOKEN";
export const getToken = () => storage.get(TOKEN_KEY);

export const setToken = (token) => storage.set(TOKEN_KEY, token);

export const removeToken = () => storage.remove(TOKEN_KEY);

export function setTokenTime() {
	Cookies.set("tokenTime", Date.now());
  }
  
  export function getTokenTime(){
	return Cookies.get('tokenTime')
  }
  
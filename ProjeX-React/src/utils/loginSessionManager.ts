import { jwtVerify } from "jose";
import env from './env';
import APIToken from '../types/TokenPayload';


const encoder = new TextEncoder();
const key : Uint8Array = encoder.encode(env.VITE_SECRET_KEY);

const storeTokenInLocalStorage = (token:string) =>
{
    localStorage.setItem("Projex_Login_Token", token);
}

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("Projex_Login_Token");
    if (!token) return null;
    if (!validateToken(token)) return null;
    if (!checkTimeValidity(token)) return null;
    return token as unknown as APIToken;
}

const deleteTokenFromLocalStorage = () => {
    localStorage.removeItem("Projex_Login_Token");
}

const validateToken = (token:string) => {
    try {
        const decodedToken = jwtVerify(token, key);
        return decodedToken;
      } catch {
        return null;
      }
}

const checkTimeValidity = (token: string) =>{
    try {
        const decodedToken = jwtVerify(token, key) as unknown as APIToken;
        const exp = decodedToken?.exp;
        if (exp && exp <= Date.now() / 1000) return true
        else return false;
      } catch {
        return false;
      }
}

export default {storeTokenInLocalStorage, getTokenFromLocalStorage , deleteTokenFromLocalStorage}

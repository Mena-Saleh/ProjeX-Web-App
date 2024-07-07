import { jwtVerify } from "jose";
import env from './env';
import APIToken from '../types/APIToken';

const key = new TextEncoder().encode(env.VITE_TOKEN_SECRET_KEY);

const storeTokenInLocalStorage = (token: string) => {
    localStorage.setItem("Projex_Login_Token", token);
}

const getTokenFromLocalStorage = async () => {
    const token = localStorage.getItem("Projex_Login_Token");
    if (!token) return null;

    const isValidToken = await validateAndCheckToken(token);
    if (!isValidToken) {
        console.log("Token validation failed or is not valid by time");
        return null;
    }

    return token;
}

const deleteTokenFromLocalStorage = () => {
    localStorage.removeItem("Projex_Login_Token");
}

const validateAndCheckToken = async (token: string): Promise<boolean> => {
    try {
        const { payload } = await jwtVerify(token, key);
        const decodedToken = payload as unknown as APIToken;
        const exp = decodedToken.exp;
        if (exp && exp > Date.now() / 1000) {
            return true;
        } else {
            console.log("Token expired or invalid");
            return false;
        }
    } catch (error) {
        console.log("Error validating token: ", error);
        return false;
    }
}

export default { storeTokenInLocalStorage, getTokenFromLocalStorage, deleteTokenFromLocalStorage }

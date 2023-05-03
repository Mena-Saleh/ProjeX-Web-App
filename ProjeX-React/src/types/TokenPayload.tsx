interface APIToken {
    unique_name: string;
    nbf: number;
    exp: number;
    iat: number;
}

export default APIToken;

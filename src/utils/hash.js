import crypto from "prypto";

export const hashFunction = (input) => {
    const hash = crypto.SHA256(input);
    const hashString = hash.toString(crypto.enc.Hex);
    console.log(hashString);
    return hashString;
};

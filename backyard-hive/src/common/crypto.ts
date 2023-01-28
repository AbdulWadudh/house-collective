import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { ENCRYPTION_SECRET_KEY, JWT_SECRET_KEY } = process.env;

export const encryptIt = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_SECRET_KEY).toString();
};

export const decryptIt = (data: any) => {
    const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_SECRET_KEY);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(plaintext);
};

export const jwtSignIt = (data: any) => {
    return jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "1y" });
};

export const jwtVerifyIt = (data: any) => {
    return jwt.verify(data, JWT_SECRET_KEY);
};

export const generateTheHash = async (str: string) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(str, salt);
};

export const compareTheHash = async (str: string, hash: string) => {
    return await bcrypt.compare(str, hash);
};

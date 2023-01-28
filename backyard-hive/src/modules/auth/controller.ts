import { Request, Response } from "express";

import Models from "../../models";
import { encryptIt, generateTheHash, compareTheHash } from "../../common/crypto";
import { get } from "lodash";

const { User } = Models;

export const signIn = async (req: Request, res: Response) => {
    const { service, email, password, accessToken } = req.body;

    try {
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(200).json({ status: false, message: "Account Doesn't Exits" });
        }

        if (service === "direct") {
            const hashedString = get(user, `credentials.${service}.accessToken`, "");
            const accessTokenVerified = await compareTheHash(password, hashedString);

            if (!accessTokenVerified) {
                return res.status(200).json({ status: false, message: "Incorrect Password" });
            }
        }

        return res.status(200).json({ status: true, message: "Login Success" });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const signUp = async (req: Request, res: Response) => {
    const { service, name, email, password, profilePicUrl, accessToken } = req.body;

    try {
        const isUserExists = await User.findOne({ email }).lean();

        if (isUserExists) {
            return res.status(200).json({
                status: false,
                message: `Account already exists with ${email} Email.`,
            });
        }
        /* Password Hashing */
        const hashedAccessToken = await generateTheHash(password);

        await User.create({
            name,
            email,
            profilePicUrl,
            credentials: {
                [service]:
                    service === "google" ? { accessToken: encryptIt(accessToken) } : { accessToken: hashedAccessToken },
            },
        });

        return res.status(200).json({
            status: true,
            message: `You have Successfully Signed Up with the ${email} Email`,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { email } = req.params;

    try {
        const updatePassword = await User.findOneAndUpdate(
            { email },
            { $set: { ["credentials.direct.accessToken"]: encryptIt(password) } },
        ).lean();

        if (!updatePassword) {
            return res.status(200).json({
                status: false,
                message: `Unable to Change Password for ${email} Email.`,
            });
        }

        return res.status(200).json({
            status: true,
            message: `You have Successfully Chnage the Password ${email} Email`,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        await User.findOneAndDelete({ email }).lean();

        return res.status(200).json({
            status: true,
            message: `${email} Account successfully Deleted`,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export default {
    signIn,
    signUp,
    changePassword,
    deleteAccount,
};

import { Request, Response } from "express";

import Models from "../../models";

const { User } = Models;

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).lean();

        return res.status(200).json({
            status: true,
            users,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(200).json({
                status: true,
                message: `User no Found by ${email} Email`,
            });
        }

        return res.status(200).json({
            status: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export default {
    getUsers,
    getUserByEmail,
};

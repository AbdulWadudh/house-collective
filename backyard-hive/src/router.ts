import { Router, Request, Response } from "express";

import authRoutes from "./modules/auth/routes";
import userRoutes from "./modules/users/routes";

export default function () {
    const router = Router();

    router.use("/auth", authRoutes());
    router.use("/users", userRoutes());

    router.get("/healthcheck", (req: Request, res: Response) => {
        res.status(200).json({ status: true, message: "Server is Running and Responding" });
    });

    router.all("*", (req: Request, res: Response) =>
        res.status(404).json({ status: false, message: "Route Doesn't Exists" }),
    );

    return router;
}

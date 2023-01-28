import { Router } from "express";

import controller from "./controller";

export default function () {
    const router = Router();

    router.route("/").post(controller.getUsers);
    router.route("/:email").post(controller.getUserByEmail);

    return router;
}

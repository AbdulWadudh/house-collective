import { Router } from "express";

import controller from "./controller";

export default function () {
    const router = Router();

    router.route("/signIn").post(controller.signIn);
    router.route("/signUp").post(controller.signUp);
    router.route("/changePassword/:email").post(controller.changePassword);
    router.route("/deleteAcc/:email").post(controller.deleteAccount);

    return router;
}

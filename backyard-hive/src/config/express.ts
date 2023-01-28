import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Logger from "../logger";
import routes from "../router";

export default function () {
    try {
        const app = express();

        app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
        app.use(cors());

        app.use("/", routes());

        return app;
    } catch (err) {
        Logger.error(`Error From Express : ${err.message}`);
    }
}

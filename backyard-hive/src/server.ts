import "dotenv/config";

import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import http from "http";

import * as Models from "./models";
import express from "./config/express";
import Logger from "./logger";

mongoose.Promise = global.Promise;
const { MONGO_DB_URI, PORT_NO } = process.env;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_DB_URI);
const mongoDb = mongoose.connection;

mongoDb.on("error", (err) => Logger.error("Mongoose error", err));

mongoDb.once("open", async () => {
    const mongoNativ = await MongoClient.connect(MONGO_DB_URI);
    global.mongoNativ = mongoNativ;
    global.Models = Models;

    const expressApp = express();

    http.createServer(expressApp).listen(PORT_NO);

    Logger.info(`Connected to MongoDb : ${MONGO_DB_URI}`);
    Logger.info(`Server Started and Listening on ${PORT_NO}`);
});

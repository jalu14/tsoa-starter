import { Logger } from "./@core/utils/logger";
import express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from "swagger-ui-express";
import * as swaggerConfig from './swagger.json';
import { RegisterRoutes } from "./routes";

require('dotenv').config();

const mongoose = require('mongoose');

class Server {
    public app: any;
    public port: number = +process.env.PORT || 3000;
    public mongodb = process.env.MONGODB;
    public useSwagger = process.env.SWAGGER || false;
    public environment = process.env.ENVIRONMENT || 'default';

    constructor() {
        Logger.log('Using environment ' + this.environment);
        this.app = express();
        this.app.disable('etag').disable('x-powered-by');

        mongoose.connect(this.mongodb, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
        mongoose.connection.once("open", () => {
            Logger.log("Connection successful");

            this.initializeMiddleware();
            this.initializeSwagger();
            this.registerRoutes();
            this.listen();
        });

    }

    private initializeMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(
            (req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                next();
            }
        );
    }

    private initializeSwagger() {
        if (this.useSwagger) {
            Logger.log('Launching swagger documentation')
            try {
                this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
            } catch {
                Logger.log('Could not find the swagger.json file');
            }
        }
    }

    private registerRoutes() {
        Logger.log('Hooking routes');
        RegisterRoutes(this.app);

        // It's important that this come after the main routes are registered
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            const status = err.status || 500;
            const body: any = {
                fields: err.fields || undefined,
                message: err.message || 'An error occurred during the request.',
                name: err.name,
                status,
            };
            res.status(status).json(body);
        });
    }

    private listen() {
        this.app.listen(this.port, () => {
            Logger.log(`API Listening on port: ${this.port}`);
        });
    }
}
const server = new Server();
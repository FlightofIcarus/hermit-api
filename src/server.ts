import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { swaggerSpec } from "./swagger.config";

const server: Express = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({origin: "*"}));
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use(router.getRouter());

server.listen(3000, (): void => console.log('Server is running on port 3000')
);

export { server };
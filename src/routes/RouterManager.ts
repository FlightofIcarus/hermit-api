import { Router, Request, Response } from "express";

type RouteHandler = (req: Request, res: Response) => void;

type RouteMethod = "get" | "post" | "put" | "delete" | "patch";

export default class RouterManager {
    
    constructor(private readonly router: Router) {
    }

    setRoute(url: string, method: RouteMethod, handler: RouteHandler): void {
        this.router[method](url, handler);
    }

    public getRouter(): Router {
        return this.router;
    }
}

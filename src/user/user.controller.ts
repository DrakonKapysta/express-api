import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { IUserController } from "./user.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private readonly loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: "/register", method: "post", func: this.register },
			{ path: "/login", method: "post", func: this.login },
		]);
	}

	public getRouter(): Router {
		return this.router;
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, "Not authorized", "login"));
	}
	public register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, "register");
	}
}

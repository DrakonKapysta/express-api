import express, { Express } from "express";
import { Server } from "http";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { IUserController } from "./user/user.controller.interface";
import { IConfigService } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma/prisma.service";
import { AuthMiddleware } from "./common/auth.middleware";

@injectable()
export class App {
	public app: Express;
	public server: Server;
	public port: number;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public useRoutes(): void {
		this.app.use("/users", this.userController.getRouter());
	}

	public useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public useMiddleware(): void {
		this.app.use(express.json());
		const authMiddleware = new AuthMiddleware(this.configService.get("JWT_SECRET"));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port, () =>
			this.logger.log(`App is running on port ${this.port}`),
		);
	}

	public close(): void {
		this.server.close();
	}
}

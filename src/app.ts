import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./user/user.controller";
import { IExeptionFilter } from "./errors/exeption.filter.interface";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;
  exeptionFilter: IExeptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    exeptionFilter: IExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  public useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  public useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port, () =>
      this.logger.log(`App is running on port ${this.port}`)
    );
  }
}

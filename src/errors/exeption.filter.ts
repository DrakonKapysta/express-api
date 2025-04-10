import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExeptionFilter implements IExeptionFilter {
  private logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }
  public catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).json({ err: err.message });
    } else {
      this.logger.error(err.message);
      res.status(500).json({ err: err.message });
    }
  }
}

import { Logger, ILogObj } from "tslog";

export class LoggerService {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      prettyLogTemplate:
        "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} [{{logLevelName}}]  ",
    });
  }

  public log(...args: unknown[]) {
    this.logger.info(...args);
  }

  public error(...args: unknown[]) {
    this.logger.error(...args);
  }

  public warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}

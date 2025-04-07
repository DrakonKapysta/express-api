import express, { Express } from "express";
import { Server } from "http";

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {}

  public async init() {
    this.server = this.app.listen(this.port, () =>
      console.log(`App is running on port ${this.port}`)
    );
  }
}

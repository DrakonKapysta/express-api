import { Container, ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./user/user.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IUserController } from "./user/user.controller.interface";
import { IUserService } from "./user/user.service.interface";
import { UserService } from "./user/user.service";

export const appModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.ILogger).to(LoggerService);
	options.bind<IUserController>(TYPES.UserController).to(UserController);
	options.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	options.bind<IUserService>(TYPES.UserService).to(UserService);
	options.bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<void> {
	const appContainer = new Container();
	appContainer.load(appModule);
	const app = appContainer.get<App>(TYPES.Application);

	await app.init();
}
bootstrap();

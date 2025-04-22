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
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma/prisma.service";
import { UserRepository } from "./user/user.repository";
import { IUserRepository } from "./user/user.repository.interface";

export const appModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	options.bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	options.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	options.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	options.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	options.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	options.bind<App>(TYPES.Application).to(App).inSingletonScope();
});

async function bootstrap(): Promise<void> {
	const appContainer = new Container();
	appContainer.load(appModule);
	const app = appContainer.get<App>(TYPES.Application);

	await app.init();
}
bootstrap();

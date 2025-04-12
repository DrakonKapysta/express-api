// bootstrap.ts
import { Container } from "inversify";
import { appModule } from "./main";
import { TYPES } from "./types";
import { App } from "./app";

export interface IBootstrap {
	appContainer: Container;
	app: App;
}

export async function bootstrap(): Promise<IBootstrap> {
	const appContainer = new Container();
	appContainer.load(appModule);

	const app = appContainer.get<App>(TYPES.Application);
	await app.init();

	return { appContainer, app };
}

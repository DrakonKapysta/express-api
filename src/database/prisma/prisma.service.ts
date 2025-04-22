import { PrismaClient, UserModel } from "../../generated/prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ILogger } from "../../logger/logger.interface";

@injectable()
export class PrismaService {
	private _client: PrismaClient;

	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		this._client = new PrismaClient();
	}

	get client(): PrismaClient {
		return this._client;
	}

	async connect(): Promise<void> {
		try {
			await this._client.$connect();
			this.logger.log("[PrismaService] Database connected successfully");
		} catch (error) {
			if (error instanceof Error)
				this.logger.error("[PrismaService] Error while connecting to database: " + error.message);
		}
	}

	async disconnect(): Promise<void> {
		await this._client.$disconnect();
	}
}

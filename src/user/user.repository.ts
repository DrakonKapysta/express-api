import { inject, injectable } from "inversify";
import { UserModel } from "../generated/prisma";
import { User } from "./user.entity";
import { IUserRepository } from "./user.repository.interface";
import { TYPES } from "../types";
import { PrismaService } from "../database/prisma/prisma.service";

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	public async create({ email, name, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}
	public async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}

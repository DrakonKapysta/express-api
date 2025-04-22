import { inject, injectable } from "inversify";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUserService } from "./user.service.interface";
import { User } from "./user.entity";
import { TYPES } from "../types";
import { IConfigService } from "../config/config.service.interface";
import { IUserRepository } from "./user.repository.interface";
import { UserModel } from "../generated/prisma";
import { UserLoginDto } from "./dto/user-login.dto";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser({ email, password, name }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get("SALT") || 10;
		await newUser.setPassword(password, Number(salt));
		// check if user exists?
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}

		return this.userRepository.create(newUser);
	}
	async validateUser({ email, password }: UserLoginDto): Promise<boolean | null> {
		const existedUser = await this.userRepository.find(email);
		if (!existedUser) return false;
		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePassword(password);
	}
}

import { inject, injectable } from "inversify";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUserService } from "./user.service.interface";
import { User } from "./user.entity";
import { TYPES } from "../types";
import { IConfigService } from "../config/config.service.interface";

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async createUser({ email, password, name }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get("SALT") || 10;
		await newUser.setPassword(password, Number(salt));
		// check if user exists?

		return newUser;
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean | null> {
		return null;
	}
}

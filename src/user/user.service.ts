import { injectable } from "inversify";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUserService } from "./user.service.interface";
import { User } from "./user.entity";

@injectable()
export class UserService implements IUserService {
	async createUser({ email, password, name }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// check if user exists?

		return newUser;
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean | null> {
		return null;
	}
}

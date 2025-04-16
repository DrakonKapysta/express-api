import { User } from "./user.entity";
import { UserRegisterDto } from "./dto/user-register.dto";

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<User | null>;
	validateUser(dto: UserRegisterDto): Promise<boolean | null>;
}

import { UserRegisterDto } from "./dto/user-register.dto";
import { UserModel } from "../generated/prisma";
import { UserLoginDto } from "./dto/user-login.dto";

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<UserModel | null>;
	validateUser(dto: UserLoginDto): Promise<boolean | null>;
	getUserInfo(email: string): Promise<UserModel | null>;
}

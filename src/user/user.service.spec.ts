import { Container } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { IUserRepository } from "./user.repository.interface";
import { IUserService } from "./user.service.interface";
import { TYPES } from "../types";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UserModel } from "../generated/prisma";

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UserRepositoryMock: IUserRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	userRepository = container.get<IUserRepository>(TYPES.UserRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe("UserService", () => {
	it("createUser", async () => {
		configService.get = jest.fn().mockReturnValueOnce("1");
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				id: 1,
				password: user.password,
			}),
		);
		createdUser = await userService.createUser({
			email: "a@gmail.com",
			password: "1",
			name: "Oleh",
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual("1");
	});
	it("validateUser - success", async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: "a@gmail.com",
			password: "1",
		});
		expect(res).toBeTruthy();
	});

	it("validateUser - wrong password", async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: "a@gmail.com",
			password: "2",
		});
		expect(res).toBeFalsy();
	});

	it("validateUser - wrong user", async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await userService.validateUser({
			email: "a1@gmail.com",
			password: "1",
		});
		expect(res).toBeFalsy();
	});
});

afterAll(() => {});

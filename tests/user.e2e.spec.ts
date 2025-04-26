import { App } from "../src/app";
import { bootstrap } from "../src/bootstrap";
import request from "supertest";

let application: App;

beforeAll(async () => {
	const { app } = await bootstrap();
	application = app;
});

describe("User e2e", () => {
	it("Register - error", async () => {
		const res = await request(application.app)
			.post("/users/register")
			.send({ email: "test@gmail.com", password: "123" });
		expect(res.status).toBe(422);
	});

	it("login - success", async () => {
		const res = await request(application.app)
			.post("/users/login")
			.send({ email: "test@gmail.com", password: "123" });
		expect(res.body.accessToken).not.toBeUndefined();
	});

	it("login - error", async () => {
		const res = await request(application.app)
			.post("/users/login")
			.send({ email: "test@gmail.com", password: "1" });
		expect(res.statusCode).toBe(401);
	});

	it("login - info", async () => {
		const login = await request(application.app)
			.post("/users/login")
			.send({ email: "test@gmail.com", password: "123" });
		console.log(login.body.accessToken);
		const res = await request(application.app)
			.get("/users/info")
			.set("Authorization", `Bearer ${login.body.accessToken}`);
		expect(res.body.userInfo).toBe("test@gmail.com");
	});

	it("login - info error", async () => {
		const res = await request(application.app).get("/users/info").set("Authorization", `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});

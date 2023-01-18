import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const { user } = new PrismaClient();
const userSeeder = async () => {
    const salt = await bcrypt.genSalt(10);
	await user.create({
		data: {
			name: "user",
			email: "user@gmail.com",
			password: await bcrypt.hash("123456", salt),
		},
	});
};

userSeeder();

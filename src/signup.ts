import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

type TSignup = {
	name: string;
	email: string;
	cpf: string;
	carPlate: string;
	isPassenger: boolean;
	isDriver: boolean;
}

export async function signup (input: TSignup): Promise<any> {
	const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
	try {
		const { name, email, cpf, carPlate, isDriver, isPassenger } = input
		const [accountExist] = await connection.query("select * from cccat17.account where email = $1", [email]);
		if (accountExist) return -4
		const nameIsInvalid = !validateName(name);
		if (nameIsInvalid) return -3;
		const emailIsInvalid = !validateEmail(email);
		if (emailIsInvalid) return -2;
		const documentIsInvalid = !validateCpf(cpf);
		if (documentIsInvalid) return -1;
		const carPlateIsInvalid = !validatePlate(carPlate);
		if (carPlateIsInvalid) return -5;
		const id = crypto.randomUUID();
		await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, name, email, cpf, carPlate, isPassenger, isDriver]);
		const userInformation = {
			accountId: id
		};
		return userInformation;
	} finally {
		await connection.$pool.end();
	}
}

function validateName(name: string) {
	return name.match(/[a-zA-Z] [a-zA-Z]+/);
}

function validateEmail(email: string) {
	return email.match(/^(.+)@(.+)$/);
}

function validatePlate(plate: string) {
	return plate.match(/[A-Z]{3}[0-9]{4}/);
}
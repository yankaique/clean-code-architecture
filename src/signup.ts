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
	const { name, email, cpf, carPlate } = input
	const accountExist = await getAccountByEmail(email);
	if (accountExist) throw new Error("Account already exists");
	const nameIsInvalid = !validateName(name);
	if (nameIsInvalid) throw new Error("Invalid name");
	const emailIsInvalid = !validateEmail(email);
	if (emailIsInvalid) throw new Error("Invalid email");
	const documentIsInvalid = !validateCpf(cpf);
	if (documentIsInvalid) throw new Error("Invalid cpf");
	const carPlateIsInvalid = !validatePlate(carPlate);
	if (carPlateIsInvalid) throw new Error("Invalid car plate");
	const id = crypto.randomUUID();
	const userInformation = Object.assign({id}, input);
	await createAccount(userInformation);
	return userInformation;
}

export async function getAccountById(accountId: any): Promise<any> {
	const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
	const [account] = await connection.query("select * from cccat17.account where account_id = $1", [accountId]);
	await connection.$pool.end();
	return account;
}

export async function getAccountByEmail(email: any): Promise<any> {
	const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
	const [account] = await connection.query("select * from cccat17.account where email = $1", [email]);
	await connection.$pool.end();
	return account;
}

export async function createAccount(userInformation: any) {
	const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
	const { id, name, email, cpf, carPlate, isDriver, isPassenger } = userInformation;
	await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, name, email, cpf, carPlate, isPassenger, isDriver]);
	await connection.$pool.end();
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
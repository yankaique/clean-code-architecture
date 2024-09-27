import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import AccountDAO from "./resource";

type TSignup = {
	name: string;
	email: string;
	cpf: string;
	carPlate: string;
	isPassenger: boolean;
	isDriver: boolean;
}
export default interface AccountService {
	signup (input: any): Promise<any>;
	getAccount (accountId: any): Promise<any>;
}
export class AccountServiceProduction implements AccountService {
	accountDao: AccountDAO;
	constructor (accountDAO: AccountDAO) {
		this.accountDao = accountDAO;
	}
	async signup (input: TSignup): Promise<any> {
		const { name, email, cpf, carPlate } = input
		const accountExist = await this.accountDao.getAccountByEmail(email);
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
		const userInformation = { accountId: id, ...input };
		await this.accountDao.saveAccount(userInformation);
		return userInformation;
	}

	async getAccount (accountId: any): Promise<any> {
		const account = await this.accountDao.getAccountById(accountId);
		return account;
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
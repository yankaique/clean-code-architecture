import { getAccountById, signup } from '../src/signup';

test.only("Deve criar uma conta de passageiro", async () => {
    const inputSignup = {
        email: `yankaiquecosta.yk${Math.random()}@gmail.com`,
        name: "John Doe",
        cpf: "99649516042",
        carPlate: "YAN6666",
        isPassenger: true,
        isDriver: false,
    }
    const outputSignup = await signup(inputSignup);
    const outputGetAccount = await getAccountById(outputSignup.id);
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.cpf).toBe(inputSignup.cpf);
})

test("Deve criar uma conta de passageiro", async () => {
    const inputSignup = {
        email: `yankaiquecosta.yk${Math.random()}@gmail.com`,
        name: "John Doe",
        cpf: "99649516042",
        carPlate: "YAN6666",
        isPassenger: false,
        isDriver: true,
    }
    const outputSignup = await signup(inputSignup);
    const outputGetAccount = await getAccountById(outputSignup.id);
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.cpf).toBe(inputSignup.cpf);
})


test("Não deve criar uma conta com o mesmo email", async () => {
    const existedUserInformation = {
        email: "yankaiquecosta.yk@gmail.com",
        name: "John Doe",
        cpf: "batata",
        carPlate: "YAN-6666",
        isPassenger: true,
        isDriver: true,
    }
    await expect(() => signup(existedUserInformation)).rejects.toThrow(new Error("Account already exists"));
});

test("Não deve criar uma conta de passageiro com nome inválido", async () => {
    const existedUserInformation = {
        email: "",
        name: "A12312312 12 3124123",
        cpf: "99649516042",
        carPlate: "YAN-6666",
        isPassenger: true,
        isDriver: true,
    }
    await expect(() => signup(existedUserInformation)).rejects.toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta de passageiro com email inválido", async () => {
    const existedUserInformation = {
        email: "123123.com",
        name: "John Doe",
        cpf: "99649516042",
        carPlate: "YAN-6666",
        isPassenger: true,
        isDriver: true,
    }
    await expect(() => signup(existedUserInformation)).rejects.toThrow(new Error("Invalid email"));
})

test("Should cpf is valid", async () => {
    const existedUserInformation = {
        email: "yan@gmail.com",
        name: "John Doe",
        cpf: "123",
        carPlate: "YAN-6666",
        isPassenger: false,
        isDriver: true,
    }
    await expect(() => signup(existedUserInformation)).rejects.toThrow(new Error("Invalid cpf"));
})

test("Não deve criar uma conta de passageiro com placa de carro inválida", async () => {
    const existedUserInformation = {
        email: "yan@gmail.com",
        name: "John Doe",
        cpf: "99649516042",
        carPlate: "batata",
        isPassenger: false,
        isDriver: true,
    }
    await expect(() => signup(existedUserInformation)).rejects.toThrow(new Error("Invalid car plate"));
})
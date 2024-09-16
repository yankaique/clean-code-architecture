import { signup } from '../src/signup';

test("Should find the email", async () => {
    const existedUserInformation = {
        email: "yankaiquecosta.yk@gmail.com",
        name: "John Doe",
        cpf: "batata",
        carPlate: "YAN-6666",
        isPassenger: true,
        isDriver: true,
    }
    const numberError = await signup(existedUserInformation);
    expect(numberError).toBe(-4);
});

test("Should name is valid", async () => {
    const existedUserInformation = {
        email: "yan@gmail.com",
        name: "A12312312 12 3124123",
        cpf: "99649516042",
        carPlate: "YAN-6666",
        isPassenger: true,
        isDriver: true,
    }
    existedUserInformation.name = ""
    const numberError = await signup(existedUserInformation);
    expect(numberError).toBe(-3);
});

test("Should email is invalid", async () => {
    const existedUserInformation = {
        email: "123123.com",
        name: "John Doe",
        cpf: "99649516042",
        carPlate: "YAN-6666",
        isPassenger: true,
        isDriver: true,
    }
    const numberError = await signup(existedUserInformation)
    expect(numberError).toBe(-2)
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
    const numberError = await signup(existedUserInformation);
    expect(numberError).toBe(-1);
})

test("Should plate is invalid", async () => {
    const existedUserInformation = {
        email: "yan@gmail.com",
        name: "John Doe",
        cpf: "99649516042",
        carPlate: "batata",
        isPassenger: false,
        isDriver: true,
    }
    const numberError = await signup(existedUserInformation)
    expect(numberError).toBe(-5)
})

// cpf
// email
// name
// exists
import { validateCpf } from "../src/validateCpf";

const cpf = "47638365879";
const invalidCPF = "47648465879";

test("Should return valid CPF", () => {
    const cpfIsValid = validateCpf(cpf);

    expect(cpfIsValid).toBe(true);
});

test.each([
    "",
    null,
    undefined, 
    "123456",
    "1412312312312312",
    "1111111111111111"
])("Should return invalid CPF", () => {
    const cpfIsValid = validateCpf(invalidCPF);

    expect(cpfIsValid).toBe(false);
});
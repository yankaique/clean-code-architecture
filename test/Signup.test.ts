import { signup } from '../src/signup';

test("Should find the email", () => {
    const email = "yankaiquecosta.yk@gmail.com";
    const getEmail = signup(email);
    expect(getEmail).toBe(true);
});
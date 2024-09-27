import pgp from "pg-promise";

export default interface AccountDAO {
    getAccountByEmail (email: string): Promise<any>;
    getAccountById (accountId: string): Promise<any>;
    saveAccount (account: any): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO {
    async getAccountByEmail(email: any): Promise<any> {
        const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
        const [account] = await connection.query("select * from cccat17.account where email = $1", [email]);
        await connection.$pool.end();
        return account;
    }

    async getAccountById(accountId: any): Promise<any> {
        const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
        const [account] = await connection.query("select * from cccat17.account where account_id = $1", [accountId]);
        await connection.$pool.end();
        return { ...account, ...{ carPlate: account.car_plate }};
    }
    
    async saveAccount(account: any) {
        const connection = pgp()("postgres://postgres:admin123@localhost:5432/postgres");
        const { accountId, name, email, cpf, carPlate, isDriver, isPassenger } = account;
        await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [accountId, name, email, cpf, carPlate, isPassenger, isDriver]);
        await connection.$pool.end();
    }
}

export class AccountDAOMemory implements AccountDAO {
    accounts: any[];

    constructor() {
        this.accounts = [];
    }

    async getAccountByEmail(email: any): Promise<any> {
        return this.accounts.find((accounts: any) => accounts.email === email);
    }

    async getAccountById(accountId: any): Promise<any> {
        return this.accounts.find((accounts: any) => accounts.account_id === accountId);
    }
    
    async saveAccount(account: any) {
        return this.accounts.push(account);
    }
}
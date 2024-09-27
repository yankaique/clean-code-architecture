import express from "express";
import AccountService from "./signup";

export default class API {
    app: any;
    accountService: AccountService;

    constructor (accountService: AccountService) {
        this.app = express();
        this.app.use(express.json());
        this.accountService = accountService;
    }

    build() {
        this.app.post("/signup", async (req: any, res: any) => {
            const input = req.body;
            try {
                const output = await this.accountService.signup(input);
                res.json(output);
            } catch (error: any) {
                res.status(422).json({
                    message: error.message
                });
            }
        });

        this.app.get("/accounts/:accountId", async (req: any, res: any) => {
            const accountId = req.params.accoutId;
            const output = await this.accountService.getAccount(accountId);
            res.json(output);
        });
    }

    start() {
        this.app.listen(3000);
    }
}
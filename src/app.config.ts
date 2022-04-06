export class AppConfig {
    private readonly _pgUsername: string;
    private readonly _pgPassword: string;
    private readonly _pgHost: string;
    private readonly _pgPort: number;
    private readonly _pgDatabase: string;
    private readonly _jwtSecret: string;

    constructor(){
        this._pgUsername = process.env.PGUSERNAME;
        this._pgPassword = process.env.PGPASSWORD;
        this._pgHost = process.env.PGHOST;
        this._pgPort = +process.env.PGPORT;
        this._pgDatabase = process.env.PGDATABASE;
        this._jwtSecret = process.env.PGSECRET;
    }

    get pgUsername() {
        return this._pgUsername;
    }

    get pgPassword() {
        return this._pgPassword;
    }

    get pgHost() {
        return this._pgHost;
    }

    get pgPort() {
        return this._pgPort;
    }

    get pgDatabase() {
        return this._pgDatabase;
    }

    get jwtSecret() {
        return this._jwtSecret;
    }
}
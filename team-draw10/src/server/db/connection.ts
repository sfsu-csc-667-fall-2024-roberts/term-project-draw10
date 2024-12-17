import dotenv from "dotenv";
import pgp from "pg-promise";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
}

const connection = pgp()(process.env.DATABASE_URL);

export default connection;
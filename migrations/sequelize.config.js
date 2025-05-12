require("dotenv").config({ path: ".env" });
module.exports = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env ==="test" ? `${process.env.DB_NAME}_test`: process.env.DB_NAME,
    dialect: "mariadb",
};

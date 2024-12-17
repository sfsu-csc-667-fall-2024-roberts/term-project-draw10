const { MigrationBuilder } = require('node-pg-migrate');

exports.shorthands = undefined;

/**
 * @param {MigrationBuilder} pgm - The migration builder
 */
// @ts-ignore
exports.up = async function (pgm) {
    console.log("Running the 'up' migration...");
    pgm.createTable("users", {
        id: "id",
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        username: {
            type: "varchar(50)",
            notNull: true,
        },
        email: {
            type: "varchar(254)",
            notNull: true,
        },
        password: {
            type: "varchar(60)",
            notNull: true,
        },
        gravatar: {
            type: "varchar(100)",
            notNull: true,
        },
    });
};

/**
 * @param {MigrationBuilder} pgm - The migration builder
 */
// @ts-ignore
exports.down = async function (pgm) {
    pgm.dropTable("users");
};
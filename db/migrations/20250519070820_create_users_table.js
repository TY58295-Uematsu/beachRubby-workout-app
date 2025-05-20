/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
        table.increments('id').primary();
        table.string('name', 64).nullable().unique();
        table.string('salt', 64).nullable();
        table.string('password', 64).nullable();
        table.string('session_id', 32);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('workout_to_users', function (table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.string('objective', 64);
    table.string('reflection', 64);
    table.integer('workout_id').nullable();

    table.foreign('user_id').references('users.id');
    table.foreign('workout_id').references('workout.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('workout_to_users');
};

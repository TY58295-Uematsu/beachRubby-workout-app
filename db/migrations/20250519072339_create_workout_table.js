/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('workout',function(table){
        table.increments('id').primary();
        table.date('workout_day').nullable();
        table.string('youtube_url');
        table.integer('workout1').nullable();
        table.integer('workout2').nullable();
        table.integer('workout3').nullable();
        table.integer('workout4').nullable();
        table.integer('workout5').nullable();
        table.integer('workout6').nullable();

        table.foreign('workout1').references('workout_menu.id');
        table.foreign('workout2').references('workout_menu.id');
        table.foreign('workout3').references('workout_menu.id');
        table.foreign('workout4').references('workout_menu.id');
        table.foreign('workout5').references('workout_menu.id');
        table.foreign('workout6').references('workout_menu.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('workout');
  
};

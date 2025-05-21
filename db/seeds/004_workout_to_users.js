/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('workout_to_users').del();
  await knex('workout_to_users').insert([
    { user_id: 1, objective: 'パス頑張る', reflection: 'パスミス0回', workout_id: 1 },
    { user_id: 1, objective: '死ぬ気で走る', reflection: '走り切れた', workout_id: 2 },
    { user_id: 1, objective: '声を出す', workout_id: 3 },
  ]);
  console.log('004seed');

};

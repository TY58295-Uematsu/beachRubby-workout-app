/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('workout_menu').del()
  await knex('workout_menu').insert([
    {workout_name: '-'},
    {workout_name: 'パス練習'},
    {workout_name: 'サインプレー練習'},
    {workout_name: '試合形式'}
  ]).returning('id');
  console.log('002seed');
  
  console.log('Inserted workout_menu IDs:', insertedIds); // ログに出力
};

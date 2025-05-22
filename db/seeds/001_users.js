/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //  users, workout_menu, workout_to_users, workoutについて参照している可能性のあるテーブルのデータをここで削除
  await knex('workout_to_users').del(); 
  await knex('workout').del(); 
  await knex('workout_menu').del(); 
  await knex('users').del(); 
  await knex('users').del()
  await knex('users').insert([
    {name: 'master', salt: '', password:'b94d27b9934d3e6d6e8c305561110799331422112d09c52c9d4e27d361001d03'},
    {name: 'Makoto', salt: 'd004280f7a63', password:'cb98c4d17d54de4b60ffc07795a4c0cce44b5802b3bb2e67c7df3de49435e6ed'},
    {name: 'Kanji', salt: 'c4c357f3056b', password:'50976e1b7977a5f49bd14620660266ec47692e58f89f6691cdaa1998772b7634'},
    {name: 'Chiaki', salt: '06c711b85a93', password:'b6d9950d094606e186fceeada0891be42de98faaddd6d950254a30f205090556'},
  ]);
  console.log('001seed');

};

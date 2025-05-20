/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {name: 'master', salt: '', password:'b94d27b9934d3e6d6e8c305561110799331422112d09c52c9d4e27d361001d03'}
  ]);
};

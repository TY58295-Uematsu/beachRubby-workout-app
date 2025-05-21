const initialValue = require('./../fixtures')
// console.log(initialValue);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  console.log('003seedstart');
  console.log(initialValue);
  await knex('workout').del()
  await knex('workout').insert(initialValue);
  console.log('003seedend');

};

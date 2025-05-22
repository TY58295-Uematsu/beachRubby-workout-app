/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('workout_to_users').del();
  await knex('workout_to_users').insert([
    { user_id: 2, objective: 'パス頑張る', reflection: 'パスミス0回', workout_id: 1 },
    { user_id: 2, objective: 'パス頑張る', reflection: 'パスミス1回', workout_id: 2 },
    { user_id: 3, objective: '遅刻しない', reflection: '30分早く到着した', workout_id: 2 },
    { user_id: 4, objective: '笑いをとる', reflection: '楽しく練習できた', workout_id: 2 },
    { user_id: 2, objective: '遅刻しない', reflection: '20分早く到着した', workout_id: 3 },
    { user_id: 3, objective: '遅刻しない', reflection: '30分早く到着した', workout_id: 3 },
    { user_id: 4, objective: '笑いをとる', reflection: '楽しく練習できた',workout_id: 3 },
    { user_id: 2, objective: '声を出す', workout_id: 4 },
    { user_id: 3, objective: '何とか晴れさせる', workout_id: 4 },
    { user_id: 4, objective: '日焼けをする', workout_id: 4 },
  ]);
  console.log('004seed');

};

// import db from "./knex.js";
const db = require('./knex');

const authCheck = async(
  req,
  res,
  next,
) => {
    // console.log('authCheck run...');
    try {
      const { sessionId } = req.cookies;
    //   console.log(req.query);
  
      const userName = req.query['users.name'];
      const userInfo = await db('users').where('name', userName).first()
      const sessionIdFromDB = userInfo.session_id;
    //   console.log("sessionId",sessionId,"sessionIdFromDB",sessionIdFromDB);
    
    if (sessionId !== sessionIdFromDB) throw new Error();
    console.log('authCheck完了!');
     next();
} catch {
      console.log('authCheckエラー🥹');
    res.clearCookie("sessionId");
     res.status(401).json({data:"Authentication failed!🥹"});
  }
};

module.exports=authCheck
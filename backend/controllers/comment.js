const connection = require("../models/db");
const createComment =(req ,res)=>{
    const { comment ,date } = req.body;
    const post_id = req.params.id;
    const user_id  = req.token.userId;
    const query = `INSERT INTO comments (comment ,date,post_id,user_id ) VALUES (?,?,?,?)`;
    const data = [comment ,date, post_id ,user_id];
    
  connection.query(query , data ,(err ,result)=>{
      if(err){
          return res.status(500).json({
              success: false,
              massage: "server error",
              err: err,
          });
      }
      res.status(201).json({
          success: true,
          massage: "Success comment created"
         
      })
  })
  }
  module.exports = {
    createComment
    };


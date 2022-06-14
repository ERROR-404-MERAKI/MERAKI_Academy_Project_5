const connection = require("../models/db");

const createMessage = (req,res) => {
  const persion_id = req.params.id;
  const idUser = req.token.userId;
  const { message } = req.body;
  const query = `INSERT INTO messages (persion_id ,user_id,message) VALUES (?,?,?)`;

  data = [persion_id, idUser, message];
  console.log(data ,"1111111111111111111111111");
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "Create message ",
      result,
    });
  });
};
const gitAllMessage =(req,res)=>{
    const user_id = req.token.userId;
    const persion_id = req.params.id;
    const query = `SELECT * FROM messages INNER JOIN users ON messages.user_id = users.idUser WHERE messages.is_deleted=0 AND messages.user_id =? AND messages.persion_id =?`;
    const data = [user_id , persion_id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error",
          err,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No message to show",
        });
      }
      res.status(200).json({
        success: true,
        message: result,
      });
    });
  
}
module.exports = {
    createMessage,
    gitAllMessage
  };

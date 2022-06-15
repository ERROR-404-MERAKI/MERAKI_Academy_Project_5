const connection = require("../models/db");

const createMessage = (req, res) => {
  const persion_id = req.params.id;
  const user_id = req.token.userId;
  const { message, room } = req.body;
  const query = `SELECT * FROM messages WHERE (user_id = ? AND persion_id=?)OR(persion_id=? AND user_id = ?  ) AND is_deleted=0`;
  const data = [user_id, persion_id, persion_id, user_id];
  console.log(query);
  connection.query(query, data, (err, result) => {
    console.log(result,"get mess");
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length) {

      const query = `INSERT INTO messages (message,room,persion_id,user_id) VALUES (?,?,?,?)`;
      const data = [message,result[0].room,persion_id,user_id];
      connection.query(query, data, (err, result) => {
        console.log(result ,"create mes")
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
    } else {
      const query = `INSERT INTO room (resive ,sender) VALUES (?,?)`;
      const data = [persion_id, user_id];
      connection.query(query, data, (err, result) => {
        console.log(result, "aaaaaaaaaa");
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "server error",
            err: err,
          });
        }
        if (result.affectedRows) {
          if (err) {
            return res.status(500).json({
              success: false,
              massage: "server error",
              err: err,
            });
          }
          const query = `INSERT INTO messages (message,room,persion_id,user_id) VALUES (?,?,?,?)`;
          const data = [message, result.insertId,persion_id,user_id];

          connection.query(query, data, (err, result) => {
        console.log(result, "createeeeeeee");

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
        }
      });
    }
  });
};

const query = `INSERT INTO messages (persion_id ,persion_id,message,room) VALUES (?,?,?,?)`;

// data = [persion_id, idUser, message,room ];

// connection.query(query, data, (err, result) => {

//   }

// });

const gitAllMessage = (req, res) => {
  const user_id = req.token.userId;
  const room = req.params.id;

  const query = `SELECT * FROM messages INNER JOIN users ON messages.user_id=users.idUser WHERE messages.is_deleted=0 AND messages.user_id =?  AND  messages.room=?`;
  const data = [user_id, room];
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
};
module.exports = {
  createMessage,
  gitAllMessage,
};

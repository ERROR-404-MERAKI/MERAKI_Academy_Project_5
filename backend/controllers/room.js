const connection = require("../models/db");
const createRoom = (req, res) => {
  const resive = req.params.id;
  const sender = req.token.userId;
  const query = `SELECT * FROM messages WHERE (user_id = ? AND persion_id=?)OR(persion_id=? AND user_id = ?  ) AND is_deleted=0`;
  const data = [sender, resive, resive, sender];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length) {
      res.status(201).json({
        success: true,
        massage: "room exiest ",
        result,
      });
    } else {
      const query = `INSERT INTO room (resive ,sender) VALUES (?,?)`;
      const data = [resive, sender];
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
          massage: "Create room ",
          result,
        });
      });
    }
  });
};

const getRoom = (req, res) => {
  const resive = req.params.id;
  const sender = req.token.userId;
  const query = `SELECT * FROM room WHERE resive = ? AND sender = ? `;
  const data = [resive, sender];
  connection.query(query, data, (err, result) => {
    console.log(data);
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length) {
      res.status(201).json({
        success: true,
        massage: "room exiest",
        result,
      });
    }
  });
};

module.exports = {
  createRoom,
  getRoom,
};

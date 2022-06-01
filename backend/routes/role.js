const express = require("express");

const { createRole } = require("../controllers/role");

const roleRouter = express.Router();

//create role 
//http://localhost:5000/role
/*test 
{
    "role":"User"
}
*/
roleRouter.post("/", createRole);

module.exports = roleRouter;

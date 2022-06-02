const express = require("express");

// import function
const { createPermission } = require("../controllers/permissions");
// create router
const permissionRouter = express.Router();

//Api request
// method POST endpoint http://localhost:5000/permissions/id
/* 
test 
{permission : "ADD_AD"}
*/

permissionRouter.post("/:id", createPermission);

// export router
module.exports = permissionRouter;

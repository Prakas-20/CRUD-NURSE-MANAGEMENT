const express = require("express");
const { getAllNurses, getNurseDataById, createNewNurseData, UpdateNurseData, DeleteNurse } = require("../controller/NurseIdController");

//ROUTER OBJECT
const router = express.Router();

//ROUTES

//GET ALL Student LIST || GET 
router.get('/getall',getAllNurses)

//GET A PARTICULAR Student BY ID
router.get('/get/:id',getNurseDataById)

//POST A NEW Student
router.post('/create',createNewNurseData)

//UPDATE THE USER
router.put('/update/:id',UpdateNurseData)

//DELETE THE USER
router.delete('/delete/:id',DeleteNurse)

module.exports = router
const db = require("../config/db");

// GET ALL USER
const getAllNurses = async(req,res) => {
    try
    {
        const data = await db.query('SELECT * FROM nurses')
        if(!data)
        {
           return res.status(404).send({
                success:false,
                message:"No Record Found"
           })
        }
        res.status(200).send({
                success:true,
                message:"All Students Record",
                TotalNurses:data[0].length,
                data:data[0]
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get All Nurse ApI",
            error
        })
    }
};


// GET USER BY PARTICULAR ID
const getNurseDataById = async(req,res)=>{
    try
    {
        const studentId = req.params.id;
        if(!studentId)
        {
            return res.status(404).send({
                success:false,
                message:"INVALID ID"
           })
        }
        const data =await db.query(`SELECT * FROM nurses WHERE id=?`,[studentId]);
        if(!data)
        {
            return res.status(404).send({
                success:false,
                message:"No Record Found"
           })
        }
        res.status(200).send({
          success: true,
          NurseDetails: data[0],
        });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get Nurse by Id ApI",
            error
        })
    }
}

//POST NEW USER

const createNewNurseData = async(req,res)=>{

    try{
        const {name, license, dob, age} = req.body
        if(!name || !license || !dob || !age)
        {
            console.log(error)
            res.status(500).send({
                success:false,
                message:"please Provide all data",
                error
            })
        }
        const data =await db.query(`INSERT INTO nurses (name, license, dob, age) VALUES (?,?,?,?)`,[name, license, dob, age]);
        if(!data)
        {
            return res.status(404).send({
                success:false,
                message:"Error in Insert data"
           })
        }
        res.status(200).send({
            success:true,
            message: "New Nurse ID Created"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in create Nurse ApI",
            error
        })
    }

}

//UPDATE THE EXSTING USER
const UpdateNurseData = async(req,res)=>{
    try{
        const NurseId = req.params.id;
        if(!NurseId)
        {
            return res.status(404).send({
                success:false,
                message:"INVALID ID "
           });
        }
        const {name, license, dob, age} = req.body;
        const data =await db.query(`UPDATE nurses SET name = ?, license = ?, dob = ?, age = ? WHERE id = ?`,[name, license, dob, age, NurseId])
        if(!data)
        {
            console.log(error)
            res.status(500).send({
                success:false,
                message:"please Provide all data",
                error
            })
        }
        res.status(200).send({
            success:true,
            message: "Nurse Updated"
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update Nurse ApI",
            error
        })
    }
}

//DELETE THE USER BY ID
const DeleteNurse = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "INVALID ID"
            });
        }
        const data = await db.query(`DELETE FROM nurses WHERE id = ?`, [studentId]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Record Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Nurse by Id API",
            error: error.message
        });
    }
};

module.exports = {getAllNurses, getNurseDataById, createNewNurseData, UpdateNurseData, DeleteNurse}
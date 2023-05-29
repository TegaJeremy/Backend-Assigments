const express = require ("express");
const mongoose = require ("mongoose")
const PORT =  2059;
const manage = express();
manage.use(express.json());


const managementschema=new mongoose.Schema(
 {
        
        manager:String,
        employee1:String, 
        employee2:String, 
        employee3:String, 
        employee4:String, 
        employee5:String, 
        employee6:String, 
        employee7:String, 
        
       
       
    }
)

const user =mongoose.model("management", managementschema)
 
// blog.get("/",(req,res)=>{
//     res.status(200).json("welcome to my page")
//     // res.send("welcome to my page")
// })



//creating a data in database

manage.post("/putinworker", async (req,res)=>{
    const newResult = await new user(req.body);
    newResult.save()
    
    res.status(200).json(newResult)
    
})

// get all data

manage.get("/getallworker", async(req,res)=>{
    const  all  = await user.find();
    res.status(200).json({
        message:"the available user are" + all.length, data:all
    })
})

//get one
manage.get("/getone/id" , async(req, res)=>{
    const id =req.params.id
    const oneusr = await user.findById(id)
    console.log(oneuser)
    res.status(200).json(
        {message:`kindly find the infomation of the user with the id of ${id}`, data:oneuser}
    )

})

// delete a user
manage.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    const deleteUser = await user.findByIdAndDelete((id))

    res.status(200).json(
       { message:`this infomation of the user with the id of ${id} has been delete`,
            data:deleteUser
    
            }
    )
})

manage.put("/editworker/:id", async (req, res)=>{
    const id = req.params.id;
    const edittask = await user.findByIdAndUpdate((id))
    res.status(201).json( {
        message: "update successful",
        title :edittask
    }
        
    )
    
})



mongoose.connect("mongodb+srv://oghenedemartin:eQX78GsvMNFP2p44@cluster0.rivgmxb.mongodb.net/")
.then(()=>{
   console.log("connection successful")
}) 
manage.listen(PORT , ()=>{
    console.log(`server is listening to ${PORT}`)
})

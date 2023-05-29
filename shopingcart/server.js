const express = require ("express");
const mongoose = require ("mongoose")
const PORT =  2049;
const shop = express();
shop.use(express.json());


const shopschema=new mongoose.Schema(
 {
        
        Name:String,
        item:String, 
        price:String,
        Date:String,
       
    }
)

const user =mongoose.model("Shop", shopschema)
 
// blog.get("/",(req,res)=>{
//     res.status(200).json("welcome to my page")
//     // res.send("welcome to my page")
// })



//creating a data in database

shop.post("/createcart", async (req,res)=>{
    const newResult = await new user(req.body);
    newResult.save()
    
    res.status(200).json(newResult)
    
})

// get all data

shop.get("/getallcart", async(req,res)=>{
    const  all  = await user.find();
    res.status(200).json({
        message:"the available user are" + all.length, data:all
    })
})

//get one
shop.get("/getone/id" , async(req, res)=>{
    const id =req.params.id
    const oneusr = await user.findById(id)
    console.log(oneuser)
    res.status(200).json(
        {message:`kindly find the infomation of the user with the id of ${id}`, data:oneuser}
    )

})

// delete a user
shop.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    const deleteUser = await user.findByIdAndDelete((id))

    res.status(200).json(
       { message:`this infomation of the user with the id of ${id} has been delete`,
            data:deleteUser
    
            }
    )
})

shop.put("/editcontact/:id", async (req, res)=>{
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
shop.listen(PORT , ()=>{
    console.log(`server is listening to ${PORT}`)
})

const express = require("express")
const cors = require("cors")


let app = express()
app.use(cors())

app.use(express.static(path.join(__dirname,"./client/build")))


app.listen(1111,()=>{
  console.log("listening to port 1111")
})

const mongoose = require("mongoose")

// mongoose.connect("mongodb://0.0.0.0:27017/Employees2023")

mongoose.connect("mongodb+srv://kshirisha:kshirisha@cluster0.mvnant1.mongodb.net/Batch2212?retryWrites=true&w=majority")

let employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         trim:true,
        lowercase:true,
        validate: {
            validator: function(v) {
              return  /^[a-zA-Z ]{2,30}$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
          },
          required: [true, 'User name is required']
        },

      gender:{
      type:String,
      required:true,
      lowercase:true,
      enum:["male","female"],
       },
      
     email:{
        type:String,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: props => `${props.value} is not a valid email id!`
          },
          required: [true, 'User email is required']
        },

    mobileNo:String,
    age:{
        type:Number,
        min:18,
        max:80,
        required:true
    },

    maritalStatus:{
      type:String,
      required:true,
      enum:["single","married"],
      lowercase:true,
    }
    
})

  let Employee = new mongoose.model("employee",employeeSchema)


  app.get("/getEmployees",async(req,res)=>{

    let results = await Employee.find()
  
    res.json(results)
  
  })
  



   let saveIntoDb = async()=>{

    try{

        let sirisha = new Employee({
            name:"Sirisha",
            email:"siri@gmail.com",
            mobileNo:"+91-1234512345",
            age:25,
        })
        
        let hansita = new Employee({
            name:"hansita",
            email:"hanu@gmail.com",
            mobileNo:"+91-1234512345",
            age:20,
        })


        let manohar = new Employee({
            name:"manohar",
            email:"manu@gmail.com",
            mobileNo:"+91-99999999999",
            age:22,
            gender:"MALE",
            maritalStatus:"SINGLE"
        })

        await manohar.save()
        
    //     await hansita.save()
    //    await sirisha.save()

    //   await Employee.insertMany([sirisha,hansita])
     console.log("saved succesfully")
    }catch(error){
     console.log("something is wrong")
    }
   
   }

   saveIntoDb()


 
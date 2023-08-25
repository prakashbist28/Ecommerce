const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe")
const bcrypt = require('bcrypt')
const generateToken = require('./generateToken')

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); //convert data coming from api to json, limit is set to set limit for amount of data to be accepted as request like image, name,pass..

const PORT = process.env.PORT || 8000;
//mongodb conn
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required : true,
    unique: true,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
  image: String,
  
},
{ timestamps : true},);

//model
const userModel = mongoose.model("user", userSchema);

//signup api
app.post("/signup", async (req, res) => {
  const { email, password, confirmpassword, image, firstname, lastname } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user without storing the confirmation password
      const user = await userModel.create({
        email,
        password: hashedPassword,  
        image, 
        firstname,
        lastname,
      });

      // Remove the password property from the user object before sending the response
      delete user.password;
      res.send({ message: "Registered Successfully", alert: true });
    }
  } catch (err) {
    console.log(err);
  }
});


//login api
app.post("/login", async (req, res) => {

  try{

    const {email,password} = req.body;

const data = await userModel.findOne({email});
if(!data){
    return res.json({msg:"Incorrect email or password", alert: false})  
}

//compare passwords sent from login page of frontend with the ones in db
const pass = await bcrypt.compare(password,data.password)
if(!pass){
    return res.json({message:"Incorrect username or password", alert:false})
}
    if (data && pass) {
      const dataSent = {
        _id: data._id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        image: data.image,
        token : generateToken(data._id),
      }; 
      
      delete data.password;//we dont need password
      res.cookie("jwtoken", dataSent.token, {
        expires:new Date(Date.now() + 3600),
        httpOnly: true
      })
res.send({message : 'Login successfull',alert:true, data : dataSent})
    }

}
catch(ex){
    console.log(ex);
}

});

//product section
//prduct schema
const SchemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

//product model
const productModel = mongoose.model("product", SchemaProduct);

//save Product in db 

app.post("/uploadProduct", async (req, res) => {
  const data = productModel(req.body);
  const savedData = await data.save();
  res.send({ message: "Uploaded Successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//payment

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/payment', async(req,res)=>{

  try {
  const params = {
    submit_type : 'pay',
    mode : 'payment',
    payment_method_types : ['card'],
    billing_address_collection : 'auto',
    shipping_options : [{shipping_rate : 'shr_1Nde8pSF0dfaqHBc25wbbHvc'}],


    line_items : req.body.map((item)=>{
      return{
        price_data : {
          currency : 'inr',
          product_data : {
            name : item.name,
            // image : [item.image],
          },
          unit_amount : item.price * 100
          },
          adjustable_quantity : {
            enabled : true,
            minimum : 1,
          },
          quantity : item.qty

        }
    }),
    success_url : `${process.env.FRONTEND_URL}/success`,
    cancel_url : `${process.env.FRONTEND_URL}/cancel`
  }

  const session = await stripe.checkout.sessions.create(params)
  res.status(200).json(session.id)
  }
  catch(err) {
    res.status(err.statusCode || 500).json(err.message)
  }
})


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));



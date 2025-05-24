const express = require("express");
const apiRouter = require("./api");
const randomRoute = require("./random-fact/random.route");
const multer = require("multer");
const { upload } = require("./config/cloudinary.congif");
const app = express();
app.use(express.json());

app.use('/api', apiRouter)
app.use('/random' , randomRoute)


app.post('/upload',upload.single('image'), (req,res)=>{
  res.status(201).json({message:"uploaded succsesfully" , url:req.file.path})
})





app.listen(4000, () => {
  console.log("server is runniong oin http://localhost:4000");
});

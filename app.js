const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

// Set storage 
let storage = multer.diskStorage({
  destination : "./views/upload",
  filename: function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalName))
  }
});
const upload = multer({
  storage: storage,
  
}).single('myImage')
const app = express()


// EJS setup 

app.set('view engine','ejs')
app.use(express.static("./views"))

app.get('/',(req,res) =>  res.render('index'))

app.post('./upload',(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      res.render('index',{
        msg:err
      })
    }else{
      console.log(req.file)
      res.send('tested')
    }
  })
})

const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(port)
})
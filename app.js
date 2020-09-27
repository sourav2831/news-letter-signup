const express=require("express")
const app=express()
const https=require("https")
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",(req,res)=>{
    
    res.sendFile(__dirname+"/signUp.html")

})
app.post("/",(req,res)=>{
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    var data = {
        members : [{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/a3220809f8"
    const options ={
        method: "POST",
        auth: "sourav2831:a17d975473a719c1f20079901642aae4-us10"
    }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
    })
    request.write(jsonData)
    request.end();
})
app.post("/failure",(req,res)=>{
    res.redirect("/")
})
app.listen(3000,()=>{
    console.log("Server started at 3000");
})
//a17d975473a719c1f20079901642aae4-us10
//a3220809f8
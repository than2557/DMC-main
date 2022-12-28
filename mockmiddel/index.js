const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const  bodyParser = require('body-parser');
const dotenv = require('dotenv');
app.use(cors());
// app.use(bodyParser());
dotenv.config();


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`listening on port ${PORT}`));



app.get('/',(req,res)=>{

    res.send('Hello, Express!');
})


app.get(process.env.EXPRESS_APP_SYSTEM_LIST,async(req,res) =>{
try{
const aut = req.headers.authorization;
 // console.debug(process.env.REACT_APP_SYSTEM_LIST_R02)
   const getSystemList = await axios.get(process.env.REACT_APP_SYSTEM_LIST_R02,{  headers: {
    'authorization': aut
  }})
return res.send({"data":getSystemList.data});
}catch(e){
    console.log(e)
    return({error:e.stack,error:e});
}

});


app.get(process.env.EXPRESS_APP_COMTYPE_LIST,async(req,res) =>{
    try{
        const aut = req.headers.authorization;
          
           const ComTypeList = await axios.get(process.env.REACT_APP_COMTYPE_LIST_R03,{  headers: {
            'authorization': aut
          }})
        return res.send({"data":ComTypeList.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
    
    });

app.get(process.env.EXPRESS_APP_REPORT_01,async(req,res) =>{

    try{
      // console.log(req); 
        const aut = req.headers.authorization;
          const body = {'type': parseInt(req.query.type),'state':parseInt(req.query.state),'year':req.query.year};


          console.log(body)
           const report01 = await axios.get(process.env.REACT_APP_URL_REPORT_ONE,{data:body, headers: {
            'Authorization': aut,
            'Content-Type':'application/json;UTF-8'
          }})
         
        return res.send({"data":report01.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})


app.get(process.env.EXPRESS_APP_REPORT_01,async(req,res) =>{

    try{
        const aut = req.headers.authorization;
        const body = {'id': parseInt(req.query.id),'year':req.query.year};
        console.log(body)
           const report02 = await axios.get(process.env.REACT_APP_URL_REPORT_TWO,{data:body, headers: {
            'authorization': aut,
            'Content-Type':'application/json;UTF-8'
          }})
         
        return res.send({"data":report02.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})

app.get(process.env.EXPRESS_APP_REPORT_03,async(req,res) =>{

    try{
        const aut = req.headers.authorization;
        const body = {'usertype': parseInt(req.query.usertype),'comtype':req.query.comtype,'year':req.query.year};
        console.log(body)
           const report03 = await axios.get(process.env.REACT_APP_URL_REPORT_TREE,{data:body,headers:{
            'authorization': aut
          }})
         
        return res.send({"data":report03.data});
        }catch(e){
            return res.send({"data":{status:false}});
        }
})
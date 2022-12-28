const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const  bodyParser = require('body-parser');
const dotenv = require('dotenv');
app.use(cors());
app.use(bodyParser());
dotenv.config();


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`listening on port ${PORT}`));



app.get('/',(req,res)=>{

    res.send('Hello, Express!');
})


app.get('/report02/systemlist',async(req,res) =>{
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


app.get('/report03/ComTypeList',async(req,res) =>{
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

app.get('/DmscReportGateway/api/v1/chart/report/01',async(req,res) =>{

    try{
        const aut = req.headers.authorization;
          const body = req.body;
          console.log(body)
           const report01 = await axios.get(process.env.REACT_APP_URL_REPORT_ONE,{body:body, headers: {
            'authorization': aut,

          }})
         
        return res.send({"data":report01.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})


app.get('/DmscReportGateway/api/v1/chart/report/02',async(req,res) =>{

    try{
        const aut = req.headers.authorization;
        const body = req.body;
        console.log(body)
           const report02 = await axios.get(process.env.REACT_APP_URL_REPORT_TWO,{ body:body, headers: {
            'authorization': aut
          }})
         
        return res.send({"data":report02.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})

app.get('/DmscReportGateway/api/v1/chart/report/03',async(req,res) =>{

    try{
        const aut = req.headers.authorization;
        const body = req.body;
        console.log(body)
           const report02 = await axios.get(process.env.REACT_APP_URL_REPORT_TREE,{body:body,headers:{
            'authorization': aut
          }})
         
        return res.send({"data":report02.data.datasets});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})
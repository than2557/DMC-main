'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const  bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fileDownload = require('js-file-download');
const Ajv = require('ajv');
const ajv = new Ajv()
const DmscrSc = require('./schema/DMSC.json');
const fs = require('fs');
const  jwtdecode = require('jwt-decode');
const { createLogger, format, transports } = require('winston');
const path = require('path');

app.use(cors());
// app.use(bodyParser());
dotenv.config();


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`listening on port ${PORT}`));



app.get('/',(req,res)=>{

    res.send('Hello, Express!');
})


app.post(process.env.EXPRESS_APP_LOGIN,async(req,res)=>{
try{
  // check status login data // for create log error login  case false // no flow data respon 
  const body = req.query;
  const aut = req.headers.authorization;
  const decodeJwt =  jwtdecode(aut)
  let data = {
    username: body.username,
    timeDatetielogin : new Date(decodeJwt.iss)
};

let jsonString = JSON.stringify(data);


await loger(jsonString,'Dmsc-login');
return res.send({"message":"log created"});
}catch(e){
  console.log(e)

  return({error:e.stack,error:e});
}
 
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
    console.log(req); 
      const aut = req.headers.authorization;
         const getComtypeList = await axios.get(process.env.REACT_APP_COMTYPE_LIST_R03,{headers: {
          'Authorization': aut,
        }})
       
      return res.send({"data":getComtypeList.data});
      }catch(e){
          console.log(e)
          return({error:e.stack,error:e});
      }
    
    });




app.get(process.env.EXPRESS_APP_REPORT_01,async(req,res) =>{

    try{
      
       const aut = req.headers.authorization;
        const validate = ajv.compile(DmscrSc.DmscReport)
        const body = {'type': parseInt(req.query.type),'state':parseInt(req.query.state),'year':req.query.year};
          console.log(body)
           const report01 = await axios.get(process.env.REACT_APP_URL_REPORT_ONE,{data:body, headers: {
            'Authorization': aut,
            'Content-Type':'application/json;UTF-8'
          }})
          const valid = ajv.validate(DmscrSc.DmscReport,report01.data);
           if (!valid) {
          
            console.log(ajv.errors)
            const error =  await validateError(ajv.errors);
            if(!error.data.status){

              return res.send(error)
            }
          
          }
        return res.send({"data":report01.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})


app.get(process.env.EXPRESS_APP_REPORT_02,async(req,res) =>{

    try{
        const aut = req.headers.authorization;
        const body = {'id': parseInt(req.query.id),'year':req.query.year,'systemname':req.query.systemname};
        console.log(body)
           const report02 = await axios.get(process.env.REACT_APP_URL_REPORT_TWO,{data:body, headers: {
            'authorization': aut,
            'Content-Type':'application/json;UTF-8'
          }})
          const validate = ajv.compile(DmscrSc.DmscReport)
          const valid = ajv.validate(DmscrSc.DmscReport,report02.data);
                     if (!valid) {
                    
                      console.log(ajv.errors)
                      const error =  await validateError(ajv.errors);
                      if(!error.data.status){
          
                        return res.send(error)
                      }
                    
                    }
        return res.send({"data":report02.data});
        }catch(e){
            console.log(e)
            return({error:e.stack,error:e});
        }
})

app.get(process.env.EXPRESS_APP_REPORT_03,async(req,res) =>{

    try{
        const aut = req.headers.authorization;
        const body = {"usertype": parseInt(req.query.usertype),"comtype":req.query.comtype,"year":req.query.year};
        console.log(body)
           const report03 = await axios.get(process.env.REACT_APP_URL_REPORT_TREE,{data:body,headers:{
            'authorization': aut
          }})
          const validate = ajv.compile(DmscrSc.DmscReport)
          const valid = ajv.validate(DmscrSc.DmscReport,report03.data);
                     if (!valid) {
                    
                      console.log(ajv.errors)
                      const error =  await validateError(ajv.errors);
                      if(!error.data.status){
          
                        return res.send(error)
                      }
                    
                    }
        return res.send({"data":report03.data});
        }catch(e){
            return res.send({"data":{status:false}});
        } 
})


app.post(process.env.EXPRESS_APP_REPORT_EXCELL_PDF_01,async(req,res)=>{
  
  try{
 const aut = req.headers.authorization;
 const body = {'type': parseInt(req.query.type),'state':parseInt(req.query.state),'year':req.query.year};
  console.log(body);
  const fake = {"image":"jp1"};
  let url = process.env.REACT_APP_URL_REPORT_01_FILE+"/"+req.query.typeDowload.typedata;
  const respon = await axios.get(url,{data:body,responseType:'blob',headers:{
    'authorization': aut,
  }})



  return res.send(respon.data);
  }catch(e){
    return res.send({"data":{status:false}});
  }
});



app.post(process.env.EXPRESS_APP_REPORT_EXCELL_PDF_02,async(req,res)=>{
  
  try{
 const aut = req.headers.authorization;
 const body = {'id': parseInt(req.query.id),'year':req.query.year,'systemname':req.query.systemname};
  console.log(body);
  let url = process.env.REACT_APP_URL_REPORT_02_FILE+"/"+req.query.typeDowload.typedata;
  const respon = await axios.get(url,{data:body,responseType:'blob',headers:{
    'authorization': aut,
  }})
  return res.send(respon.data);
  }catch(e){
    return res.send({"data":{status:false}});
  }
});



app.post(process.env.EXPRESS_APP_REPORT_EXCELL_PDF_03,async(req,res)=>{

  try{
    const aut = req.headers.authorization;
    const body = {"usertype": parseInt(req.query.usertype),"comtype":req.query.comtype,"year":req.query.year};
    let url = process .env.REACT_APP_URL_REPORT_03_FILE+"/"+req.query.typeDowload.typedata;
    const respon = await axios.get(url,{data:body,responseType:'blob',headers:{
      'authorization': aut,
    }});
    console.log(JSON.stringify(body));
    return res.send(respon.data);
  }catch(e){
    return res.send({"data":{status:false}});
  }

})

async function loger(data,log,error){
  const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, `${log}.log`);

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});
if(error){
  logger.error(error);
}
else{
  logger.info(data);
}



}

async function validateError(errors){
  let DataErrorMessage
  errors.forEach(ErrorData => {
    switch(ErrorData.keyword){
      case 'type':
       DataErrorMessage= {"data":{status:false,"message":ErrorData.message,"variable":ErrorData.instancePath}}
       break;
    }
  
  });
  return DataErrorMessage
}
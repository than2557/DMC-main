import React,{useEffect} from "react";


async function  DataOption () {
    
//   let Jsondata = {
//     "systemlist":[
//         {
//             "name":"ระบบสนับสนุนพระราชบัญญัติเชื้อโรคและพิษจากสัตว์ออนไลน์",
//             "id":1
//         },
//         {
//             "name":"Developer",
//             "id":42
//         }
//     ],
//     "status": true
// };
let response;
  let url = "http://localhost/DmscReportGateway/api/v1/report02/systemlist";
useEffect(() => {
  response = fetch(url,{
    method:'POST', 
    mode: 'cors',
    headers:{ 
      'content-type': 'application/json;UTF-8',
    }
  })
},[response]);
let resJson = JSON.parse(response);
 
 return resJson;
}
export default DataOption;
import React, { useState, useEffect } from 'react';

function GetSelectExcel(Authorization) {
    let [SelectExcel,setSelectExcel] = useState();
let url = 'http://192.168.33.87:9877/DmscReportGateway/api/v1/excel/report01/diseaselist';


const DataAntigen = async()=>{
    await fetch(url,{
method:'POST', 
headers:{ 
  'content-type': 'application/json;UTF-8',
  'Authorization':Authorization
}}).then(response =>response.json().then(data=>({data: data})).then(res =>{
    
     let data_res = res.data.listdisease;
     setSelectExcel(data_res)
    }));
}
// const A_data = []
//  A_data = SelectExcel.values(a => 'a')
useEffect(() => {
    DataAntigen();
  }, [])
  return SelectExcel;
}

export default GetSelectExcel

import { Link,HistoryRouterProps,redirect} from "react-router-dom";
import { Route,Routes,BrowserRouter,useNavigate } from 'react-router-dom';
import './chart.css';
import React,{useState,SyntheticEvent,useEffect} from'react';
import {Button,Card,Row,Col,Container,Navbar,Nav,Jumbotron,InputGroup,Form,NavDropdown} from 'react-bootstrap';

import LineChart from '../../component/LineChart';
import logo from '../../img/icon.png';

import jwt_decode  from "jwt-decode";
// import dataOption from '../chartReport/getoptionchart';   
import 'chart.js/auto'; 


function ReportChart() {
  
  const options = {
    responsive: true,
    maintainAspectRatio:false
  };
  const labels = [
    "ม.ค.",
    "ก.พ",
    "มี.ค.",
    "เม.ย",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
    "ม.ค."
  ];
  let data 
let LineData = {labels,datasets:[]};
  const [arrDataOption, setArrData] = useState([]);
  const [type, setType] = useState();
  const [state, setState] = useState();
  const [year, setYear] = useState();
  const [ChartData,setChartData] = useState(LineData);
 const [ComTypeList,setComTypeList] = useState([]);
 const [comtype,setComType] = useState()
  const [optionData,setoptiondata] = useState();
  const [id, setId] = useState();
  const [usertype,setUserType] = useState();  
  const [agency,setagency] = useState();

let data_option;
  let url = "http://localhost:3005/DmscReportGateway/api/v1/report02/systemlist";
let data_option3;

const fetchData = async() => {
  await fetch(url,{
    method:'POST', 
  }).then(optionData =>optionData.json().then(data=>({data: data,
    status: optionData.status})).then(res =>{
      data_option  = res.data.systemlist;
      
      // console.log(data_option)
      setArrData(data_option)
      return data_option;
    }));
}


const comType = async() =>{
 // let urlR = "http://192.168.33.81:9877/DmscReportGateway/api/v1/report03/comtypelist";
 let url = "http://localhost:3005/DmscReportGateway/api/v1/report03/comtypelist";
  await fetch(url,{
    method:'POST', 
  }).then(optionData =>optionData.json().then(data=>({data: data})).then(res =>{
      data_option3  = res.data.comtypelist;
   //   console.log(data_option3)
      setComTypeList(data_option3)
      return data_option3;
    }));
  
}
useEffect(() => {
  fetchData();
  comType();
}, [])







  
  
  let token = localStorage.getItem("accessToken");
  let decodeJwt = jwt_decode(token);
  // console.log(decodeJwt);
  let Authorization = 'Bearer'+' '+token;
 
 // let url = `http://192.168.33.81:9877/DmscReportGateway/api/v1/report02/systemlist`;
 let optionTask 
 let TaskData 

 const SerachDataTree =  async() => {
  
  let data_res

 data = {usertype,comtype,year};
  
  console.log(data);
 
  // console.log(token);
 




  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report02/data';
  let url = 'http://localhost:3005/reporttree'
  // let url = 'http://localhost:3005/reportData';

  const response =  await fetch(url,{
    method:'POST', 
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    }
  }).then(response =>response.json().then(data=>({data: data,
        status: response.status})).then(res =>{
          
          data_res = res.data;
          console.log(data_res);
          if(data_res.status){

            setChartData({labels,datasets:data_res.datasets})
          }else{
            setChartData({labels,datasets:[]})
          }
          
      
         
        }));
     
      
}


const SerachDataTwo =  async() => {
  
  let data_res

 data = {id,year};
  
  console.log(data);
 
  // console.log(token);
 




  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report02/data';
  // let url = 'http://localhost:3005/reporttree'
  // let url = 'http://localhost:3005/reportData';

  const response =  await fetch(url,{
    method:'POST', 
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    }
  }).then(response =>response.json().then(data=>({data: data,
        status: response.status})).then(res =>{
          
          data_res = res.data;
          console.log(data_res);
          if(data_res.status){

            setChartData({labels,datasets:data_res.datasets})
          }else{
            setChartData({labels,datasets:[]})
          }
          
      
         
        }));
     
      
}

const SerachDataone = async() =>{
  let data_res

  let data = {type,state,year};
  
  console.log(data);
  let token = localStorage.getItem("accessToken");
  console.log(token);
  let Authorization = 'Bearer'+' '+token;

  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report01/data';
  let url = 'http://localhost:3005/getreportone';

  const response =  await fetch(url,{
    method:'POST', 
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    }
  }).then(response =>response.json().then(data=>({data: data,
        status: response.status})).then(res =>{
          // console.log(res);
          data_res = res.data;
          console.log(data_res);
          if(data_res.status){

            setChartData({labels,datasets:data_res.datasets})
          }else{
            setChartData({labels,datasets:[]})
          }
          
      
         
        }));


}


const Logout = ()=>{
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}
const GetReportwo = ()=>{
  document.getElementById('report2').style.display ='block';
  document.getElementById('report3').style.display = 'none';
  document.getElementById('report1').style.display = 'none';
  setChartData({labels,datasets:[]});
}
const GetReporone = ()=>{
  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'block';
  document.getElementById('report3').style.display = 'none';
  setChartData({labels,datasets:[]});
}
const GetReporoneTree = ()=>{

  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'none';
  document.getElementById('report3').style.display = 'block';
  setChartData({labels,datasets:[]});
}
function checkpermission(event){
  console.log(event.target.value);
  let permission = parseInt(event.target.value);
 
  switch(permission){
    case 0:
      document.getElementById('comtype').disabled= true;
      document.getElementById('comtype').value = null;
      setUserType(permission);
      setComType(null);
      break;
    case 2:
      document.getElementById('comtype').disabled= true;
      document.getElementById('comtype').value = null;
      setUserType(permission);
      setComType(null);
      break;
    default:
      document.getElementById('comtype').disabled= false;
      setUserType(permission);
      break;
  }
  
}

  return (
    


    <div style={{"height":937}}>

        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand><img  className="Nav" src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {decodeJwt.uname}       
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
      
   
          </Nav>
             
          <NavDropdown   title="รายงาน" id="basic-nav-dropdown" style={{'margin-right':80}}>
              <NavDropdown.Item>
              <a onClick={GetReporone} >หนังสือรับรองการแจ้ง/ใบอนุญาต</a>
          
              </NavDropdown.Item>
              <NavDropdown.Item>
              <a onClick={GetReportwo}>บัญชีผู้ใช้งานระบบบูรณาการ</a>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="#action/3.4">
             <a onClick={GetReporoneTree}>บัญชีผู้ใช้งานระบบสนับสนุน</a>  
              </NavDropdown.Item>
            </NavDropdown>
            
            <Button variant="outline-danger" onClick={Logout}>ออกจากระบบ</Button>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <br/>
    <br/>

    <div className="card col-md-8 center" id="report3" style={{"display":"none"}}>
      <input id="inputreport3" value="report3"  hidden/>
  <div className="container">
    รายงานบัญชีผู้ใช้งานระบบสนับสนุนพระราชบัญญัติเชื้อโรคและพิษจากสัตว์ออนไลน์
  <div className="row">
    <div className="col">
 <br/>
 <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">สิทธิการใช้งาน </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="usertype" name="usertype" onChange={checkpermission}>
      <option value="" >--สิทธิการใช้งาน--</option>
      <option value="1" >ผู้ใช้งานทั้วไป</option>
      <option value="2" >ผู้ดูแลระบบ</option>
      <option value="0" >ไม่สมารถระบุได้</option>
      </Form.Select>
      </InputGroup> 
    </div>
    <div className="col">
    <br/> 
    <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1">ประเภทหน่วยงาน </InputGroup.Text>
        <Form.Select aria-label="Default select example" id="comtype" name="comtype" onChange={e=>setComType(e.target.value)}>
        <option value="0" selected="">--ประเภทหน่วยงาน--</option>
        {
        ComTypeList.map((e)=>(<option value={e}>{e}</option>))
        }
    </Form.Select>
      </InputGroup>
      {/* <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">หน่วยงานเชื่อมโยง </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="agency" name="agency" onChange={e=>setagency(parseInt(e.target.value))}>
      <option value="0" selected="">กรมการปกครอง</option>
      <option value="1">กรมพัฒนาธุรกิจ</option>
      <option value="2">กรมสรรพกร</option>
      </Form.Select>
      </InputGroup> */}
    </div>
    <div className="col">
    <br/>
    <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1">ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">--เลือกปี--</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2020">2019</option>
      <option value="2020">2018</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <Button onClick={SerachDataTree}>ค้นหาข้อมูล</Button>
    </div>
  </div>
</div>
  </div>
    {/* end of form tree */}
    <div className="card col-md-8 center" id="report2" style={{"display":"none"}}>
      <input id="inputreport2" value="report2"  hidden/>
  <div className="container">
      รายงานบัญชีผู้ใช้งานระบบบูรณาการข้อมูลประชาขนและการบริการภาครัฐ
  <div className="row">
    <div className="col">
 <br/>
    
    </div>
    <div className="col">
    <br/> 
    <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1">ระบบงาน</InputGroup.Text>
        <Form.Select aria-label="Default select example" id="id" name="id" onChange={e=>setId(parseInt(e.target.value))}>
        <option value="0" selected="">--ระบบงาน--</option>
        {arrDataOption.map((d)=>(<option key={d.id} id={d.id} value={d.id}>{d.name}</option>))}

    </Form.Select>
      </InputGroup>
      {/* <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">หน่วยงานเชื่อมโยง </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="agency" name="agency" onChange={e=>setagency(parseInt(e.target.value))}>
      <option value="0" selected="">กรมการปกครอง</option>
      <option value="1">กรมพัฒนาธุรกิจ</option>
      <option value="2">กรมสรรพกร</option>
      </Form.Select>
      </InputGroup> */}
    </div>
    <div className="col">
    <br/>
    <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1">ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">--เลือกปี--</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2020">2019</option>
      <option value="2020">2018</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <Button onClick={SerachDataTwo}>ค้นหาข้อมูล</Button>
    </div>
  </div>
</div>
  </div>
{/* <div>end form report 2</div> */}

  <div className="card col-md-8 center" id="report1" style={{"display":"block"}}>
  <input id="inputreport1" value="report1"  hidden/>
  <div className="container">
  รายงานผลการดำเนินการเกี่ยวกับหนังสือรับรองการแจ้ง/ใบอนุญาต
  <div className="row">
    <div className="col">
 <br/>
      <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1">ประเภท</InputGroup.Text>
        <Form.Select aria-label="Default select example" id="type" name="type" onChange={e=>setType(parseInt(e.target.value))}>
        <option value="0" selected="">เลือกประเภท</option>
      <option value="1">ใบอนุญาต</option>
      <option value="2">หนังสือรับรอง</option>
    </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">สถานะ</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="state" name="state" onChange={e=>setState(parseInt(e.target.value))}>
      <option value="0" selected="">รอยืนเอกสาร</option>
      <option value="1">ยื่นคำขอ</option>
      <option value="2">หลักฐานในการยื่นไม่ครบถ้วน</option>
      <option value="3">แบบตรวจสถานที่ไม่ครบถ้วน</option>
      <option value="4">รอพิจารณาเอกสารลักษณะของสถานที่ ครั้งที่ 1</option>
      <option value="5">รอผลออกตรวจสอบสถานที่</option>
      <option value="6">รอพิจารณาอนุมัติ</option>
      <option value="7">รอผู้ประกอบการชำระค่าธรรมเนียม</option>
      <option value="8">อนุมัติคำขอเรียบร้อย</option>
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1">ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">--เลือกปี--</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2020">2019</option>
      <option value="2020">2018</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <Button onClick={SerachDataone}>ค้นหาข้อมูล</Button>
    </div>
  </div>
</div>
  </div>


  <div className="container">
    <div className="row" id="chartID">

    <LineChart options={options} ChartData={ChartData}/>
    </div>
   
      </div>
    </div> 
 
  
  );
}



export default ReportChart;


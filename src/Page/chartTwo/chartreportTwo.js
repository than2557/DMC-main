
import ReactDOM from'react-dom';
import './chart.css';
import React,{useState,SyntheticEvent,useEffect} from'react';
import {Button,Card,Row,Col,Container,Navbar,Nav,Jumbotron,InputGroup,Form,NavDropdown} from 'react-bootstrap';

import LineChart from '../../component/LineChart';
import logo from '../../img/icon.png';




import 'chart.js/auto'; 

function ReportChartTwo() {
  
//   let data_mock = {"type":1,"state":1,"year":"2022"}
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
  
let LineData = {labels,datasets:[]};


  const [type, setType] = useState();
  const [state, setState] = useState();
  const [year, setYear] = useState();
  const [ChartData,setChartData] = useState(LineData);

const SerachData =  async() => {
  // console.log({type,state,year})
  let data_res

  let data = {type,state,year};
  
  console.log(data);
  let token = localStorage.getItem("accessToken");
  console.log(token);
  let Authorization = 'Bearer'+' '+token;

  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report01/data';
  let url = 'http://localhost:3005/reportData';

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
  window.location.href = "/Login";
}
const home =() =>{
  window.location.href = "/chartReport";
}


  return (
    


    <div style={{"height":937}}>

        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand ><img  className="Nav" src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>   
          <NavDropdown   title="รายงาน" id="basic-nav-dropdown" style={{'margin-right':80}}>
              <NavDropdown.Item>
              บัญชีผู้ใช้งานระบบบูรณาการ
              </NavDropdown.Item>
              
              <NavDropdown.Item href="#action/3.4">
                บัญชีผู้ใช้งานระบบสนับสนุน
              </NavDropdown.Item>
            </NavDropdown>
            <Button variant="outline-danger" onClick={Logout}>ออกจากระบบ</Button>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <br/>
    <br/>
  <div className="card col-md-8 center" id="report2" style={{"display":"block"}}>
  <div className="container">
      รายงานบัญชีผู้ใช้งานระบบบูรณาการข้อมูลประชาขนและการบริการภาครัฐ
  <div className="row">
    <div className="col">
 <br/>
      <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1">ระบบงาน</InputGroup.Text>
        <Form.Select aria-label="Default select example" id="type" name="type" onChange={e=>setType(parseInt(e.target.value))}>
        <option value="0" selected="">--ระบบงาน--</option>
      <option value="1">patact</option>
      <option value="2">ศทส</option>
    </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">หน่วยงานเชื่อมโยง </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="state" name="state" onChange={e=>setState(parseInt(e.target.value))}>
      <option value="0" selected="">กรมการปกครอง</option>
      <option value="1">กรมพัฒนาธุรกิจ</option>
      <option value="2">กรมสรรพกร</option>
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1">ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">ปี</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <Button onClick={SerachData}>ค้นหาข้อมูล</Button>
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



export default ReportChartTwo;

